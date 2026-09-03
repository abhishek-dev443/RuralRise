'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';

function CategoryArtFallback({ category, title, location }) {
  if (category === 'Handloom/Textiles') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative z-10 w-20 h-20 rounded-3xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <span className="relative z-10 text-xs font-bold tracking-widest text-indigo-300 uppercase">Heritage Handloom Weave</span>
        <span className="relative z-10 text-sm text-indigo-200/80 mt-1 font-medium">{location ? `Woven in ${location}, Maharashtra` : 'Traditional Loom'}</span>
        <span className="relative z-10 text-lg font-bold text-white mt-2 max-w-sm">{title}</span>
      </div>
    );
  }

  if (category === 'Organic/Food Products' || category === 'Agro Products') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative z-10 w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <span className="relative z-10 text-xs font-bold tracking-widest text-emerald-300 uppercase">Pure Organic Harvest</span>
        <span className="relative z-10 text-sm text-emerald-200/80 mt-1 font-medium">{location ? `Cultivated in ${location}, Maharashtra` : 'Farm Sourced'}</span>
        <span className="relative z-10 text-lg font-bold text-white mt-2 max-w-sm">{title}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-950 via-stone-900 to-orange-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="relative z-10 w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner mb-4">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <span className="relative z-10 text-xs font-bold tracking-widest text-amber-300 uppercase">Authentic Artisan Craft</span>
      <span className="relative z-10 text-sm text-amber-200/80 mt-1 font-medium">{location ? `Crafted in ${location}, Maharashtra` : 'Master Craftsman'}</span>
      <span className="relative z-10 text-lg font-bold text-white mt-2 max-w-sm">{title}</span>
    </div>
  );
}

function isGenericPlaceholder(url) {
  if (!url) return true;
  return url.includes('placehold.co') || url.includes('placeholder');
}

export default function ProductDetail({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);

  // Enquiry modal state
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Product not found');
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: [{ productId: product.id, quantity, price: product.price }],
          totalAmount: product.price * quantity,
          deliveryAddress,
          logisticsNotes: 'New enquiry from marketplace.'
        })
      });

      if (!res.ok) throw new Error('Failed to submit enquiry');
      
      alert('Enquiry submitted successfully! The entrepreneur has been notified.');
      setShowEnquiryModal(false);
      setQuantity(1);
      setDeliveryAddress('');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
            <span className="text-xs font-semibold text-slate-500">Loading product details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 w-full text-center">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 font-bold text-lg">!</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">{error || 'This product is currently unavailable or has been removed.'}</p>
            <Link href="/marketplace" className="btn-primary text-xs">
              Back to Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const rawUrl = product.imageUrls?.[0];
  const showRealPhoto = rawUrl && !isGenericPlaceholder(rawUrl) && !imgError;
  const isVerified = product.entrepreneur?.verificationStatus === 'APPROVED';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        
        {/* Back Link Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/marketplace"
            className="text-xs font-bold text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span>Back to Marketplace</span>
          </Link>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
            
            {/* Left 6 Cols: Image Gallery Area */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                {showRealPhoto ? (
                  <img
                    src={rawUrl}
                    alt={product.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CategoryArtFallback category={product.category} title={product.title} location={product.location} />
                )}

                {/* Stock badge overlay */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${
                    product.stock > 0 
                      ? 'bg-emerald-600/95 text-white' 
                      : 'bg-rose-600/95 text-white'
                  }`}>
                    {product.stock > 0 ? `✓ ${product.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                <span className="text-xl">🛡️</span>
                <div className="text-xs">
                  <strong className="text-slate-800 block">RuralRise Authenticity Guarantee</strong>
                  <span className="text-slate-500">Every item is handcrafted by verified artisans in Maharashtra.</span>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Product Details */}
            <div className="lg:col-span-6 flex flex-col">
              
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  {product.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  📍 {product.location}, Maharashtra
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mt-1 mb-3">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 font-medium">(Direct artisan pricing)</span>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Description</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {product.qualityInfo && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <h5 className="text-xs font-bold text-emerald-900 mb-1">Quality Assurance</h5>
                    <p className="text-xs text-emerald-800 leading-relaxed">{product.qualityInfo}</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-6 border-t border-slate-100">
                <button
                  disabled={product.stock === 0}
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      alert('Please sign in to place an enquiry with the artisan.');
                      window.location.href = '/login';
                    } else {
                      setShowEnquiryModal(true);
                    }
                  }}
                  className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Enquire Now / Request Order</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Creator / Storefront Summary Card */}
        {product.entrepreneur && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h3 className="text-xl font-bold text-slate-900">{product.entrepreneur.storeName}</h3>
                  {isVerified && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ RuralRise Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Owned & operated by <strong>{product.entrepreneur.ownerName}</strong> in {product.entrepreneur.district}, Maharashtra
                </p>
              </div>

              <Link
                href={`/marketplace/storefronts/${product.entrepreneur.slug}`}
                className="px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Visit Artisan Storefront →
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Place Enquiry</h2>
            <p className="text-xs text-slate-500 mb-5">
              Contacting <strong>{product.entrepreneur?.storeName}</strong> regarding <strong>{product.title}</strong>.
            </p>
            
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Quantity Needed</label>
                <input 
                  type="number" 
                  min="1" 
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Delivery Address / Destination</label>
                <textarea 
                  rows="3"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  required 
                  placeholder="Street, City, Pincode..."
                ></textarea>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Estimated Total:</span>
                <span className="font-bold text-slate-900 text-sm">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button" 
                  onClick={() => setShowEnquiryModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  {submitting ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
