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
    "differentiation": "what makes this unique",
    "messaging": "core message"
  },
  "goToMarketMotion": {
    "model": "PLG/Sales-led/Hybrid/etc",
    "rationale": "why this model"
  },
  "launchPhases": [
    {
      "phase": "Phase 1: Foundation",
      "timeline": "Months 1-2",
      "objectives": ["objective 1", "objective 2"],
      "tactics": ["tactic 1", "tactic 2"]
    }
  ],
  "channels": [
    {
      "channel": "channel name",
      "priority": "Primary/Secondary",
      "tactics": ["tactic 1", "tactic 2"]
    }
  ],
  "metrics": {
    "northStar": "primary metric",
    "leading": ["indicator 1", "indicator 2"],
    "lagging": ["indicator 1", "indicator 2"]
  },
  "risks": [
    {
      "risk": "risk description",
      "mitigation": "mitigation strategy"
    }
  ]
}

Be thorough, strategic, and practical. Draw on enterprise SaaS and AI product GTM best practices.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: systemPrompt,
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      const assistantMessage = data.content[0].text;

      const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const strategyData = JSON.parse(jsonMatch[0]);
          setStrategy(strategyData);
          setConversationComplete(true);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "✨ Your GTM strategy is ready! Review it below, and feel free to download it or start a new strategy."
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
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm your GTM Strategy Agent. I'll help you develop a comprehensive go-to-market strategy tailored to your product.\n\nTo get started, tell me about your product. What does it do, and who is it for?"
      }
    ]);
    setStrategy(null);
    setConversationComplete(false);
  };

  const handleDownload = () => {
    const strategyText = `
GTM STRATEGY: ${strategy.productName}

EXECUTIVE SUMMARY
${strategy.executiveSummary}

TARGET MARKET
Primary: ${strategy.targetMarket.primary}
Secondary: ${strategy.targetMarket.secondary}
ICP: ${strategy.targetMarket.icp}

POSITIONING
Value Proposition: ${strategy.positioning.valueProposition}
Differentiation: ${strategy.positioning.differentiation}
Core Messaging: ${strategy.positioning.messaging}

GO-TO-MARKET MOTION
Model: ${strategy.goToMarketMotion.model}
Rationale: ${strategy.goToMarketMotion.rationale}

LAUNCH PHASES
${strategy.launchPhases.map(phase => `
${phase.phase} (${phase.timeline})
Objectives:
${phase.objectives.map(obj => `  • ${obj}`).join('\n')}
Tactics:
${phase.tactics.map(tactic => `  • ${tactic}`).join('\n')}
`).join('\n')}

CHANNELS
${strategy.channels.map(ch => `
${ch.channel} (${ch.priority})
${ch.tactics.map(tactic => `  • ${tactic}`).join('\n')}
`).join('\n')}

METRICS
North Star Metric: ${strategy.metrics.northStar}
Leading Indicators: ${strategy.metrics.leading.join(', ')}
Lagging Indicators: ${strategy.metrics.lagging.join(', ')}

RISKS & MITIGATION
${strategy.risks.map(r => `
Risk: ${r.risk}
Mitigation: ${r.mitigation}
`).join('\n')}

---
Generated by GTM Strategy Agent
Built by Leslie Langan | VP Product Marketing
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-gray-700 font-medium"
      >
        <HomeIcon className="w-4 h-4" />
        Back to Portfolio
      </button>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GTM Strategy Agent</h1>
          <p className="text-gray-600">AI-powered go-to-market strategy generation</p>
          <p className="text-sm text-gray-500 mt-1">Built by Leslie Langan | VP Product Marketing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {!conversationComplete && (
                <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

              {conversationComplete && (
                <div className="border-t border-gray-200 p-4 bg-gray-50 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Strategy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Strategy Display */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6" style={{ height: '600px', overflowY: 'auto' }}>
              {!strategy ? (
                <div className="h-full flex items-center justify-center text-center px-4">
                  <div>
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Strategy Will Appear Here</h3>
                    <p className="text-sm text-gray-600">Answer the questions to generate your customized GTM strategy</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{strategy.productName}</h2>
                    <p className="text-sm text-gray-600">{strategy.executiveSummary}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Target Market</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Primary:</span> {strategy.targetMarket.primary}</p>
                      <p><span className="font-medium">ICP:</span> {strategy.targetMarket.icp}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Positioning</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Value Prop:</span> {strategy.positioning.valueProposition}</p>
                      <p><span className="font-medium">Differentiation:</span> {strategy.positioning.differentiation}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">GTM Motion</h3>
                    <p className="text-sm"><span className="font-medium">{strategy.goToMarketMotion.model}</span> - {strategy.goToMarketMotion.rationale}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Launch Phases</h3>
                    <div className="space-y-3">
                      {strategy.launchPhases.map((phase, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium">{phase.phase}</p>
                          <p className="text-xs text-gray-600">{phase.timeline}</p>
                          <ul className="mt-1 space-y-0.5">
                            {phase.objectives.slice(0, 2).map((obj, i) => (
                              <li key={i} className="text-xs text-gray-700">• {obj}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Key Metrics</h3>
                    <p className="text-sm"><span className="font-medium">North Star:</span> {strategy.metrics.northStar}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Top Risks</h3>
                    <div className="space-y-2">
                      {strategy.risks.slice(0, 2).map((risk, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium text-gray-900">{risk.risk}</p>
                          <p className="text-xs text-gray-600">{risk.mitigation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>This agent conducts an intelligent interview and generates customized GTM strategies.</p>
          <p className="mt-1">Perfect for portfolio demonstrations and practical strategy development.</p>
        </div>
      </div>
    </div>
  );
}
