'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SellerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const profRes = await fetch(`${API_URL}/api/entrepreneurs/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (profRes.ok) {
          const profData = await profRes.json();
          setProfile(profData);
        }

        // Fetch seller orders
        const ordersRes = await fetch(`${API_URL}/api/orders/seller`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [router]);

  if (loading) {
    return (
      <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">
        Loading seller workspace...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Create Your Storefront</h2>
        <p className="text-xs text-slate-500 mb-6">You haven't set up your public artisan profile yet.</p>
        <Link href="/seller/storefront" className="btn-primary text-xs">
          Set Up Storefront Now
        </Link>
      </div>
    );
  }

  const isVerified = profile.verificationStatus === 'APPROVED';

  return (
    <div className="space-y-8">
      
      {/* Top Banner Greeting & Verification */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome back, {profile.ownerName}!
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Managing <strong>{profile.storeName}</strong> • {profile.district}, Maharashtra
          </p>
        </div>

        <div>
          {isVerified ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-xs">
              <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>RuralRise Verified</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <span>⏳ Verification Pending Review</span>
            </div>
          )}
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Catalogued Products
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">{profile.products?.length || 0}</span>
            <Link href="/seller/products" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              Manage →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Enquiries & Orders
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">{orders.length}</span>
            <Link href="/seller/orders" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              View Orders →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Regional Focus
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 truncate">{profile.district}</span>
            <span className="text-xs text-slate-400 font-medium">Maharashtra</span>
          </div>
        </div>

      </div>

      {/* AI Brand Studio Callout Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 border border-indigo-900/40 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold mb-3 border border-indigo-400/30">
              <span>✨ Smart Assistant</span>
            </div>
            <h2 className="text-xl font-black text-white mb-2">
              Launch AI Brand Studio
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generate attractive product descriptions, SEO tags, and social media captions in Marathi, Hindi, or English to help your crafts stand out.
            </p>
          </div>

          <Link
            href="/seller/studio"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors whitespace-nowrap"
          >
            Open Brand Studio →
          </Link>
        </div>
      </div>

      {/* Quick Action Shortcuts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <Link
          href="/seller/products"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            ➕
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Add New Product</h4>
            <p className="text-[11px] text-slate-500">List crafts or farm goods</p>
          </div>
        </Link>

        <Link
          href="/seller/orders"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            📋
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Manage Enquiries</h4>
            <p className="text-[11px] text-slate-500">Update status & delivery</p>
          </div>
        </Link>

        <Link
          href="/seller/storefront"
          className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            🎨
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Edit Store Profile</h4>
            <p className="text-[11px] text-slate-500">Update story and photos</p>
          </div>
        </Link>

      </div>

    </div>
  );
}
