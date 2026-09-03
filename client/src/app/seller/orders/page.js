'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch(`${API_URL}/api/orders/seller`, {
        headers: { 'Authorization': `Bearer ${token}` }
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

  useEffect(() => {
    fetchOrders();
  }, [router]);

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
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

  if (loading) return <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">Loading orders & enquiries...</div>;
  if (error) return <div className="p-4 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Enquiries & Orders</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage buyer inquiries and update last-mile logistics fulfillment stages.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3 text-2xl">
            📋
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No customer enquiries yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When buyers enquire or place orders for your products on the marketplace, they will appear here for fulfillment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
              
              <div className="bg-slate-50/70 px-6 py-3.5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-4 items-center">
                  <span className="text-xs font-bold text-slate-900 font-mono">#{order.id.slice(0, 8)}</span>
                  <span className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs text-slate-600 font-medium">Buyer: <strong>{order.user?.name || order.user?.email || 'Customer'}</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-slate-900">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {order.orderItems?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div>
                        <strong className="text-slate-900">{item.product?.title}</strong>
                        <span className="text-slate-500 ml-2">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-slate-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {(order.deliveryAddress || order.logisticsNotes) && (
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 mb-4">
                    {order.deliveryAddress && (
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Shipping Destination:</strong>
                        <span>{order.deliveryAddress}</span>
                      </div>
                    )}
                    {order.logisticsNotes && (
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Buyer Notes:</strong>
                        <span>{order.logisticsNotes}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Status Update Action Dropdown */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Update Fulfillment Stage:</span>
                  <select
                    disabled={updating === order.id}
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PICKUP_SCHEDULED">PICKUP SCHEDULED</option>
                    <option value="IN_TRANSIT">IN TRANSIT</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
