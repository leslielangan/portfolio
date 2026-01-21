import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, Download, RefreshCw, Home as HomeIcon } from 'lucide-react';

export default function GTMAgent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your GTM Strategy Agent. I'll help you develop a comprehensive go-to-market strategy tailored to your product.\n\nTo get started, tell me about your product. What does it do, and who is it for?"
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

  const systemPrompt = `You are an expert GTM Strategy Agent built by Leslie, a VP of Product Marketing with 16+ years of experience in B2B tech, specializing in AI products.

Your role is to conduct an intelligent, adaptive interview to gather information about the user's product, then generate a comprehensive go-to-market strategy.

INTERVIEW PHASE:
- Ask 5-7 strategic questions, one at a time
- Adapt questions based on previous answers (e.g., if B2B, ask about decision-making units; if B2C, ask about acquisition channels)
- Key areas to cover: product details, target market, competitive landscape, business model, resources/constraints, success metrics
- Keep questions conversational and insightful
- After gathering sufficient information, say "I have everything I need to create your GTM strategy. Give me a moment to put this together..." and then respond with ONLY the JSON structure below

STRATEGY GENERATION PHASE:
When you have enough information, generate a comprehensive strategy as a JSON object with this EXACT structure (respond with ONLY this JSON, no other text):

{
  "productName": "string",
  "executiveSummary": "2-3 sentence overview",
  "targetMarket": {
    "primary": "description",
    "secondary": "description",
    "icp": "ideal customer profile details"
  },
  "positioning": {
    "valueProposition": "clear value prop",
    "differentiation": "how you're different",
    "messaging": "key messages"
  },
  "gtmMotion": "product-led / sales-led / hybrid with explanation",
  "channels": [
    {
      "name": "channel name",
      "tactics": ["specific tactic 1", "specific tactic 2"],
      "timeline": "when to deploy",
      "owner": "who owns this",
      "deliverables": ["deliverable 1", "deliverable 2"]
    }
  ],
  "launchPhases": {
    "phase1": "month 1-2 activities",
    "phase2": "month 3-4 activities",
    "phase3": "month 5-6 activities"
  },
  "metrics": {
    "north_star": "primary metric",
    "leading_indicators": ["indicator 1", "indicator 2"],
    "lagging_indicators": ["indicator 1", "indicator 2"]
  },
  "quickWins": ["quick win 1", "quick win 2", "quick win 3"],
  "risks": ["risk 1 with mitigation", "risk 2 with mitigation"]
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
            content: "Perfect! I've generated your comprehensive GTM strategy. You can view it in the panel on the right and download it for your records."
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
      content: "Hi! I'm your GTM Strategy Agent. I'll help you develop a comprehensive go-to-market strategy tailored to your product.\n\nTo get started, tell me about your product. What does it do, and who is it for?"
    }]);
    setStrategy(null);
    setConversationComplete(false);
  };

  const downloadStrategy = () => {
    const strategyText = `GTM STRATEGY: ${strategy.productName}

EXECUTIVE SUMMARY
${strategy.executiveSummary}

TARGET MARKET
Primary: ${strategy.targetMarket.primary}
Secondary: ${strategy.targetMarket.secondary}
ICP: ${strategy.targetMarket.icp}

POSITIONING
Value Proposition: ${strategy.positioning.valueProposition}
Differentiation: ${strategy.positioning.differentiation}
Messaging: ${strategy.positioning.messaging}

GTM MOTION
${strategy.gtmMotion}

CHANNELS
${strategy.channels.map(ch => `
${ch.name}
- Tactics: ${ch.tactics.join(', ')}
- Timeline: ${ch.timeline}
- Owner: ${ch.owner}
- Deliverables: ${ch.deliverables.join(', ')}
`).join('\n')}

LAUNCH PHASES
Phase 1: ${strategy.launchPhases.phase1}
Phase 2: ${strategy.launchPhases.phase2}
Phase 3: ${strategy.launchPhases.phase3}

