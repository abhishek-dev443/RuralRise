'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function StorefrontsDiscovery() {
  const [storefronts, setStorefronts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const CATEGORIES = [
    'All Categories',
    'Handicrafts',
    'Organic/Food Products',
    'Handloom/Textiles',
    'Agro Products',
  ];

  const DISTRICTS = [
    'All Districts',
    'Kolhapur',
    'Nagpur',
    'Nashik',
    'Pune',
    'Satara',
    'Ratnagiri',
  ];

  const fetchStorefronts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category && category !== 'All Categories') queryParams.append('category', category);
      if (district && district !== 'All Districts') queryParams.append('district', district);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/entrepreneurs?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch storefronts');
      
      let data = await res.json();
      
      if (verifiedOnly) {
        data = data.filter(s => s.verificationStatus === 'APPROVED');
      }

      if (sortBy === 'name-asc') {
        data.sort((a, b) => a.storeName.localeCompare(b.storeName));
      } else if (sortBy === 'products-desc') {
        data.sort((a, b) => (b.products?.length || 0) - (a.products?.length || 0));
      }

      setStorefronts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorefronts();
  }, [category, district, verifiedOnly, sortBy]); 

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStorefronts();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setDistrict('');
    setVerifiedOnly(false);
    setSortBy('newest');
  };

  // Helper for dynamic gradient banners
  const getBannerGradient = (category) => {
    switch (category) {
      case 'Handloom/Textiles':
        return 'from-indigo-950 via-slate-900 to-purple-950';
      case 'Organic/Food Products':
        return 'from-emerald-950 via-teal-950 to-slate-900';
      case 'Handicrafts':
        return 'from-amber-950 via-stone-900 to-orange-950';
      default:
        return 'from-slate-900 via-emerald-950 to-slate-950';
    }
  };

  const hasActiveFilters = search || category || district || verifiedOnly;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Universal Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold mb-4 backdrop-blur-sm">
            <span>🏛️ Maharashtra Creator Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Discover Rural <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Entrepreneurs</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Meet the authentic artisans, organic farmers, and master weavers behind Maharashtra’s grassroots brands.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 max-w-xl mx-auto flex gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by creator name, business, or craft..."
              className="flex-1 px-4 py-2.5 bg-white/95 text-slate-900 rounded-xl placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main Directory Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="font-bold text-slate-900 text-base">Filters</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d === 'All Districts' ? '' : d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Verified Only */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-bold text-slate-700">Verified Creators Only</span>
              </label>
            </div>
          </aside>

          {/* Storefronts Cards Grid */}
          <main className="flex-1 w-full">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-xs font-bold text-slate-700">
                Found <strong className="text-emerald-700 text-sm">{storefronts.length}</strong> rural entrepreneurs
              </span>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <label htmlFor="sort" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                  Sort:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Grid State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs animate-pulse h-64">
                    <div className="h-24 bg-slate-200 rounded-xl mb-4"></div>
                    <div className="h-5 bg-slate-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl border border-rose-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Error Loading Storefronts</h3>
                <p className="text-xs text-slate-500 mb-5">{error}</p>
                <button
                  onClick={fetchStorefronts}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : storefronts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                  🏪
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Entrepreneurs Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
                  Try broadening your search or clearing district/category filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storefronts.map((store) => (
                  <div
                    key={store.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300/80 transition-all duration-300 flex flex-col"
                  >
                    {/* Storefront Header Banner */}
                    <div className={`h-28 bg-gradient-to-r ${getBannerGradient(store.category || store.businessCategory)} p-4 relative flex items-start justify-between text-white`}>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md border border-white/10">
                        {store.category || store.businessCategory}
                      </span>
                      
                      {store.verificationStatus === 'APPROVED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                          ✓ Verified
                        </span>
                      )}

                      {/* Overlapping Avatar */}
                      <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-slate-100 flex items-center justify-center">
                        <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-black text-xl">
                          {store.storeName?.charAt(0) || 'R'}
                        </div>
                      </div>
                    </div>

                    {/* Storefront Body Content */}
                    <div className="pt-8 p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {store.storeName}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            By <strong className="text-slate-700">{store.ownerName}</strong>
                          </p>
                        </div>
                        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                          📍 {store.district}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mt-2.5 mb-6 line-clamp-2">
                        {store.description || 'Authentic rural artisan registered on the RuralRise marketplace.'}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {store.products?.length || 0} Products Catalogued
                        </span>

                        <Link
                          href={`/marketplace/storefronts/${store.slug}`}
                          className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                        >
                          <span>Visit Storefront</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
