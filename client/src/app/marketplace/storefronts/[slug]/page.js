'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';

export default function StorefrontDetail({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch(`${API_URL}/api/entrepreneurs/${slug}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Storefront not found');
          throw new Error('Failed to fetch storefront');
        }
        const data = await res.json();
        setStore(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
            <span className="text-xs font-semibold text-slate-500">Loading artisan storefront...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 w-full text-center">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Storefront Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">{error || 'This storefront does not exist or has been modified.'}</p>
            <Link href="/marketplace/storefronts" className="btn-primary text-xs">
              Back to Storefronts
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isVerified = store.verificationStatus === 'APPROVED';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />

      {/* Hero Cover Area */}
      <div className="w-full h-56 sm:h-72 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        {store.coverImage && (
          <img src={store.coverImage} alt="Cover" className="w-full h-full object-cover opacity-30" />
        )}
      </div>

      {/* Main Profile & Catalog Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16 flex-1 w-full">
        
        {/* Creator Identity Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* Creator Avatar Badge */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-md border border-slate-100 flex items-center justify-center shrink-0">
              {store.profileImage ? (
                <img src={store.profileImage} alt={store.storeName} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white text-3xl font-black">
                  {store.storeName?.charAt(0) || 'R'}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  {store.businessCategory || store.category}
                </span>

                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    RuralRise Verified Artisan
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {store.storeName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span>Operated by <strong>{store.ownerName}</strong></span>
                <span>•</span>
                <span>📍 {store.village ? `${store.village}, ` : ''}{store.district}, Maharashtra</span>
              </div>
            </div>

            {/* Back Button */}
            <div className="shrink-0 self-end sm:self-center">
              <Link
                href="/marketplace/storefronts"
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                ← All Storefronts
              </Link>
            </div>

          </div>

          {/* Business Heritage Story */}
          {store.description && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Artisan Heritage & Story</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line max-w-4xl">
                {store.description}
              </p>
            </div>
          )}
        </div>

        {/* Product Catalog Grid */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Craft Catalog</h2>
            <p className="text-xs text-slate-500">Authentic goods produced directly by {store.ownerName}</p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {store.products?.length || 0} Products Available
          </span>
        </div>

        {store.products && store.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {store.products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden flex items-center justify-center text-white">
                  {p.imageUrls && p.imageUrls.length > 0 && !p.imageUrls[0].includes('placehold.co') ? (
                    <img src={p.imageUrls[0]} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="p-4 text-center">
                      <div className="w-12 h-12 rounded-xl bg-white/10 mx-auto flex items-center justify-center text-xl mb-2">✨</div>
                      <span className="text-xs font-bold text-slate-200 block">{p.title}</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    {p.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2">{p.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{p.description}</p>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                    <Link
                      href={`/marketplace/product/${p.id}`}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Enquire →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <p className="text-xs text-slate-500">This entrepreneur has not listed any public products yet.</p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
