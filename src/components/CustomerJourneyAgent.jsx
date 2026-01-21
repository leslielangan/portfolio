import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, Download, RefreshCw, Home as HomeIcon } from 'lucide-react';

export default function CustomerJourneyAgent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Customer Journey Agent. I'll help you map and optimize every touchpoint of your customer experience.\n\nTo get started, tell me about your product and customers. Who are they and what journey are they on?"
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

  const systemPrompt = `You are an expert Customer Journey Agent built by Leslie, a VP of Product Marketing with 16+ years of experience in B2B tech.

Your role is to conduct an intelligent interview about the user's customers and their journey, then generate a comprehensive customer journey map with optimization opportunities.

INTERVIEW PHASE:
- Ask 5-7 strategic questions about customers, their goals, current journey, pain points, and success moments
- Adapt questions based on previous answers
- Key areas: customer segments, journey stages, touchpoints, pain points, moments of delight, conversion goals
- After gathering sufficient information, say "I have everything I need. Let me map out your customer journey..." and respond with ONLY the JSON structure

STRATEGY GENERATION PHASE:
Generate a comprehensive customer journey map as JSON with this structure (respond with ONLY this JSON):

{
  "productName": "string",
  "customerSegment": "primary segment being analyzed",
  "journeyStages": [
    {
      "stage": "stage name (e.g., Awareness, Consideration, Decision, Onboarding, Adoption, Retention, Advocacy)",
      "customerGoals": ["goal 1", "goal 2"],
      "touchpoints": ["touchpoint 1", "touchpoint 2"],
      "painPoints": ["pain point 1", "pain point 2"],
      "opportunities": ["optimization 1", "optimization 2"],
      "metrics": ["metric to track 1", "metric to track 2"]
    }
  ],
  "crossStageOpportunities": [
    {
      "opportunity": "opportunity description",
      "impact": "expected impact",
      "effort": "low/medium/high"
    }
  ],
  "personalization": {
    "approach": "how to personalize the journey",
    "segments": ["segment-specific approach 1", "segment-specific approach 2"]
  },
  "quickWins": ["quick win 1", "quick win 2", "quick win 3"],
  "metrics": {
    "conversion": ["metric 1", "metric 2"],
    "engagement": ["metric 1", "metric 2"],
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
            content: "Perfect! I've mapped your customer journey. You can view it in the panel and download it."
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
      content: "Hi! I'm your Customer Journey Agent. I'll help you map and optimize every touchpoint of your customer experience.\n\nTo get started, tell me about your product and customers. Who are they and what journey are they on?"
    }]);
    setStrategy(null);
    setConversationComplete(false);
  };

  const downloadStrategy = () => {
    const strategyText = `CUSTOMER JOURNEY MAP: ${strategy.productName}

CUSTOMER SEGMENT
${strategy.customerSegment}

JOURNEY STAGES
${strategy.journeyStages.map((stage, i) => `
Stage ${i + 1}: ${stage.stage}

Customer Goals:
${stage.customerGoals.map(g => `  - ${g}`).join('\n')}

Touchpoints:
${stage.touchpoints.map(t => `  - ${t}`).join('\n')}

Pain Points:
${stage.painPoints.map(p => `  - ${p}`).join('\n')}

Opportunities:
${stage.opportunities.map(o => `  - ${o}`).join('\n')}

Metrics:
${stage.metrics.map(m => `  - ${m}`).join('\n')}
`).join('\n')}

CROSS-STAGE OPPORTUNITIES
${strategy.crossStageOpportunities.map((opp, i) => `
${i + 1}. ${opp.opportunity}
   Impact: ${opp.impact}
   Effort: ${opp.effort}
`).join('\n')}

PERSONALIZATION
Approach: ${strategy.personalization.approach}
Segments: ${strategy.personalization.segments.join(', ')}

QUICK WINS
${strategy.quickWins.map((w, i) => `${i + 1}. ${w}`).join('\n')}

KEY METRICS
Conversion: ${strategy.metrics.conversion.join(', ')}
Engagement: ${strategy.metrics.engagement.join(', ')}
Retention: ${strategy.metrics.retention.join(', ')}

