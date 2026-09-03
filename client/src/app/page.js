'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const featuredHubs = [
    {
      district: 'Kolhapur',
      specialty: 'Handcrafted Leather Chappals & Artifacts',
      category: 'Handicrafts',
      seller: 'Ramesh Kolhapuri Crafts',
      slug: 'ramesh-kolhapuri-crafts',
      gradient: 'from-amber-900/90 to-stone-900',
      badge: 'Heritage Craft',
    },
    {
      district: 'Nashik',
      specialty: 'Sun-Dried Raisins & Turmeric Spices',
      category: 'Organic/Food Products',
      seller: "Sunita's Organic Farms",
      slug: 'sunitas-organic-farms',
      gradient: 'from-emerald-950/90 to-teal-950',
      badge: 'Farm Direct',
    },
    {
      district: 'Nagpur',
      specialty: 'Handwoven Cotton Sarees & Towel Sets',
      category: 'Handloom/Textiles',
      seller: 'Vidarbha Cotton Weaves',
      slug: 'vidarbha-cotton-weaves',
      gradient: 'from-indigo-950/90 to-slate-900',
      badge: 'Artisan Loom',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Storefront Setup',
      desc: 'Rural creators set up a multilingual digital storefront with assistance from local coordinators.',
    },
    {
      step: '02',
      title: 'AI Brand Enhancement',
      desc: 'Our AI Brand Studio generates engaging descriptions, tags, and translations across English, Hindi, and Marathi.',
    },
    {
      step: '03',
      title: 'Trust Verification',
      desc: 'Platform admins verify artisan credentials and assign the trusted RuralRise badge.',
    },
    {
      step: '04',
      title: 'Direct Market Access',
      desc: 'Buyers across India enquire, order, and track authentic regional goods directly from village creators.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Universal Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-white to-amber-50/40 opacity-70 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Empowering Maharashtra's Rural Grassroots Innovators
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            From Local Roots to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600">
              Wider Reach
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            RuralRise connects verified village entrepreneurs, weavers, and farmers across Maharashtra directly with nationwide buyers. Establishing credible branding, quality assurance, and direct market access.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-200 hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Explore Marketplace</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-sm font-bold rounded-xl shadow-xs transition-all text-center"
            >
              Open Your Storefront
            </Link>
          </div>

          {/* Trust Highlights Row */}
          <div className="mt-16 pt-8 border-t border-slate-100 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-black text-slate-900">3 Hubs</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Kolhapur • Nashik • Nagpur</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Direct Creator Sourced</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">3 Languages</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">English • हिंदी • मराठी</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">Verified</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Authenticity Checks</div>
            </div>
          </div>

        </div>
      </section>

      {/* The Core Challenge (Problem Section) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2">The Challenge</h2>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">Why Rural Creators Struggle to Scale</h3>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Skilled artisans in Maharashtra produce world-class crafts and pure foods, but face systemic barriers that limit them to middleman exploitation and hyper-local markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold mb-5">
                01
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Digital Disconnect & Language</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Most e-commerce platforms require English proficiency and complex cataloguing. Rural entrepreneurs lack the tools to tell their business story or market digitally.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold mb-5">
                02
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Lack of Brand Trust</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Urban buyers desire authentic rural goods, but hesitate without reliable quality verification, return confidence, and creator authenticity standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xl font-bold mb-5">
                03
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Middleman Dependency</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Intermediaries take up to 60–70% of retail margins while craftsmen earn pennies. Transparent last-mile connectivity is required to restore fair profits.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* The RuralRise Solution (Four Pillars) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-600 mb-2">Platform Pillars</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How RuralRise Solves It</h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              An integrated, technology-enabled ecosystem built specifically for grassroots entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4">
                🏪
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Digital Storefronts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Frictionless business profiles showcasing creator bios, artisan history, and catalog items without needing web design skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-4">
                ✨
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">AI Brand Studio</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Smart multilingual AI generator producing professional descriptions, SEO tags, and captions in Marathi, Hindi, and English.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-4">
                🛡️
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Quality & Trust Badge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platform verification reviewing artisan identity, craft origin, and authenticity before awarding the "RuralRise Verified" seal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl mb-4">
                📦
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Direct Enquiries & Orders</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct buyer-to-artisan enquiry flow with status tracking from confirmation to transit and delivery.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Regional Hubs (Seeded Data Spotlight) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-600 mb-1">Featured Regions</h2>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Explore Verified Rural Hubs</h3>
            </div>
            <Link
              href="/marketplace/storefronts"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View all storefronts</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHubs.map((hub) => (
              <div
                key={hub.district}
                className="group rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
              >
                <div className={`h-36 bg-gradient-to-br ${hub.gradient} p-6 flex flex-col justify-between text-white relative`}>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                      {hub.badge}
                    </span>
                    <span className="text-xs font-semibold text-white/90">📍 {hub.district}</span>
                  </div>
                  <div className="z-10">
                    <h4 className="text-xl font-bold text-white leading-tight">{hub.seller}</h4>
                    <span className="text-xs text-slate-300">{hub.category}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {hub.specialty}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-700">✓ RuralRise Verified</span>
                    <Link
                      href={`/marketplace/storefronts/${hub.slug}`}
                      className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Visit Store</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-600 mb-2">End-to-End Workflow</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How RuralRise Works</h3>
            <p className="mt-3 text-sm text-slate-600">From village workshop to consumer doorstep in four simple stages.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-white border border-slate-200/70 relative">
                <span className="text-3xl font-black text-slate-200 block mb-3 font-mono">{item.step}</span>
                <h4 className="font-bold text-slate-900 text-base mb-2">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Action Section */}
      <section className="py-20 bg-emerald-700 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Support Authentic Rural Enterprise
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto mb-8 leading-relaxed">
            Every purchase and enquiry directly uplifts traditional families and weavers in Maharashtra. Discover genuine craft or create your seller account today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/marketplace"
              className="px-8 py-3.5 bg-white text-emerald-800 text-xs font-bold rounded-xl shadow-md hover:bg-slate-50 transition-all"
            >
              Browse Catalog
            </Link>
            <Link
              href="/register"
              className="px-8 py-3.5 bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-500/50 text-xs font-bold rounded-xl transition-all"
            >
              Register as Artisan
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
