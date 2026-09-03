'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'ADMIN') {
      router.push('/login');
    } else {
      setIsAdmin(true);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  const navItems = [
    { name: 'Platform Overview', path: '/admin', icon: '📊' },
    { name: 'Verification Requests', path: '/admin/verifications', icon: '🛡️' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50 text-xs font-semibold text-slate-500">
        Authenticating administrator...
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 text-white shrink-0 flex flex-col border-r border-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-900">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-base shadow-sm">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white tracking-tight leading-tight">
                RuralRise <span className="text-indigo-400 text-xs">Admin</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Governance Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Nav list */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-900 flex flex-col gap-2">
          <Link
            href="/marketplace"
            className="text-center py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
          >
            View Live Marketplace ↗
          </Link>
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
