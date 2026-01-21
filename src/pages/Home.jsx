import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#03110E]">
      {/* Paper grain texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.015]"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="3"/></filter><rect width="300" height="300" filter="url(%23n)"/></svg>')`
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-[#DBE6E5] z-[100] py-7">
        <div className="max-w-[1200px] mx-auto px-20 flex justify-between items-center">
          <div className="text-base font-bold text-[#03110E] uppercase tracking-[2px]">
            Leslie Langan
          </div>
          <ul className="flex gap-11 list-none">
            <li><a href="#home" className="no-underline text-[#536B79] font-medium text-sm uppercase tracking-[1px] hover:text-[#26413C] transition-colors">Home</a></li>
            <li><a href="#agents" className="no-underline text-[#536B79] font-medium text-sm uppercase tracking-[1px] hover:text-[#26413C] transition-colors">Agents</a></li>
            <li><a href="#work" className="no-underline text-[#536B79] font-medium text-sm uppercase tracking-[1px] hover:text-[#26413C] transition-colors">Work</a></li>
            <li><a href="#about" className="no-underline text-[#536B79] font-medium text-sm uppercase tracking-[1px] hover:text-[#26413C] transition-colors">About</a></li>
            <li><a href="https://www.linkedin.com/in/leslielangan" target="_blank" rel="noopener noreferrer" className="no-underline text-[#536B79] font-medium text-sm uppercase tracking-[1px] hover:text-[#26413C] transition-colors">LinkedIn →</a></li>
          </ul>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-20">
        {/* Hero Section */}
        <section className="py-[120px] pb-20 text-center" id="home">
          <h1 className="text-[84px] font-bold text-[#536B79] leading-tight mb-5" style={{ fontFamily: "'Pacifico', cursive" }}>
            Leslie Langan
          </h1>
          <h2 className="text-[120px] font-black text-[#26413C] leading-none mb-12" style={{ letterSpacing: '-4px' }}>
            Product Marketer
          </h2>
          <p className="text-[22px] text-[#536B79] max-w-[700px] mx-auto mb-15 leading-relaxed">
            Building AI-powered tools that make<br />go-to-market strategy accessible and actionable.
          </p>
        </section>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#26413C] py-14 -mx-20 shadow-[0_8px_24px_rgba(38,65,60,0.2)]">
        <div className="grid grid-cols-3 max-w-[900px] mx-auto text-center">
          <div>
            <div className="text-[28px] font-bold text-[#DBE6E5] leading-tight mb-2 tracking-wide">Product Marketing</div>
            <div className="text-[15px] text-[#DBE6E5]/80 uppercase tracking-[1.5px] font-semibold">Expert</div>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#DBE6E5] leading-tight mb-2 tracking-wide">AI Strategy</div>
            <div className="text-[15px] text-[#DBE6E5]/80 uppercase tracking-[1.5px] font-semibold">Leader</div>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#DBE6E5] leading-tight mb-2 tracking-wide">Go-to-Market</div>
            <div className="text-[15px] text-[#DBE6E5]/80 uppercase tracking-[1.5px] font-semibold">Architect</div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-20">
        {/* AI Agents Section */}
        <section className="py-[140px]" id="agents">
          <div className="mb-20">
            <h2 className="text-[88px] font-black text-[#03110E] leading-[0.95] pb-6 border-b-[6px] border-[#26413C] inline-block" style={{ letterSpacing: '-3px' }}>
              AI-Powered <span className="text-[#536B79]" style={{ fontFamily: "'Pacifico', cursive", fontWeight: 700 }}>Agents</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-9">
            {/* Card 1 */}
            <div 
              className="bg-white p-12 px-10 border-2 border-[#DBE6E5] rounded-sm relative cursor-pointer transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.04)] hover:translate-y-[-6px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.08)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[6px] after:bg-[#26413C] after:transition-all"
              onClick={() => navigate('/gtm-agent')}
            >
              <div className="text-[96px] font-bold text-[#DBE6E5] leading-none mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>01</div>
              <h3 className="text-[26px] font-extrabold text-[#03110E] mb-7 leading-tight">GTM Strategy Agent</h3>
              <button className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                Try It →
              </button>
            </div>

            {/* Card 2 */}
            <div 
              className="bg-white p-12 px-10 border-2 border-[#DBE6E5] rounded-sm relative cursor-pointer transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.04)] hover:translate-y-[-6px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.08)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[6px] after:bg-[#536B79] after:transition-all"
              onClick={() => navigate('/onboarding-agent')}
            >
              <div className="text-[96px] font-bold text-[#DBE6E5] leading-none mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>02</div>
              <h3 className="text-[26px] font-extrabold text-[#03110E] mb-7 leading-tight">Onboarding Agent</h3>
              <button className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                Try It →
              </button>
            </div>

            {/* Card 3 */}
            <div 
              className="bg-white p-12 px-10 border-2 border-[#DBE6E5] rounded-sm relative cursor-pointer transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.04)] hover:translate-y-[-6px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.08)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[6px] after:bg-[#616B61] after:transition-all"
              onClick={() => navigate('/customer-journey-agent')}
            >
              <div className="text-[96px] font-bold text-[#DBE6E5] leading-none mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>03</div>
              <h3 className="text-[26px] font-extrabold text-[#03110E] mb-7 leading-tight">Customer Journey Agent</h3>
              <button className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                Try It →
              </button>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-[140px]" id="work">
          <div className="mb-20">
            <h2 className="text-[88px] font-black text-[#03110E] leading-[0.95] pb-6 border-b-[6px] border-[#26413C] inline-block" style={{ letterSpacing: '-3px' }}>
              Case Studies & <span className="text-[#536B79]" style={{ fontFamily: "'Pacifico', cursive", fontWeight: 700 }}>Work</span>
            </h2>
          </div>

          {/* Featured Case Studies */}
          <h3 className="text-[36px] font-bold text-[#03110E] mb-10">Featured Case Studies</h3>
          <div className="grid grid-cols-2 gap-12 mb-24">
            {/* Abakus - Game Theory Education */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Abakus Preview]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Case Study</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Making Nobel Prize-Winning Math Accessible</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Educational content strategy for game theory attribution platform. Created video series and white paper still cited 10+ years later.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* Cuebiq COVID-19 */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Cuebiq Preview]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Case Study</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Marketing in a Crisis</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Launched COVID-19 data products in two weeks. Partnerships with CDC, Oxford, Johns Hopkins, UNICEF.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* LiveRamp IdentityLink */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [LiveRamp Preview]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Case Study</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Launching IdentityLink</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Three-phase GTM strategy for people-based marketing. Secured partnerships with Adobe, MediaMath, The Trade Desk.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* Yardline CaaS */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Yardline Preview]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Case Study</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Building a Partner Program from Zero</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Capital-as-a-Service for e-commerce. Generated 400% YoY growth for Nicole + Brizee. Acquired by Thrasio.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* RampPups */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [RampPups Preview]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Case Study</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">RampPups: Values-Driven Sponsorship</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Dog rescue sponsorship became crowd favorite. Part of $800K+ sponsorship program. Still running today.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* Horizon AI Education - PLACEHOLDER FOR NEW CASE STUDY */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Horizon Preview]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Case Study</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Training 2,000+ Users on AI Fundamentals</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  AI education program at Horizon Media. Built curriculum, knowledge systems, and AI-powered workflows.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>
          </div>

          {/* Additional Work Examples */}
          <h3 className="text-[36px] font-bold text-[#03110E] mb-10">Additional Work</h3>
          <div className="grid grid-cols-2 gap-12">
            {/* Work Example 1 - PLACEHOLDER */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Work Example 1]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Work Sample</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Project Title</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Brief description of the work sample or deliverable.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* Work Example 2 - PLACEHOLDER */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Work Example 2]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Work Sample</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Project Title</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Brief description of the work sample or deliverable.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* Work Example 3 - PLACEHOLDER */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Work Example 3]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Work Sample</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Project Title</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Brief description of the work sample or deliverable.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>

            {/* Work Example 4 - PLACEHOLDER */}
            <div className="bg-white border-2 border-[#DBE6E5] rounded-sm overflow-hidden transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] hover:translate-y-[-6px] hover:border-[#26413C] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="h-64 bg-[#DBE6E5] flex items-center justify-center text-[#536B79] font-semibold">
                [Work Example 4]
              </div>
              <div className="p-10">
                <span className="text-xs text-[#616B61] uppercase tracking-[1.5px] font-semibold">Work Sample</span>
                <h3 className="text-[32px] font-black text-[#03110E] mt-3 mb-5 leading-tight">Project Title</h3>
                <p className="text-[15px] text-[#536B79] leading-relaxed mb-7">
                  Brief description of the work sample or deliverable.
                </p>
                <a href="#" className="inline-block text-[#26413C] font-bold text-sm uppercase tracking-[1px] transition-all hover:tracking-[2px]">
                  View PDF →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="bg-[#DBE6E5] -mx-20 py-[140px]" id="about">
        <div className="grid grid-cols-2 gap-20 max-w-[1100px] mx-auto px-20">
          <div>
            <div className="text-[48px] font-bold text-[#536B79] mb-6 leading-tight" style={{ fontFamily: "'Pacifico', cursive" }}>
              Background
            </div>
            <h3 className="text-[52px] font-black text-[#03110E] mb-8 leading-[1.1]">
              16+ Years in Product Marketing
            </h3>
            <p className="text-[16px] text-[#536B79] leading-relaxed">
              I've spent 16+ years translating complex products into clear value propositions. Most recently, I led GTM strategy for AI-native platforms and trained over 2,000 users on AI fundamentals. Now I'm focused on using AI to democratize the strategic work that's traditionally been locked behind years of experience. I'm also a marathon runner and long-time foster volunteer with Muddy Paws Rescue. Both keep me grounded and remind me that some of the most important work happens offline.
            </p>
          </div>

          <div>
            <div className="text-[48px] font-bold text-[#536B79] mb-6 leading-tight" style={{ fontFamily: "'Pacifico', cursive" }}>
              Focus
            </div>
            <h3 className="text-[52px] font-black text-[#03110E] mb-8 leading-[1.1]">
              Human-Centered AI
            </h3>
            <p className="text-[16px] text-[#536B79] leading-relaxed">
              I'm exploring how AI can augment—not replace—human decision-making in marketing and product strategy. The next frontier isn't just building smarter tools—it's creating AI that unlocks human creativity, amplifies strategic thinking, and keeps us connected to the people we serve.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-20">
        {/* Footer CTA */}
        <section className="py-[140px] text-center">
          <h2 className="text-[100px] font-black text-[#26413C] leading-[1.1] mb-12" style={{ letterSpacing: '-3px' }}>
            Let's<br />Connect
          </h2>
          <a 
            href="https://www.linkedin.com/in/leslielangan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-16 py-6 bg-[#26413C] text-white text-sm font-bold uppercase tracking-[2px] rounded-sm transition-all hover:bg-[#1a2d29] hover:shadow-[0_8px_24px_rgba(38,65,60,0.3)]"
          >
            View LinkedIn
          </a>
        </section>
      </div>
    </div>
  );
}
