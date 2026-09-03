'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const res = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Order progression stages
  const STAGES = ['PENDING', 'CONFIRMED', 'PICKUP_SCHEDULED', 'IN_TRANSIT', 'DELIVERED'];

  const getStageIndex = (status) => {
    if (status === 'CANCELLED') return -1;
    const idx = STAGES.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'IN_TRANSIT':
      case 'PICKUP_SCHEDULED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CONFIRMED':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Enquiries & Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track direct communications and fulfillment updates with Maharashtra rural creators.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">
            Loading your orders...
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center">
            <h3 className="text-base font-bold text-slate-900 mb-1">Failed to load orders</h3>
            <p className="text-xs text-slate-500 mb-4">{error}</p>
            <Link href="/login" className="btn-primary text-xs">
              Sign in Again
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3 text-2xl">
              📦
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">No enquiries or orders yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              When you enquire about a craft or farm item on the marketplace, your order status will appear here.
            </p>
            <Link href="/marketplace" className="btn-primary text-xs">
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStage = getStageIndex(order.status);
              const isCancelled = order.status === 'CANCELLED';

              return (
                <div
                  key={order.id}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-slate-50/70 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-6 items-center">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Order ID</span>
                        <span className="text-xs font-bold text-slate-900 font-mono">#{order.id.slice(0, 8)}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</span>
                        <span className="text-xs font-semibold text-slate-700">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
                        <span className="text-sm font-black text-slate-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Visual Status Progress Tracker */}
                  {!isCancelled && (
                    <div className="px-6 pt-6 pb-2 border-b border-slate-50">
                      <div className="relative flex justify-between items-center max-w-md mx-auto">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
                        <div 
                          className="absolute top-1/2 left-0 h-0.5 bg-emerald-600 -translate-y-1/2 z-0 transition-all duration-500"
                          style={{ width: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
                        ></div>

                        {STAGES.map((st, idx) => {
                          const isDone = idx <= currentStage;
                          return (
                            <div key={st} className="relative z-10 flex flex-col items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                                isDone 
                                  ? 'bg-emerald-600 text-white shadow-xs' 
                                  : 'bg-white border-2 border-slate-300 text-slate-400'
                              }`}>
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[9px] font-bold uppercase mt-1 tracking-wider whitespace-nowrap ${
                                isDone ? 'text-emerald-700' : 'text-slate-400'
                              }`}>
                                {st === 'PICKUP_SCHEDULED' ? 'Pickup' : st === 'IN_TRANSIT' ? 'Transit' : st}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="p-6 space-y-4">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200/60 flex items-center justify-center">
                          {item.product?.imageUrls?.[0] && !item.product.imageUrls[0].includes('placehold.co') ? (
                            <img src={item.product.imageUrls[0]} alt={item.product.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-slate-400">Craft</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <Link
                            href={`/marketplace/product/${item.productId}`}
                            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                          >
                            {item.product?.title || 'Rural Artisan Product'}
                          </Link>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Delivery & Logistics notes */}
                    {(order.deliveryAddress || order.logisticsNotes) && (
                      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {order.deliveryAddress && (
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="font-bold text-slate-700 block mb-0.5">Delivery Address</span>
                            <span className="text-slate-600">{order.deliveryAddress}</span>
                          </div>
                        )}
                        {order.logisticsNotes && (
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="font-bold text-slate-700 block mb-0.5">Logistics & Notes</span>
                            <span className="text-slate-600">{order.logisticsNotes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
