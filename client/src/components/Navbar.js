'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, changeLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authData, setAuthData] = useState({ token: null, role: null });

  useEffect(() => {
    // Check authentication in client
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setAuthData({ token, role });
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthData({ token: null, role: null });
    router.push('/login');
  };

  const navLinks = [
    { name: 'Discover', href: '/marketplace' },
    { name: 'Storefronts', href: '/marketplace/storefronts' },
    { name: 'About', href: '/about' },
  ];

  if (authData.token) {
    navLinks.push({ name: 'My Orders', href: '/orders' });
  }

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                Rural<span className="text-emerald-600">Rise</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 leading-tight">
                Maharashtra
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && (link.href === '/marketplace' ? pathname === '/marketplace' || pathname.startsWith('/marketplace/product') : true));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Language Switcher & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${language === 'en' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${language === 'hi' ? 'bg-white text-emerald-800 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => changeLanguage('mr')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${language === 'mr' ? 'bg-white text-amber-800 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                मराठी
              </button>
            </div>

            {/* Auth Actions */}
            {authData.token ? (
              <div className="flex items-center gap-2">
                {authData.role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Admin Portal
                  </Link>
                ) : authData.role === 'SELLER' ? (
                  <Link
                    href="/seller"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Seller Portal
                  </Link>
                ) : null}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs shadow-emerald-200 transition-all"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Language Selection in Mobile */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language</span>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 rounded ${language === 'en' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('hi')}
                  className={`px-2 py-1 rounded ${language === 'hi' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-600'}`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => changeLanguage('mr')}
                  className={`px-2 py-1 rounded ${language === 'mr' ? 'bg-amber-700 text-white font-bold' : 'text-slate-600'}`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Auth in Mobile */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {authData.token ? (
                <>
                  {authData.role === 'ADMIN' ? (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
                    >
                      Admin Portal
                    </Link>
                  ) : authData.role === 'SELLER' ? (
                    <Link
                      href="/seller"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                    >
                      Seller Portal
                    </Link>
                  ) : null}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center py-2 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
