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

Adjust questions accordingly. After gathering sufficient information, say "I have everything I need. Let me build your GTM plan..." and respond with ONLY the JSON structure below.

GTM PLAN GENERATION:
Generate a comprehensive, actionable plan as JSON with this EXACT structure (respond with ONLY this JSON, no other text):

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
          "owner": "who should do this (e.g., Product Marketing, Content, Sales Enablement)",
          "deliverable": "what gets created/shipped"
        }
      ],
      "budget": "recommended budget allocation if applicable",
      "expectedImpact": "what results to expect"
    }
  ],
  "contentStrategy": {
    "approach": "overall philosophy (e.g., education-first, demo-driven, community-led)",
    "formats": [
      {
        "format": "Video/Webinar/Training/Documentation/Interactive Demo/Blog/Social/Podcast",
        "purpose": "why this format for this audience",
        "cadence": "how often to produce",
        "examples": ["specific piece 1", "specific piece 2"]
      }
    ],
    "hero": {
      "asset": "flagship content piece (e.g., Ultimate Guide video series, Launch webinar)",
      "purpose": "what it accomplishes",
      "promotion": "how to distribute it"
    }
  },
  "ownedEarnedTactics": {
    "email": [
      {
        "campaign": "email campaign name/purpose",
        "audience": "who receives it",
        "timing": "when to send",
        "keyMessage": "main point to communicate",
        "cta": "what action you want them to take"
      }
    ],
    "video": [
      {
        "asset": "video type (product demo, customer story, tutorial, webinar recording)",
        "topic": "what it covers",
        "length": "recommended duration",
        "distribution": "where to publish and promote it"
      }
    ],
    "webinars": [
      {
        "topic": "webinar subject",
        "format": "presentation style (demo, panel, workshop, AMA)",
        "timing": "when to host relative to launch",
        "promotion": "how to drive registration",
        "followUp": "post-webinar nurture plan"
      }
    ],
    "trainingMaterials": [
      {
        "asset": "training type (certification, self-serve course, office hours, workshop)",
        "audience": "who it's for (customers, prospects, internal team)",
        "format": "delivery method (video, live session, interactive, documentation)",
        "timeline": "when to make available"
      }
    ],
    "liveSessions": [
      {
        "session": "live format (office hours, AMA, workshop, launch event)",
        "frequency": "how often (weekly, monthly, one-time)",
        "purpose": "what it accomplishes",
        "platform": "where to host (Zoom, LinkedIn Live, YouTube, etc.)"
      }
    ],
    "releaseNotes": {
      "approach": "how to position in release notes",
      "emphasis": "what to highlight",
      "callToAction": "what you want users to do",
      "supportingAssets": "links to video demo, docs, training"
    },
    "internalEnablement": [
      {
        "audience": "team to enable (Sales, CS, Support, Product)",
        "content": "what they need to know",
        "format": "how to deliver it (live training, recorded demo, FAQ, certification, practice environment)",
        "timing": "when to train them (before launch, at launch, ongoing)",
        "materials": "specific assets to create (battlecard, demo script, objection handling, FAQ)"
      }
    ],
    "advocacy": [
      {
        "tactic": "user/employee advocacy play",
        "execution": "how to activate it",
        "timeline": "when to deploy",
        "incentive": "what advocates get (recognition, early access, swag, etc.)"
      }
    ],
    "partnerships": [
      {
        "partner": "type of partner or specific partner",
        "play": "co-marketing or integration tactic (co-webinar, case study, integration showcase)",
        "value": "what both sides get"
      }
    ]
  },
  "launchPhases": [
    {
      "phase": "Phase name (e.g., Internal Enablement, Soft Launch, Public Launch, Scale)",
      "timeline": "specific timeframe (e.g., Weeks 1-4, Month 1-2)",
      "objectives": ["specific goal 1", "specific goal 2"],
      "keyActivities": [
        {
          "activity": "specific deliverable or action",
          "owner": "team/role responsible",
          "deadline": "relative deadline (e.g., End of Week 2)",
          "deliverable": "what gets produced"
        }
      ],
      "successMetrics": ["measurable metric 1", "measurable metric 2"]
    }
  ],
  "metrics": {
    "northStar": "primary success metric",
    "leading": ["leading indicator 1", "leading indicator 2", "content engagement metrics"],
    "lagging": ["lagging indicator 1", "lagging indicator 2"],
    "targets": {
      "month1": "specific target (e.g., 500 signups, 10 demos, 80% internal team trained, 200 webinar attendees)",
      "month3": "specific target",
      "month6": "specific target"
    }
  },
  "quickWins": [
    {
      "win": "immediate action to take in first 2 weeks",
      "effort": "Low/Medium/High",
      "impact": "expected result",
      "type": "Content/Channel/Enablement/Campaign"
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
    "totalMonthly": "recommended monthly marketing spend (or 'Primarily owned/earned' if low budget)",
    "breakdown": [
      {
        "category": "spend category (e.g., Paid Ads, Video Production, Webinar Platform, Content, Tools, Events)",
        "amount": "monthly amount or 'time investment'",
        "rationale": "why this allocation"
      }
    ]
  }
}

Be SPECIFIC and ACTIONABLE with REAL content formats and activation plans:

VIDEO examples: 
- "Produce 3-part tutorial series: (1) 5-min 'Getting Started', (2) 10-min 'Advanced Features', (3) 3-min 'Common Pitfalls'. Publish Week 1 on YouTube, embed on website, promote in launch email"
- "Record 90-second product demo showing [specific use case], optimize for social (square format, captions), run as LinkedIn video ad"

WEBINAR examples:
- "Host 'Launch Day' webinar with live demo + Q&A on [date], target 200 registrations via email (existing users) + LinkedIn ads ($2k budget). Record and repurpose into 3 short clips for social"
- "Run monthly 'Office Hours' starting Week 3 - casual 30-min Zoom where users can ask questions. Promote via in-app banner + email"

TRAINING examples:
- "Create self-serve certification: 4 modules (video + quiz), takes 45 mins, leads to badge. Launch Week 2, promote to enterprise customers"
- "Host live onboarding workshop every Friday for new signups - 60 min hands-on session walking through [specific workflow]"

LIVE SESSION examples:
- "Weekly Thursday AMA on LinkedIn Live (30 mins) - PM answers questions, demos new features. Starts Week 2, promotes community building"
- "Launch day virtual event: 2-hour program with product showcase, customer panel, live demo. Target 500+ attendees"

INTERNAL examples:
- Sales: "Record 15-min demo walkthrough + create leave-behind one-pager. Host live 60-min training with role-play scenarios. Provide Slack channel for questions"
- CS: "Produce FAQ video (10 mins) covering top 10 questions. Create troubleshooting flowchart. Schedule weekly office hours first month"

Don't just list formats - give REAL content ideas with REAL specifications, timelines, and distribution plans.`;

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
