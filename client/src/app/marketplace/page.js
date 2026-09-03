'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Category fallback artwork component when real image is unavailable or a generic placeholder
function CategoryArtFallback({ category, title, location }) {
  if (category === 'Handloom/Textiles') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner mb-2.5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <span className="relative z-10 text-[10px] font-bold tracking-widest text-indigo-300 uppercase">Heritage Handloom</span>
        <span className="relative z-10 text-xs text-indigo-200/80 mt-0.5 font-medium">{location ? `Woven in ${location}` : 'Traditional Weave'}</span>
        <span className="relative z-10 text-sm font-semibold text-white mt-1.5 line-clamp-1 max-w-[210px] drop-shadow-sm">{title}</span>
      </div>
    );
  }

  if (category === 'Organic/Food Products' || category === 'Agro Products') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner mb-2.5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <span className="relative z-10 text-[10px] font-bold tracking-widest text-emerald-300 uppercase">Pure Organic Harvest</span>
        <span className="relative z-10 text-xs text-emerald-200/80 mt-0.5 font-medium">{location ? `Grown in ${location}` : 'Farm Direct'}</span>
        <span className="relative z-10 text-sm font-semibold text-white mt-1.5 line-clamp-1 max-w-[210px] drop-shadow-sm">{title}</span>
      </div>
    );
  }

  // Handicrafts & General Default
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-950 via-stone-900 to-orange-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner mb-2.5">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <span className="relative z-10 text-[10px] font-bold tracking-widest text-amber-300 uppercase">Artisan Handcrafted</span>
      <span className="relative z-10 text-xs text-amber-200/80 mt-0.5 font-medium">{location ? `Made in ${location}` : 'Master Artisan'}</span>
      <span className="relative z-10 text-sm font-semibold text-white mt-1.5 line-clamp-1 max-w-[210px] drop-shadow-sm">{title}</span>
    </div>
  );
}

function isGenericPlaceholder(url) {
  if (!url) return true;
  return url.includes('placehold.co') || url.includes('placeholder');
}

