'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function SellerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'SELLER') {
      router.push('/login');
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/entrepreneurs/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setProfile(data);
      })
      .catch(() => {});
  }, [router]);

  const navItems = [
    { name: 'Dashboard Overview', path: '/seller', icon: '📊' },
    { name: 'My Products', path: '/seller/products', icon: '📦' },
    { name: 'Enquiries & Orders', path: '/seller/orders', icon: '🛍️' },
    { name: 'AI Brand Studio', path: '/seller/studio', icon: '✨' },
    { name: 'Storefront Settings', path: '/seller/storefront', icon: '⚙️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col border-r border-slate-800">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-base shadow-sm">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white tracking-tight leading-tight">
                RuralRise <span className="text-emerald-400 text-xs font-semibold">Portal</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Seller Studio
              </span>
            </div>
          </Link>

          {profile && (
            <div className="mt-4 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div className="truncate mr-2">
                <span className="text-xs font-bold text-slate-200 block truncate">{profile.storeName}</span>
                <span className="text-[10px] text-slate-400 block truncate">{profile.district}, MH</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                profile.verificationStatus === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {profile.verificationStatus === 'APPROVED' ? 'Verified' : 'Pending'}
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 flex flex-col gap-2">
          {profile?.slug && (
            <Link
              href={`/marketplace/storefronts/${profile.slug}`}
              target="_blank"
              className="text-center py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl transition-colors"
            >
              Preview Live Store ↗
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>

      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {children}
      </main>

    </div>
  );
}
