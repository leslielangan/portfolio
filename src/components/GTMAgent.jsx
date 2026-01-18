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

  const systemPrompt = `You are an expert GTM Strategy Agent built by Leslie, with 16+ years of B2B tech product marketing experience including launching AI-native platforms and training 2,000+ users on AI fundamentals.

Your role is to conduct a thorough interview to understand the product, market, resources, and context, then generate a comprehensive, ACTIONABLE go-to-market plan with specific tactics across paid, owned, earned, and internal channels, including content formats like video, webinars, training materials, and live sessions.

INTERVIEW PHASE - Ask 7-10 questions, one at a time, adapting based on responses:

REQUIRED AREAS TO COVER:
1. Product basics: What it does, who it's for, key differentiation, complexity level
2. Target market: ICP details, market size, urgency/pain level, how they prefer to learn
3. Competitive landscape: Alternatives, positioning opportunity
4. Business model: Pricing approach, deal size, sales cycle length
5. Available channels & formats: 
   - PAID: Budget for ads, sponsorships, etc.
   - OWNED: Email list size, blog traffic, social following, existing customer base, video capability
   - EARNED: PR contacts, partner ecosystem, industry relationships, speaking opportunities
   - INTERNAL: Sales team, CS team, existing users who could advocate
   - CONTENT FORMATS: Can you produce video? Host webinars? Run live training sessions? What's your content creation capability?
6. Existing assets: Customer data, email lists, content library, case studies, integrations, internal champions, SMEs who can present
7. Audience: Is this B2B or B2C? New market or existing customers? Technical or business buyers? How do they learn (video vs reading)?
8. Timeline & resources: Marketing budget, team size/skills, launch urgency, content production capability
9. Success criteria: Revenue targets, adoption goals, timeline

CRITICAL: Understand if this is:
- New product launch (need awareness + education + adoption)
- Feature release (need existing user activation + training + new user acquisition)
- Platform expansion (need ecosystem + internal enablement + education at scale)

Adjust questions accordingly. After gathering sufficient information, say "I have everything I need. Let me build your GTM plan..." and then respond with ONLY the JSON structure below.

GTM PLAN GENERATION:
When ready, generate a comprehensive, actionable plan as a JSON object with this EXACT structure (respond with ONLY this JSON, no other text):

{
  "productName": "string",
  "executiveSummary": "2-3 sentences on the overall strategy and why it will work",
  "targetMarket": {
    "primary": "detailed primary segment description",
    "secondary": "secondary segment if applicable",
    "icp": "ideal customer profile with specific attributes"
  },
  "positioning": {
    "valueProp": "clear value proposition statement",
    "differentiation": "what makes this different from alternatives",
    "messaging": {
      "primaryMessage": "main message",
      "supportingMessages": ["key point 1", "key point 2", "key point 3"]
    }
  },
  "gtmMotion": {
    "model": "PLG/Sales-Led/Hybrid - with clear rationale",
    "rationale": "why this motion fits the product and market"
  },
  "channels": [
    {
      "channel": "channel name",
      "type": "Paid/Owned/Earned/Internal",
      "priority": "Primary/Secondary/Tertiary",
      "tactics": [
        {
          "tactic": "specific action to take",
          "timeline": "when to execute (e.g., Week 1-2, Month 1)",
          "owner": "who should do this",
          "deliverable": "what gets created/shipped"
        }
      ],
      "budget": "recommended budget allocation if applicable",
      "expectedImpact": "what results to expect"
    }
  ],
  "contentStrategy": {
    "approach": "overall philosophy",
    "formats": [
      {
        "format": "Video/Webinar/Training/Documentation/etc",
        "purpose": "why this format for this audience",
        "cadence": "how often to produce",
        "examples": ["specific piece 1", "specific piece 2"]
      }
    ]
  },
  "launchPhases": [
    {
      "phase": "Phase name",
      "timeline": "specific timeframe",
      "objectives": ["specific goal 1", "specific goal 2"],
      "keyActivities": [
        {
          "activity": "specific deliverable or action",
          "owner": "team/role responsible",
          "deadline": "relative deadline"
        }
      ],
      "successMetrics": ["measurable metric 1", "measurable metric 2"]
    }
  ],
  "metrics": {
    "northStar": "primary success metric",
    "leading": ["leading indicator 1", "leading indicator 2"],
    "lagging": ["lagging indicator 1", "lagging indicator 2"],
    "targets": {
      "month1": "specific target",
      "month3": "specific target",
      "month6": "specific target"
    }
  },
  "quickWins": [
    {
      "win": "immediate action to take in first 2 weeks",
      "effort": "Low/Medium/High",
      "impact": "expected result"
    }
  ],
  "risks": [
    {
      "risk": "potential obstacle or failure mode",
      "likelihood": "High/Medium/Low",
      "mitigation": "specific strategy to address it"
    }
  ],
  "budgetAllocation": {
    "totalMonthly": "recommended monthly marketing spend",
    "breakdown": [
      {
        "category": "spend category",
        "amount": "monthly amount",
        "rationale": "why this allocation"
      }
    ]
  }
}

Be SPECIFIC and ACTIONABLE. Give real tactics with real timelines, deliverables, and content formats.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: systemPrompt,
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      const assistantMessage = data.content[0].text;

      // Try to extract JSON from the response
      let strategyData = null;

      // First, try to find JSON in code blocks
      const codeBlockMatch = assistantMessage.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (codeBlockMatch) {
        try {
          strategyData = JSON.parse(codeBlockMatch[1]);
        } catch (e) {
          console.log('Failed to parse from code block');
        }
      }

      // If that didn't work, try to find raw JSON
      if (!strategyData) {
        const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            strategyData = JSON.parse(jsonMatch[0]);
          } catch (e) {
            console.log('Failed to parse raw JSON');
          }
        }
      }

      // If we successfully parsed the strategy
      if (strategyData && strategyData.productName) {
        setStrategy(strategyData);
        setConversationComplete(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "✨ Your GTM strategy is ready! Review it in the panel on the right, download it, or start a new strategy."
        }]);
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
${strategy.targetMarket.secondary ? `Secondary: ${strategy.targetMarket.secondary}` : ''}
ICP: ${strategy.targetMarket.icp}

POSITIONING
Value Proposition: ${strategy.positioning.valueProp}
Differentiation: ${strategy.positioning.differentiation}

Key Messages:
Primary: ${strategy.positioning.messaging.primaryMessage}
Supporting:
${strategy.positioning.messaging.supportingMessages.map(msg => `  • ${msg}`).join('\n')}

GTM MOTION
Model: ${strategy.gtmMotion.model}
Rationale: ${strategy.gtmMotion.rationale}

CHANNELS & TACTICS
${strategy.channels.map(ch => `
${ch.channel} (${ch.type}) - ${ch.priority} Priority
${ch.budget ? `Budget: ${ch.budget}` : ''}
Expected Impact: ${ch.expectedImpact}