// Single Product Card Component
function ProductCard({ product }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const rawUrl = product.imageUrls?.[0];
  const showRealPhoto = rawUrl && !isGenericPlaceholder(rawUrl) && !imgError;
  const isVerified = product.entrepreneur?.verificationStatus === 'APPROVED';

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'Handloom/Textiles':
        return 'bg-indigo-50/95 text-indigo-700 border-indigo-200/80';
      case 'Organic/Food Products':
        return 'bg-emerald-50/95 text-emerald-700 border-emerald-200/80';
      case 'Handicrafts':
        return 'bg-amber-50/95 text-amber-800 border-amber-200/80';
      default:
        return 'bg-teal-50/95 text-teal-700 border-teal-200/80';
    }
  };

  return (
    <div 
      onClick={() => router.push(`/marketplace/product/${product.id}`)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300/80 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        {showRealPhoto ? (
          <img
            src={rawUrl}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <CategoryArtFallback category={product.category} title={product.title} location={product.location} />
        )}

        {/* Subtle overlay vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryBadge(product.category)}`}>
            {product.category}
          </span>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-xs flex items-center gap-1 ${
            product.stock > 0 
              ? 'bg-emerald-600/90 text-white border border-emerald-400/40' 
              : 'bg-rose-600/90 text-white border border-rose-400/40'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-200 animate-pulse' : 'bg-rose-200'}`}></span>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </span>
        </div>

        {/* Location Stamp at Bottom Left of Image */}
        <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow-md">
          <svg className="w-3.5 h-3.5 text-emerald-400 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{product.location}, Maharashtra</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Entrepreneur Store Link & Verification */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <Link
            href={`/marketplace/storefronts/${product.entrepreneur?.slug || ''}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors truncate max-w-[170px]"
            title={product.entrepreneur?.storeName}
          >
            By <span className="text-slate-800 hover:underline">{product.entrepreneur?.storeName}</span>
          </Link>

          {isVerified && (
            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0" 
              title="Verified by RuralRise Platform"
            >
              <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[2.75rem] mb-3">
          {product.title}
        </h3>

        {/* Price and CTA Button */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Price</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <Link
            href={`/marketplace/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-emerald-200 group-hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View Details</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const CATEGORIES = [
    { label: 'All Categories', value: '' },
    { label: 'Handicrafts', value: 'Handicrafts' },
    { label: 'Organic & Food', value: 'Organic/Food Products' },
    { label: 'Handloom & Textiles', value: 'Handloom/Textiles' },
    { label: 'Agro Products', value: 'Agro Products' },
  ];

  const DISTRICTS = [
    'All Districts',
    'Kolhapur',
    'Nagpur',
    'Nashik',
    'Pune',
    'Satara',
    'Ratnagiri',
    'Aurangabad',
    'Sindhudurg'
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);
      if (location) queryParams.append('location', location);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/products?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      
      let data = await res.json();
      
      // Verified sellers filter
      if (verifiedOnly) {
        data = data.filter(p => p.entrepreneur?.verificationStatus === 'APPROVED');
      }

      // Client-side sorting
      if (sortBy === 'price-low') {
        data.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        data.sort((a, b) => b.price - a.price);
      } else {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, location, minPrice, maxPrice, verifiedOnly, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setVerifiedOnly(false);
    setSortBy('newest');
  };

  const hasActiveFilters = search || category || location || minPrice || maxPrice || verifiedOnly;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Universal Shared Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold mb-4 backdrop-blur-sm">
            <span>✨ Authentic Maharashtra Artisans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Discover Rural <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Masterpieces</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Support local communities in Maharashtra. Handcrafted leather goods, pure sun-dried organics, and handloom weaves verified for quality and origin.
          </p>

          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-7 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl">
            <div className="relative flex-1 flex items-center">
              <svg className="w-5 h-5 text-slate-400 ml-4 absolute pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword (e.g. Chappal, Turmeric, Saree)..."
                className="w-full pl-12 pr-4 py-2.5 bg-white/95 text-slate-900 rounded-xl placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {search && (
                <button 
                  type="button" 
                  onClick={() => { setSearch(''); fetchProducts(); }}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 text-sm p-1"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Search</span>
            </button>
          </form>

          {/* Quick Category Chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Popular:</span>
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  category === c.value
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Marketplace Area */}
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
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Maharashtra District
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value === 'All Districts' ? '' : e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d === 'All Districts' ? '' : d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Price Range (₹)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Verified Sellers Filter */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-bold text-slate-700">Verified Sellers Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid & Controls */}
          <main className="flex-1 w-full">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700">
                  Showing <strong className="text-emerald-700 text-sm">{products.length}</strong> products
                </span>

                {/* Active Filter Badges */}
                {category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    Category: {category}
                    <button onClick={() => setCategory('')} className="hover:text-emerald-950 font-bold ml-1">×</button>
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    Location: {location}
                    <button onClick={() => setLocation('')} className="hover:text-emerald-950 font-bold ml-1">×</button>
                  </span>
                )}
                {verifiedOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    Verified Only
                    <button onClick={() => setVerifiedOnly(false)} className="hover:text-emerald-950 font-bold ml-1">×</button>
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
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
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Rendering */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs animate-pulse">
                    <div className="aspect-[4/3] bg-slate-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                    <div className="h-5 bg-slate-200 rounded w-4/5 mb-4"></div>
                    <div className="h-8 bg-slate-200 rounded mt-4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl border border-rose-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  !
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Unable to Load Products</h3>
                <p className="text-xs text-slate-500 mb-5">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                  📦
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Rural Products Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
                  We couldn't find any products matching your selected search or filter criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Universal Shared Footer */}
      <Footer />
    </div>
  );
}
