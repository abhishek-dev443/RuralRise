import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-base shadow-sm">
                R
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Rural<span className="text-emerald-500">Rise</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Connecting rural artisans, weavers, and organic producers across Maharashtra with conscious consumers nationwide. Empowering grassroots entrepreneurship with AI brand tools and trusted verification.
            </p>
            <div className="text-[11px] text-emerald-400/90 font-medium">
              Theme: "From Local Roots to Wider Reach"
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/marketplace" className="hover:text-emerald-400 transition-colors">
                  Discover Products
                </Link>
              </li>
              <li>
                <Link href="/marketplace/storefronts" className="hover:text-emerald-400 transition-colors">
                  Artisan Storefronts
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Our Mission & About
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-emerald-400 transition-colors">
                  Track Enquiries & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Maharashtra Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Artisan Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-500">📍</span> Kolhapur • Leather & Metalcraft
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-500">📍</span> Nashik • Organic Spices & Grapes
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-500">📍</span> Nagpur • Vidarbha Handloom Weaves
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-500">📍</span> Ratnagiri • Agro & Bamboo Crafts
              </li>
            </ul>
          </div>

          {/* Portals & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Entrepreneurs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  Open a Storefront →
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Seller Dashboard Login
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Admin Verification Portal
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-snug text-slate-400">
                <span className="text-emerald-400 font-bold block mb-0.5">🛡️ RuralRise Verified</span>
                Our platform verification ensures authentic creator origins. Fictional demo for educational showcase.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RuralRise Platform. Built for College Final-Year Competition Demo.</p>
          <div className="flex gap-4">
            <span>English / हिंदी / मराठी</span>
            <span>•</span>
            <span>Maharashtra, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
