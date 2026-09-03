'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/admin/stats', {
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

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('admin.stats')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Users</h3>
          <p className="text-4xl font-bold text-emerald-600 mt-2">{stats?.totalUsers || 0}</p>
        </Card>
        
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Entrepreneurs</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stats?.totalEntrepreneurs || 0}</p>
        </Card>
        
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Products</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-2">{stats?.totalProducts || 0}</p>
        </Card>
        
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Verifications</h3>
          <p className="text-4xl font-bold text-orange-500 mt-2">{stats?.pendingVerifications || 0}</p>
        </Card>
      </div>
    </div>
  );
}