Tactics:
${ch.tactics.map(t => `  • ${t.tactic}
    Timeline: ${t.timeline}
    Owner: ${t.owner}
    Deliverable: ${t.deliverable}`).join('\n')}
`).join('\n')}

CONTENT STRATEGY
Approach: ${strategy.contentStrategy.approach}

Content Formats:
${strategy.contentStrategy.formats.map(f => `
${f.format}
Purpose: ${f.purpose}
Cadence: ${f.cadence}
Examples: ${f.examples.join(', ')}
`).join('\n')}

LAUNCH PHASES
${strategy.launchPhases.map(phase => `
${phase.phase} (${phase.timeline})
Objectives: ${phase.objectives.join(', ')}

Key Activities:
${phase.keyActivities.map(a => `  • ${a.activity} (${a.owner} - ${a.deadline})`).join('\n')}

Success Metrics: ${phase.successMetrics.join(', ')}
`).join('\n')}

KEY METRICS
North Star: ${strategy.metrics.northStar}
Leading Indicators: ${strategy.metrics.leading.join(', ')}
Lagging Indicators: ${strategy.metrics.lagging.join(', ')}

Targets:
Month 1: ${strategy.metrics.targets.month1}
Month 3: ${strategy.metrics.targets.month3}
Month 6: ${strategy.metrics.targets.month6}

QUICK WINS
${strategy.quickWins.map(w => `• ${w.win}\n  Effort: ${w.effort} | Impact: ${w.impact}`).join('\n')}

RISKS & MITIGATION
${strategy.risks.map(r => `
Risk (${r.likelihood} likelihood): ${r.risk}
Mitigation: ${r.mitigation}
`).join('\n')}

BUDGET ALLOCATION
Total Monthly: ${strategy.budgetAllocation.totalMonthly}

Breakdown:
${strategy.budgetAllocation.breakdown.map(b => `  • ${b.category}: ${b.amount}
    Rationale: ${b.rationale}`).join('\n')}

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
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-gray-700 font-medium"
      >
        <HomeIcon className="w-4 h-4" />
        Back to Portfolio
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GTM Strategy Agent</h1>
          <p className="text-gray-600">AI-powered go-to-market strategy generation</p>
          <p className="text-sm text-gray-500 mt-1">Built by Leslie Langan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
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
                    <p className="text-sm text-gray-600">Answer questions to generate your customized GTM plan</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{strategy.productName}</h2>
                    <p className="text-sm text-gray-600">{strategy.executiveSummary}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Target Market</h3>
                    <p className="text-sm text-gray-900 mb-1"><span className="font-medium">Primary:</span> {strategy.targetMarket.primary}</p>
                    <p className="text-xs text-gray-700">ICP: {strategy.targetMarket.icp}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Positioning</h3>
                    <p className="text-sm text-gray-900 mb-2">{strategy.positioning.valueProp}</p>
                    <p className="text-xs text-gray-700">{strategy.positioning.differentiation}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">GTM Motion</h3>
                    <p className="text-sm font-medium text-gray-900">{strategy.gtmMotion.model}</p>
                    <p className="text-xs text-gray-600 mt-1">{strategy.gtmMotion.rationale}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Key Channels</h3>
                    <div className="space-y-2">
                      {strategy.channels.slice(0, 3).map((ch, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium text-gray-900">{ch.channel} ({ch.priority})</p>
                          <p className="text-xs text-gray-600">{ch.expectedImpact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Quick Wins</h3>
                    <div className="space-y-2">
                      {strategy.quickWins.slice(0, 3).map((win, idx) => (
                        <div key={idx} className="text-sm bg-indigo-50 p-2 rounded">
                          <p className="font-medium text-gray-900">{win.win}</p>
                          <p className="text-xs text-gray-600">Effort: {win.effort} | {win.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Key Metrics</h3>
                    <p className="text-sm"><span className="font-medium">North Star:</span> {strategy.metrics.northStar}</p>
                    <p className="text-xs text-gray-600 mt-1">Month 1 Target: {strategy.metrics.targets.month1}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          <p>This agent conducts an intelligent interview and generates a customized GTM strategy.</p>
        </div>
      </div>
    </div>
  );
}