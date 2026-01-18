import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, Download, RefreshCw, Home as HomeIcon } from 'lucide-react';

export default function OnboardingAgent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Onboarding Agent. I'll help you design a personalized user onboarding experience that drives adoption and engagement.\n\nLet's start with the basics: What product or feature are you onboarding users to?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [onboardingPlan, setOnboardingPlan] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `You are an expert Onboarding Strategy Agent built by Leslie, who has trained over 2,000 users on AI fundamentals and specializes in user adoption psychology.

Your role is to conduct an intelligent interview to understand the product, users, and context, then generate a comprehensive, psychology-informed onboarding strategy.

INTERVIEW PHASE:
- Ask 5-7 thoughtful questions, one at a time
- Adapt based on responses (technical vs non-technical users, AI product vs traditional software, B2B vs B2C)
- Key areas: product complexity, user persona, learning preferences, barriers to adoption, success metrics, resources available
- Focus on behavioral psychology and learning science
- After gathering sufficient information, say "I have everything I need to create your onboarding strategy. Let me put this together..." and then respond with ONLY the JSON structure below

ONBOARDING PLAN GENERATION:
When ready, generate a comprehensive plan as a JSON object with this EXACT structure (respond with ONLY this JSON, no other text):

{
  "productName": "string",
  "userPersona": "description of target user",
  "executiveSummary": "2-3 sentence overview of the onboarding approach",
  "learningObjectives": {
    "primary": "main goal users should achieve",
    "secondary": ["supporting objective 1", "supporting objective 2"]
  },
  "adoptionBarriers": [
    {
      "barrier": "psychological or practical barrier",
      "strategy": "how to overcome it"
    }
  ],
  "onboardingFlow": [
    {
      "stage": "Stage name (e.g., Welcome & Orientation)",
      "duration": "estimated time",
      "objectives": ["what users learn/do"],
      "tactics": [
        {
          "tactic": "specific action or touchpoint",
          "rationale": "why this works psychologically"
        }
      ],
      "successMetrics": ["how to measure completion/understanding"]
    }
  ],
  "contentStrategy": {
    "approach": "overall content philosophy",
    "formats": [
      {
        "format": "format type (video, interactive, documentation, etc.)",
        "when": "when to use it",
        "why": "psychological rationale"
      }
    ]
  },
  "personalization": {
    "segments": [
      {
        "segment": "user type",
        "adaptations": ["how onboarding differs for this group"]
      }
    ]
  },
  "metrics": {
    "engagement": ["metric 1", "metric 2"],
    "competency": ["metric 1", "metric 2"],
    "retention": ["metric 1", "metric 2"]
  },
  "timeline": "recommended rollout timeline"
}

Draw on learning psychology, behavior change models, and AI adoption best practices. Be specific and actionable.`;

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
          const planData = JSON.parse(jsonMatch[0]);
          setOnboardingPlan(planData);
          setConversationComplete(true);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "✨ Your onboarding strategy is ready! Review it below, download it, or start a new plan."
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
        content: "Hi! I'm your Onboarding Agent. I'll help you design a personalized user onboarding experience that drives adoption and engagement.\n\nLet's start with the basics: What product or feature are you onboarding users to?"
      }
    ]);
    setOnboardingPlan(null);
    setConversationComplete(false);
  };

  const handleDownload = () => {
    const planText = `
ONBOARDING STRATEGY: ${onboardingPlan.productName}

USER PERSONA
${onboardingPlan.userPersona}

EXECUTIVE SUMMARY
${onboardingPlan.executiveSummary}

LEARNING OBJECTIVES
Primary: ${onboardingPlan.learningObjectives.primary}
Secondary: 
${onboardingPlan.learningObjectives.secondary.map(obj => `  • ${obj}`).join('\n')}

ADOPTION BARRIERS & STRATEGIES
${onboardingPlan.adoptionBarriers.map(b => `
Barrier: ${b.barrier}
Strategy: ${b.strategy}
`).join('\n')}

ONBOARDING FLOW
${onboardingPlan.onboardingFlow.map(stage => `
${stage.stage} (${stage.duration})
Objectives: ${stage.objectives.join(', ')}

Tactics:
${stage.tactics.map(t => `  • ${t.tactic}
    Rationale: ${t.rationale}`).join('\n')}

Success Metrics: ${stage.successMetrics.join(', ')}
`).join('\n')}

CONTENT STRATEGY
Approach: ${onboardingPlan.contentStrategy.approach}

Formats:
${onboardingPlan.contentStrategy.formats.map(f => `
  ${f.format}
  When: ${f.when}
  Why: ${f.why}
`).join('\n')}

PERSONALIZATION
${onboardingPlan.personalization.segments.map(s => `
${s.segment}:
${s.adaptations.map(a => `  • ${a}`).join('\n')}
`).join('\n')}

KEY METRICS
Engagement: ${onboardingPlan.metrics.engagement.join(', ')}
Competency: ${onboardingPlan.metrics.competency.join(', ')}
Retention: ${onboardingPlan.metrics.retention.join(', ')}

TIMELINE
${onboardingPlan.timeline}

---
Generated by Onboarding Agent
Built by Leslie Langan
`;

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Onboarding-Strategy-${onboardingPlan.productName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Onboarding Agent</h1>
          <p className="text-gray-600">Psychology-informed user onboarding strategy</p>
          <p className="text-sm text-gray-500 mt-1">Built by Leslie Langan</p>
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
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Plan Display */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6" style={{ height: '600px', overflowY: 'auto' }}>
              {!onboardingPlan ? (
                <div className="h-full flex items-center justify-center text-center px-4">
                  <div>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Strategy Will Appear Here</h3>
                    <p className="text-sm text-gray-600">Answer questions to generate your customized onboarding plan</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{onboardingPlan.productName}</h2>
                    <p className="text-xs text-gray-500 mb-2">{onboardingPlan.userPersona}</p>
                    <p className="text-sm text-gray-600">{onboardingPlan.executiveSummary}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Learning Objectives</h3>
                    <p className="text-sm mb-2"><span className="font-medium">Primary:</span> {onboardingPlan.learningObjectives.primary}</p>
                    <div className="space-y-1">
                      {onboardingPlan.learningObjectives.secondary.slice(0, 2).map((obj, idx) => (
                        <p key={idx} className="text-xs text-gray-700">• {obj}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Adoption Barriers</h3>
                    <div className="space-y-2">
                      {onboardingPlan.adoptionBarriers.slice(0, 2).map((barrier, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium text-gray-900">{barrier.barrier}</p>
                          <p className="text-xs text-gray-600">{barrier.strategy}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Onboarding Flow</h3>
                    <div className="space-y-3">
                      {onboardingPlan.onboardingFlow.slice(0, 2).map((stage, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium">{stage.stage}</p>
                          <p className="text-xs text-gray-600">{stage.duration}</p>
                          <div className="mt-1 space-y-1">
                            {stage.tactics.slice(0, 1).map((tactic, i) => (
                              <div key={i} className="text-xs">
                                <p className="text-gray-900">• {tactic.tactic}</p>
                                <p className="text-gray-500 ml-3">{tactic.rationale}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Content Strategy</h3>
                    <p className="text-sm mb-2">{onboardingPlan.contentStrategy.approach}</p>
                    <div className="space-y-2">
                      {onboardingPlan.contentStrategy.formats.slice(0, 2).map((format, idx) => (
                        <div key={idx} className="text-xs">
                          <p className="font-medium text-gray-900">{format.format}</p>
                          <p className="text-gray-600">{format.why}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Key Metrics</h3>
                    <div className="space-y-1 text-xs">
                      <p><span className="font-medium">Engagement:</span> {onboardingPlan.metrics.engagement[0]}</p>
                      <p><span className="font-medium">Competency:</span> {onboardingPlan.metrics.competency[0]}</p>
                      <p><span className="font-medium">Retention:</span> {onboardingPlan.metrics.retention[0]}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>This agent applies learning psychology and behavioral science to create effective onboarding.</p>
          <p className="mt-1">Based on experience training 2,000+ users on AI fundamentals.</p>
        </div>
      </div>
    </div>
  );
}