---
Generated by Customer Journey Agent
Built by Leslie Langan | Product Marketing Expert
`;

    const blob = new Blob([strategyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Customer-Journey-${strategy.productName.replace(/\s+/g, '-')}.txt`;
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
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-6 py-3 bg-white rounded border-2 border-[#DBE6E5] hover:border-[#616B61] transition-all text-[#616B61] hover:text-[#03110E] font-medium shadow-sm"
        >
          <HomeIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="max-w-7xl mx-auto pt-20 md:pt-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-[#03110E] mb-4" style={{ letterSpacing: '-2px' }}>
              Customer <span className="text-[#616B61]" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>Journey</span> Agent
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
                          ? 'bg-[#616B61] text-white' 
                          : 'bg-[#F8FAFA] text-[#03110E] border border-[#DBE6E5]'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#F8FAFA] border border-[#DBE6E5] rounded-lg px-4 py-3">
                        <Loader2 className="w-5 h-5 animate-spin text-[#616B61]" />
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
                      placeholder={conversationComplete ? "Journey complete!" : "Type your response..."}
                      disabled={conversationComplete || isLoading}
                      className="flex-1 px-4 py-3 border-2 border-[#DBE6E5] rounded-lg focus:outline-none focus:border-[#616B61] disabled:opacity-50 disabled:cursor-not-allowed text-[#03110E] placeholder-[#616B61]"
                    />
                    <button
                      onClick={handleSend}
                      disabled={conversationComplete || isLoading || !input.trim()}
                      className="px-6 py-3 bg-[#616B61] text-white rounded-lg hover:bg-[#03110E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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
                  className="mt-4 w-full px-6 py-3 bg-white border-2 border-[#DBE6E5] text-[#616B61] rounded-lg hover:border-[#616B61] hover:text-[#03110E] transition-all font-medium flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start New Journey Map
                </button>
              )}
            </div>

            {/* Strategy Display */}
            <div className="lg:col-span-1">
              {strategy ? (
                <div className="bg-white border-2 border-[#DBE6E5] rounded-lg shadow-sm p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#03110E]">Your Journey</h2>
                    <button
                      onClick={downloadStrategy}
                      className="p-2 text-[#616B61] hover:bg-[#F8FAFA] rounded-lg transition-colors"
                      title="Download Journey Map"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    <div>
                      <h3 className="font-bold text-[#616B61] mb-2 text-sm uppercase tracking-wider">Product</h3>
                      <p className="text-[#03110E] text-sm">{strategy.productName}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#616B61] mb-2 text-sm uppercase tracking-wider">Customer Segment</h3>
                      <p className="text-[#03110E] text-sm">{strategy.customerSegment}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#616B61] mb-2 text-sm uppercase tracking-wider">Journey Stages</h3>
                      <div className="space-y-3">
                        {strategy.journeyStages.map((stage, i) => (
                          <div key={i} className="text-sm">
                            <p className="font-semibold text-[#03110E]">{stage.stage}</p>
                            <p className="text-[#616B61] text-xs mt-1">
                              {stage.touchpoints.length} touchpoints
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#616B61] mb-2 text-sm uppercase tracking-wider">Quick Wins</h3>
                      <ul className="space-y-1 text-sm">
                        {strategy.quickWins.map((win, i) => (
                          <li key={i} className="flex gap-2 text-[#03110E]">
                            <span className="text-[#616B61]">•</span>
                            <span>{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={downloadStrategy}
                    className="mt-6 w-full px-4 py-3 bg-[#616B61] text-white rounded-lg hover:bg-[#03110E] transition-colors font-medium text-sm uppercase tracking-wider"
                  >
                    Download Full Journey
                  </button>
                </div>
              ) : (
                <div className="bg-[#F8FAFA] border-2 border-[#DBE6E5] rounded-lg p-8 text-center sticky top-24">
                  <div className="text-[#616B61] text-sm">
                    <p className="font-medium mb-2">Your journey map will appear here</p>
                    <p className="text-xs">Answer the questions to generate a comprehensive customer journey</p>
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
