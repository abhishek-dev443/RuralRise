'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SellerDashboard() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch profile
        const profRes = await fetch('http://localhost:5000/api/entrepreneurs/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (profRes.ok) {
          const profData = await profRes.json();
          setProfile(profData);
          
          // Fetch stats (Mock for now, normally would query backend for seller specific stats)
          setStats({ products: profData.products?.length || 0, orders: 0 });
        } else if (profRes.status === 404) {
          // No profile yet
          router.push('/marketplace/register-store');
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [router]);

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (!profile) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {profile.ownerName}!</p>
        </div>
        <div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            profile.verificationStatus === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
            profile.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            Status: {profile.verificationStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">My Products</h3>
          <p className="text-4xl font-bold text-emerald-600 mt-2">{stats.products}</p>
        </Card>
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Enquiries</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stats.orders}</p>
        </Card>
      </div>
      
      {/* AI Brand Studio Entry Point */}
      <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">✨ AI Brand Studio</h2>
            <p className="text-indigo-700 max-w-2xl">Use our AI assistant to write compelling product descriptions, generate SEO tags, and translate your content to Hindi or Marathi automatically.</p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors">
            Open Studio
          </button>
        </div>
      </Card>
    </div>
  );
}
