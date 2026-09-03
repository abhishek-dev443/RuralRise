'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminVerifications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchVerifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/admin/verifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch verification requests');
      
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const handleUpdate = async (id, status) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/admin/verifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      setRequests(requests.filter(req => req.id !== id));
      alert(`Storefront successfully marked as ${status.toLowerCase()}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">
        Loading verification queue...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Artisan Verification Queue
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review business credentials and assign the "RuralRise Verified" seal of authenticity.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
            ✓
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Queue is Clear</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All submitted rural entrepreneur storefronts have been evaluated.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900">{req.storeName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Pending Review
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {req.category || req.businessCategory}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <strong className="text-slate-800">Owner:</strong> {req.ownerName} ({req.user?.email || 'N/A'})
                    </div>
                    <div>
                      <strong className="text-slate-800">Location:</strong> {req.village ? req.village + ', ' : ''}{req.district}, Maharashtra
                    </div>
                  </div>

                  {req.description && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed max-w-2xl">
                      <strong className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Store Story / Heritage</strong>
                      {req.description}
                    </div>
                  )}

                  <Link
                    href={`/marketplace/storefronts/${req.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-1"
                  >
                    <span>View Public Storefront Preview</span>
                    <span>↗</span>
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0 w-full md:w-auto self-end md:self-start pt-2 md:pt-0">
                  <button
                    onClick={() => handleUpdate(req.id, 'REJECTED')}
                    disabled={updating === req.id}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs rounded-xl transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleUpdate(req.id, 'APPROVED')}
                    disabled={updating === req.id}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50"
                  >
                    {updating === req.id ? 'Updating...' : 'Approve & Verify'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
