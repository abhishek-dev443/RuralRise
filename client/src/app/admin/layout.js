'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic frontend check. Real app validates with backend /api/auth/me
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'ADMIN') {
        router.push('/');
      } else {
        setIsAdmin(true);
      }
    } catch (e) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-emerald-800">{t('admin.title')}</h2>
        </div>
        <nav className="mt-6 px-4">
          <Link href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-50 hover:text-emerald-700">
            Overview
          </Link>
          <Link href="/admin/entrepreneurs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-50 hover:text-emerald-700">
            Entrepreneurs
          </Link>
          <Link href="/admin/verifications" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-50 hover:text-emerald-700">
            Verifications
          </Link>
          <Link href="/admin/products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-emerald-50 hover:text-emerald-700">
            Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
