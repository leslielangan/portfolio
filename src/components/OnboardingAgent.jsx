import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, Download, RefreshCw, Home as HomeIcon } from 'lucide-react';

export default function OnboardingAgent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your User Onboarding Agent. I'll help you design a psychology-informed onboarding strategy that drives adoption.\n\nTo get started, tell me about your product and your users. What are you trying to help them accomplish?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `You are an expert User Onboarding Agent built by Leslie, a VP of Product Marketing with 16+ years of experience who has trained over 2,000 users on AI fundamentals.

Your role is to conduct an intelligent interview about the user's product and users, then generate a psychology-informed onboarding strategy.

INTERVIEW PHASE:
- Ask 5-7 strategic questions about the product, target users, adoption barriers, and success metrics
- Adapt questions based on previous answers
- Key areas: product complexity, user motivations, learning preferences, success behaviors, adoption barriers
- After gathering sufficient information, say "I have everything I need. Let me create your onboarding strategy..." and respond with ONLY the JSON structure

STRATEGY GENERATION PHASE:
Generate a comprehensive onboarding strategy as JSON with this structure (respond with ONLY this JSON):

{
  "productName": "string",
  "learningObjectives": ["objective 1", "objective 2", "objective 3"],
  "adoptionBarriers": [
    {
      "barrier": "barrier description",
      "mitigation": "how to address it"
    }
  ],
  "onboardingFlow": [
    {
      "stage": "stage name (e.g., Welcome, Core Setup, First Value)",
      "tactics": ["specific tactic 1", "specific tactic 2"],
      "psychologyPrinciple": "why this works (e.g., social proof, commitment, progress)",
      "metrics": "how to measure success"
    }
  ],
  "contentStrategy": {
    "formats": ["video", "interactive tutorial", "documentation", "etc"],
    "tone": "description of voice/tone",
    "examples": ["example 1", "example 2"]
  },
  "personalization": [
    {
      "segment": "user segment",
      "approach": "tailored approach for this segment"
    }
  ],
  "metrics": {
    "engagement": ["metric 1", "metric 2"],
    "competency": ["metric 1", "metric 2"],
    "retention": ["metric 1", "metric 2"]
  }
}`;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();
      const assistantMessage = data.content[0].text;

      const jsonMatch = assistantMessage.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                       assistantMessage.match(/(\{[\s\S]*\})/);
      
      if (jsonMatch) {
        try {
          const strategyData = JSON.parse(jsonMatch[1]);
          setStrategy(strategyData);
          setConversationComplete(true);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Perfect! I've created your onboarding strategy. You can view it in the panel and download it."
          }]);
        } catch (e) {
          setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm your User Onboarding Agent. I'll help you design a psychology-informed onboarding strategy that drives adoption.\n\nTo get started, tell me about your product and your users. What are you trying to help them accomplish?"
    }]);
    setStrategy(null);
    setConversationComplete(false);
  };

  const downloadStrategy = () => {
    const strategyText = `ONBOARDING STRATEGY: ${strategy.productName}

