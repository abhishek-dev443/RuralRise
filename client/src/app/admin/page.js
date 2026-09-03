'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch stats');
        
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">
        Loading governance analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
        Error loading admin statistics: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Platform Governance Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time statistics across users, verified rural creators, catalog items, and verification queues.
          </p>
        </div>

        <Link
          href="/admin/verifications"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>Review Verifications</span>
          {stats?.pendingVerifications > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-indigo-700 text-[10px] font-black flex items-center justify-center">
              {stats.pendingVerifications}
            </span>
          )}
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Registered Users
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-slate-900">{stats?.totalUsers || 0}</span>
            <span className="text-xs text-slate-400 font-medium">Platform</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Rural Entrepreneurs
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-emerald-600">{stats?.totalEntrepreneurs || 0}</span>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Catalog Items
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-indigo-600">{stats?.totalProducts || 0}</span>
            <span className="text-xs text-slate-400 font-medium">Products</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Pending Verifications
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-black text-amber-500">{stats?.pendingVerifications || 0}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stats?.pendingVerifications > 0 ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
              {stats?.pendingVerifications > 0 ? 'Needs Action' : 'All Clear'}
            </span>
          </div>
        </div>

      </div>

      {/* Platform Governance Standards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">RuralRise Verification Guidelines</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl mb-6">
          "RuralRise Verified" represents an independent platform assurance confirming that an artisan or farmer has been physically or community-validated in Maharashtra. This is distinct from government licensing or statutory certification.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-1">1. Creator Identity</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Validate village residence, district of operation, and direct producer authenticity.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-1">2. Craft Origin</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Verify that goods are genuinely handloom woven, organic farmed, or artisan crafted.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-1">3. Fair Pricing</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ensure margins directly benefit rural families and community clusters.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
