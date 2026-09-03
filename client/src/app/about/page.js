'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
        
        {/* Mission Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
            <span>🌾 Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            From Local Roots to <span className="text-emerald-600">Wider Reach</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            RuralRise is a technology initiative designed to bridge the digital and commercial divide for rural innovators across Maharashtra. We empower grassroots artisans, master handloom weavers, and organic producers to showcase their heritage, build credible brands, and access nationwide markets directly.
          </p>
        </div>

        {/* The Three Pillars of Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl mb-4">
              🏪
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Digital Enablement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminating the technical barrier to e-commerce. Rural entrepreneurs establish personalized storefronts with simple regional workflows and multilingual support.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-2xl mb-4">
              ✨
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">AI Brand Studio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipping traditional craftsmen with generative AI tools to compose professional product titles, compelling heritage descriptions, and translations in Marathi, Hindi, and English.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Verified Authenticity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A transparent verification standard that distinguishes genuine village artisan work and farm-fresh harvest from mass-manufactured commercial imitations.
            </p>
          </div>

        </div>

        {/* Regional Focus Spotlight */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Rooted in Maharashtra’s Craft Heritage
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              From the centuries-old leather workshops of Kolhapur, to the fertile vineyards and spice gardens of Nashik, and the renowned cotton looms of Vidarbha in Nagpur — RuralRise celebrates the unique geographical and cultural legacy of rural Maharashtra.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">Kolhapur</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">Nashik</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">Nagpur</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">Pune</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">Ratnagiri</span>
            </div>
          </div>
        </div>

        {/* Ready to Join Callout */}
        <div className="text-center py-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Want to experience RuralRise?</h3>
          <p className="text-xs text-slate-500 mb-6">Explore our curated marketplace or register your rural business today.</p>
          <div className="flex justify-center gap-3">
            <Link href="/marketplace" className="btn-primary text-xs">
              Explore Products
            </Link>
            <Link href="/register" className="btn-secondary text-xs">
              Join as Artisan
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