METRICS
North Star: ${strategy.metrics.north_star}
Leading Indicators: ${strategy.metrics.leading_indicators.join(', ')}
Lagging Indicators: ${strategy.metrics.lagging_indicators.join(', ')}

QUICK WINS
${strategy.quickWins.map((w, i) => `${i + 1}. ${w}`).join('\n')}

RISKS & MITIGATION
${strategy.risks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

---
Generated by GTM Strategy Agent
Built by Leslie Langan | Product Marketing Expert
`;

    const blob = new Blob([strategyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GTM-Strategy-${strategy.productName.replace(/\s+/g, '-')}.txt`;
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
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-6 py-3 bg-white rounded border-2 border-[#DBE6E5] hover:border-[#26413C] transition-all text-[#536B79] hover:text-[#26413C] font-medium shadow-sm"
        >
          <HomeIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="max-w-7xl mx-auto pt-20 md:pt-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-[#03110E] mb-4" style={{ letterSpacing: '-2px' }}>
              GTM Strategy <span className="text-[#26413C]" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>Agent</span>
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
                          ? 'bg-[#26413C] text-white' 
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
                      className="flex-1 px-4 py-3 border-2 border-[#DBE6E5] rounded-lg focus:outline-none focus:border-[#26413C] disabled:opacity-50 disabled:cursor-not-allowed text-[#03110E] placeholder-[#616B61]"
                    />
                    <button
                      onClick={handleSend}
                      disabled={conversationComplete || isLoading || !input.trim()}
                      className="px-6 py-3 bg-[#26413C] text-white rounded-lg hover:bg-[#03110E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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
                  className="mt-4 w-full px-6 py-3 bg-white border-2 border-[#DBE6E5] text-[#536B79] rounded-lg hover:border-[#26413C] hover:text-[#26413C] transition-all font-medium flex items-center justify-center gap-2"
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
                      className="p-2 text-[#26413C] hover:bg-[#F8FAFA] rounded-lg transition-colors"
                      title="Download Strategy"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    <div>
                      <h3 className="font-bold text-[#26413C] mb-2 text-sm uppercase tracking-wider">Product</h3>
                      <p className="text-[#536B79] text-sm">{strategy.productName}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#26413C] mb-2 text-sm uppercase tracking-wider">Executive Summary</h3>
                      <p className="text-[#536B79] text-sm leading-relaxed">{strategy.executiveSummary}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#26413C] mb-2 text-sm uppercase tracking-wider">Target Market</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-[#03110E]">Primary:</span>
                          <p className="text-[#536B79] ml-2">{strategy.targetMarket.primary}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-[#03110E]">ICP:</span>
                          <p className="text-[#536B79] ml-2">{strategy.targetMarket.icp}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#26413C] mb-2 text-sm uppercase tracking-wider">Quick Wins</h3>
                      <ul className="space-y-1 text-sm">
                        {strategy.quickWins.map((win, i) => (
                          <li key={i} className="flex gap-2 text-[#536B79]">
                            <span className="text-[#26413C]">•</span>
                            <span>{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#26413C] mb-2 text-sm uppercase tracking-wider">Channels</h3>
                      <div className="space-y-3">
                        {strategy.channels.slice(0, 3).map((ch, i) => (
                          <div key={i} className="text-sm">
                            <p className="font-semibold text-[#03110E]">{ch.name}</p>
                            <p className="text-[#536B79] text-xs mt-1">{ch.timeline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadStrategy}
                    className="mt-6 w-full px-4 py-3 bg-[#26413C] text-white rounded-lg hover:bg-[#03110E] transition-colors font-medium text-sm uppercase tracking-wider"
                  >
                    Download Full Strategy
                  </button>
                </div>
              ) : (
                <div className="bg-[#F8FAFA] border-2 border-[#DBE6E5] rounded-lg p-8 text-center sticky top-24">
                  <div className="text-[#616B61] text-sm">
                    <p className="font-medium mb-2">Your strategy will appear here</p>
                    <p className="text-xs">Answer the questions to generate a comprehensive GTM plan</p>
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
