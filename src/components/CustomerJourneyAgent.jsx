import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, Download, RefreshCw, Home as HomeIcon } from 'lucide-react';

export default function CustomerJourneyAgent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Customer Journey Optimization Agent. I'll help you map and optimize your customer journey to improve conversion, engagement, and retention.\n\nLet's begin: What product or service are we optimizing the customer journey for?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [journeyMap, setJourneyMap] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `You are an expert Customer Journey Optimization Agent built by Leslie, with deep expertise in B2B tech customer lifecycle management and conversion optimization.

Your role is to conduct an intelligent interview about the customer, product, and business context, then create a comprehensive customer journey map with optimization recommendations.

INTERVIEW PHASE:
- Ask 5-7 strategic questions, one at a time
- Adapt based on responses (B2B vs B2C, transactional vs relationship, high-touch vs self-serve)
- Key areas: customer segments, current journey touchpoints, pain points, conversion goals, competitive context, data/tools available
- Focus on identifying friction, drop-off points, and optimization opportunities
- After gathering sufficient information, say "I have everything I need to create your customer journey map. Let me build this..." and then respond with ONLY the JSON structure below

JOURNEY MAP GENERATION:
When ready, generate a comprehensive map as a JSON object with this EXACT structure (respond with ONLY this JSON, no other text):

{
  "productName": "string",
  "customerSegment": "primary customer segment being mapped",
  "executiveSummary": "2-3 sentence overview of the journey and key opportunities",
  "journeyStages": [
    {
      "stage": "Stage name (Awareness, Consideration, Decision, Onboarding, Adoption, Retention, Advocacy)",
      "customerGoals": ["what customer wants to achieve"],
      "touchpoints": [
        {
          "touchpoint": "specific interaction point",
          "channel": "channel (web, email, product, sales, etc.)",
          "purpose": "what this touchpoint accomplishes"
        }
      ],
      "painPoints": [
        {
          "pain": "friction or problem customer experiences",
          "impact": "how this affects conversion/satisfaction"
        }
      ],
      "optimizations": [
        {
          "recommendation": "specific optimization",
          "rationale": "why this will improve the journey",
          "priority": "High/Medium/Low"
        }
      ],
      "metrics": ["key metrics to track for this stage"]
    }
  ],
  "crossStageOpportunities": [
    {
      "opportunity": "optimization that spans multiple stages",
      "stages": ["affected stages"],
      "impact": "expected business impact"
    }
  ],
  "personalization": {
    "approach": "overall personalization strategy",
    "segments": [
      {
        "segment": "customer type",
        "adaptations": ["how journey differs for this segment"]
      }
    ]
  },
  "quickWins": [
    {
      "win": "immediate improvement to implement",
      "effort": "Low/Medium/High",
      "impact": "expected impact"
    }
  ],
  "metrics": {
    "conversion": ["key conversion metrics"],
    "engagement": ["engagement indicators"],
    "retention": ["retention metrics"]
  }
}

Be strategic, data-informed, and actionable. Focus on measurable improvements to conversion, engagement, and retention.`;

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
          const mapData = JSON.parse(jsonMatch[0]);
          setJourneyMap(mapData);
          setConversationComplete(true);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "✨ Your customer journey map is ready! Review the insights and optimizations below."
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
        content: "Hi! I'm your Customer Journey Optimization Agent. I'll help you map and optimize your customer journey to improve conversion, engagement, and retention.\n\nLet's begin: What product or service are we optimizing the customer journey for?"
      }
    ]);
    setJourneyMap(null);
    setConversationComplete(false);
  };

  const handleDownload = () => {
    const mapText = `
CUSTOMER JOURNEY MAP: ${journeyMap.productName}

CUSTOMER SEGMENT
${journeyMap.customerSegment}

EXECUTIVE SUMMARY
${journeyMap.executiveSummary}

JOURNEY STAGES
${journeyMap.journeyStages.map(stage => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${stage.stage

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Journey Agent</h1>
          <p className="text-gray-600">Map and optimize every stage of the customer experience</p>
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
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    New Journey
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6" style={{ height: '600px', overflowY: 'auto' }}>
              {!journeyMap ? (
                <div className="h-full flex items-center justify-center text-center px-4">
                  <div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Journey Map Will Appear Here</h3>
                    <p className="text-sm text-gray-600">Answer questions to generate your customized journey analysis</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{journeyMap.productName}</h2>
                    <p className="text-xs text-gray-500 mb-2">{journeyMap.customerSegment}</p>
                    <p className="text-sm text-gray-600">{journeyMap.executiveSummary}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-2">Quick Wins</h3>
                    <div className="space-y-2">
                      {journeyMap.quickWins.slice(0, 3).map((win, idx) => (
                        <div key={idx} className="text-sm bg-emerald-50 p-2 rounded-lg">
                          <p className="font-medium text-gray-900">{win.win}</p>
                          <p className="text-xs text-gray-600">Effort: {win.effort} • {win.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-2">Journey Stages</h3>
                    <div className="space-y-3">
                      {journeyMap.journeyStages.slice(0, 3).map((stage, idx) => (
                        <div key={idx} className="text-sm border-l-2 border-emerald-300 pl-3">
                          <p className="font-medium text-gray-900">{stage.stage}</p>
                          <p className="text-xs text-gray-600 mt-1">Goals: {stage.customerGoals[0]}</p>
                          {stage.painPoints.length > 0 && (
                            <p className="text-xs text-red-600 mt-1">⚠ {stage.painPoints[0].pain}</p>
                          )}
                          {stage.optimizations.length > 0 && (
                            <p className="text-xs text-emerald-700 mt-1">💡 {stage.optimizations[0].recommendation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-2">Cross-Stage Opportunities</h3>
                    <div className="space-y-2">
                      {journeyMap.crossStageOpportunities.slice(0, 2).map((opp, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium text-gray-900">{opp.opportunity}</p>
                          <p className="text-xs text-gray-600">{opp.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-2">Key Metrics</h3>
                    <div className="space-y-1 text-xs">
                      <p><span className="font-medium">Conversion:</span> {journeyMap.metrics.conversion[0]}</p>
                      <p><span className="font-medium">Engagement:</span> {journeyMap.metrics.engagement[0]}</p>
                      <p><span className="font-medium">Retention:</span> {journeyMap.metrics.retention[0]}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>This agent maps customer journeys and identifies high-impact optimization opportunities.</p>
          <p className="mt-1">Perfect for improving conversion, engagement, and retention metrics.</p>
        </div>
      </div>
    </div>
  );
}