LEARNING OBJECTIVES
${strategy.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

ADOPTION BARRIERS & MITIGATION
${strategy.adoptionBarriers.map((b, i) => `
${i + 1}. Barrier: ${b.barrier}
   Mitigation: ${b.mitigation}
`).join('\n')}

ONBOARDING FLOW
${strategy.onboardingFlow.map((stage, i) => `
Stage ${i + 1}: ${stage.stage}
Tactics: ${stage.tactics.join(', ')}
Psychology Principle: ${stage.psychologyPrinciple}
Metrics: ${stage.metrics}
`).join('\n')}

CONTENT STRATEGY
Formats: ${strategy.contentStrategy.formats.join(', ')}
Tone: ${strategy.contentStrategy.tone}
Examples: ${strategy.contentStrategy.examples.join(', ')}

PERSONALIZATION
${strategy.personalization.map((p, i) => `
${i + 1}. Segment: ${p.segment}
   Approach: ${p.approach}
`).join('\n')}

METRICS
Engagement: ${strategy.metrics.engagement.join(', ')}
Competency: ${strategy.metrics.competency.join(', ')}
Retention: ${strategy.metrics.retention.join(', ')}

---
Generated by User Onboarding Agent
Built by Leslie Langan | Product Marketing Expert
`;

    const blob = new Blob([strategyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Onboarding-Strategy-${strategy.productName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
        
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="3"/></filter><rect width="300" height="300" filter="url(%23n)" opacity="0.015"/></svg>');
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      <div className="min-h-screen bg-white p-4 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-6 py-3 bg-white rounded border-2 border-[#DBE6E5] hover:border-[#536B79] transition-all text-[#536B79] hover:text-[#03110E] font-medium shadow-sm"
        >
          <HomeIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="max-w-7xl mx-auto pt-20 md:pt-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-[#03110E] mb-4" style={{ letterSpacing: '-2px' }}>
              User <span className="text-[#536B79]" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>Onboarding</span> Agent
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-[#DBE6E5] rounded-lg shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        msg.role === 'user' 
                          ? 'bg-[#536B79] text-white' 
                          : 'bg-[#F8FAFA] text-[#03110E] border border-[#DBE6E5]'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#F8FAFA] border border-[#DBE6E5] rounded-lg px-4 py-3">
                        <Loader2 className="w-5 h-5 animate-spin text-[#536B79]" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t-2 border-[#DBE6E5] p-4 bg-[#FAFBFB]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={conversationComplete ? "Strategy complete!" : "Type your response..."}
                      disabled={conversationComplete || isLoading}
                      className="flex-1 px-4 py-3 border-2 border-[#DBE6E5] rounded-lg focus:outline-none focus:border-[#536B79] disabled:opacity-50 disabled:cursor-not-allowed text-[#03110E] placeholder-[#616B61]"
                    />
                    <button
                      onClick={handleSend}
                      disabled={conversationComplete || isLoading || !input.trim()}
                      className="px-6 py-3 bg-[#536B79] text-white rounded-lg hover:bg-[#03110E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              {conversationComplete && (
                <button
                  onClick={handleReset}
                  className="mt-4 w-full px-6 py-3 bg-white border-2 border-[#DBE6E5] text-[#536B79] rounded-lg hover:border-[#536B79] hover:text-[#03110E] transition-all font-medium flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start New Strategy
                </button>
              )}
            </div>

            {/* Strategy Display */}
            <div className="lg:col-span-1">
              {strategy ? (
                <div className="bg-white border-2 border-[#DBE6E5] rounded-lg shadow-sm p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#03110E]">Your Strategy</h2>
                    <button
                      onClick={downloadStrategy}
                      className="p-2 text-[#536B79] hover:bg-[#F8FAFA] rounded-lg transition-colors"
                      title="Download Strategy"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    <div>
                      <h3 className="font-bold text-[#536B79] mb-2 text-sm uppercase tracking-wider">Product</h3>
                      <p className="text-[#03110E] text-sm">{strategy.productName}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#536B79] mb-2 text-sm uppercase tracking-wider">Learning Objectives</h3>
                      <ul className="space-y-1 text-sm">
                        {strategy.learningObjectives.map((obj, i) => (
                          <li key={i} className="flex gap-2 text-[#03110E]">
                            <span className="text-[#536B79]">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#536B79] mb-2 text-sm uppercase tracking-wider">Onboarding Flow</h3>
                      <div className="space-y-3">
                        {strategy.onboardingFlow.map((stage, i) => (
                          <div key={i} className="text-sm">
                            <p className="font-semibold text-[#03110E]">{stage.stage}</p>
                            <p className="text-[#616B61] text-xs mt-1">{stage.psychologyPrinciple}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#536B79] mb-2 text-sm uppercase tracking-wider">Key Metrics</h3>
                      <div className="space-y-2 text-sm text-[#03110E]">
                        <div>
                          <span className="font-semibold">Engagement:</span>
                          <p className="text-[#616B61] text-xs ml-2">{strategy.metrics.engagement.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadStrategy}
                    className="mt-6 w-full px-4 py-3 bg-[#536B79] text-white rounded-lg hover:bg-[#03110E] transition-colors font-medium text-sm uppercase tracking-wider"
                  >
                    Download Full Strategy
                  </button>
                </div>
              ) : (
                <div className="bg-[#F8FAFA] border-2 border-[#DBE6E5] rounded-lg p-8 text-center sticky top-24">
                  <div className="text-[#616B61] text-sm">
                    <p className="font-medium mb-2">Your strategy will appear here</p>
                    <p className="text-xs">Answer the questions to generate a comprehensive onboarding plan</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
