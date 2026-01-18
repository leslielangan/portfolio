import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, Users, Map, ArrowRight, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const agents = [
    {
      id: 'gtm',
      name: 'GTM Strategy Agent',
      path: '/gtm-agent',
      icon: Target,
      color: 'indigo',
      description: 'AI-powered go-to-market strategy generation that conducts intelligent interviews and produces comprehensive GTM plans.',
      features: [
        'Adaptive questioning based on product type',
        'Strategic positioning & messaging frameworks',
        'Channel strategy with prioritization',
        'Launch phases with metrics & KPIs'
      ],
      gradient: 'from-indigo-50 to-purple-50'
    },
    {
      id: 'onboarding',
      name: 'Onboarding Agent',
      path: '/onboarding-agent',
      icon: Users,
      color: 'purple',
      description: 'Psychology-informed user onboarding strategy based on training 2,000+ users on AI fundamentals.',
      features: [
        'Learning psychology & behavior change models',
        'Adoption barrier identification & mitigation',
        'Personalized onboarding flows',
        'Content strategy with format recommendations'
      ],
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      id: 'journey',
      name: 'Customer Journey Agent',
      path: '/customer-journey-agent',
      icon: Map,
      color: 'emerald',
      description: 'Comprehensive customer journey mapping with optimization recommendations for conversion and retention.',
      features: [
        'Multi-stage journey analysis',
        'Pain point & friction identification',
        'Quick wins with effort/impact ratings',
        'Personalization by customer segment'
      ],
      gradient: 'from-emerald-50 to-teal-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Leslie Langan
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            VP Product Marketing | AI Strategy & User Adoption Specialist
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            16+ years building go-to-market strategies and training teams on AI fundamentals. 
            Specializing in human-centered AI experiences and product-led growth.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <a 
              href="https://www.linkedin.com/in/leslielangan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a 
              href="mailto:leslie@leslielangan.com"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Building AI That People Actually Want to Use</h2>
          <p className="text-gray-600 mb-4">
           I love the translation layer of product marketing—figuring out why a product fits, 
what makes someone care, how to bridge what's possible with what's actually useful. 
But I'm increasingly focused on AI because I believe we're at a turning point. 
</p>
          <p className="text-gray-600 mb-4">
            AI is 
going to fundamentally change how humans interact with technology, with each other, 
and with the world around them. And honestly? There's a real risk of a dystopian turn 
here. I want to be one of the people making sure that as this technology advances, it 
does so in a way that has a positive impact—on the people using it and on society as 
a whole. 
          </p>

          <p className="text-gray-600">
            These agents are part of that work: learning, tinkering, testing what it looks 
like to build AI that serves people well. I'm figuring this out as I go, but I think 
that's the point.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Interactive AI Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div 
                  key={agent.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => navigate(agent.path)}
                >
                  <div className={`bg-gradient-to-br ${agent.gradient} p-6`}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-${agent.color}-100 rounded-lg mb-4`}>
                      <IconComponent className={`w-6 h-6 text-${agent.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                    <ul className="space-y-2 mb-6">
                      {agent.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className={`text-${agent.color}-500 mt-0.5`}>•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-${agent.color}-600 text-white rounded-lg hover:bg-${agent.color}-700 transition-colors group-hover:gap-3`}
                    >
                      Try It Live
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Background Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Background & Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Experience</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• VP Product Marketing at Horizon Media</li>
                <li>• 16+ years in B2B tech product marketing</li>
                <li>• Led GTM strategy for AI-native Blu Platform</li>
                <li>• Trained 2,000+ users on AI fundamentals</li>
                <li>• Expert in AI adoption psychology & change management</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Focus</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Pursuing graduate studies in Human-Computer Interaction</li>
                <li>• Exploring international opportunities (Barcelona, London)</li>
                <li>• Building AI agents that bridge strategic frameworks with user psychology</li>
                <li>• Passionate about animal welfare AI applications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Together</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Whether you're looking for strategic product marketing expertise, AI adoption consulting, 
            or collaboration on HCI research, I'd love to connect.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="mailto:leslie@leslielangan.com"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get in Touch
            </a>
            <a 
              href="https://www.linkedin.com/in/leslielangan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition-colors flex items-center gap-2"
            >
              View LinkedIn
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2026 Leslie Langan. Built with Claude AI and React.</p>
        </div>
      </div>
    </div>
  );
}
