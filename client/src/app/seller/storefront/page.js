'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StorefrontSettings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Form State
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch(`${API_URL}/api/entrepreneurs/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setStoreName(data.storeName);
          setOwnerName(data.ownerName);
          setContactEmail(data.contactEmail);
          setContactPhone(data.contactPhone);
          setDistrict(data.district);
          setVillage(data.village || '');
          setCategory(data.category);
          setDescription(data.description);
          setCoverImageUrl(data.coverImageUrl || '');
        } else if (res.status !== 404) {
          throw new Error('Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        storeName,
        ownerName,
        contactEmail,
        contactPhone,
        district,
        village,
        category,
        description,
        coverImageUrl
      };

      const res = await fetch(`${API_URL}/api/entrepreneurs/storefront`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save storefront details');
      
      alert('Storefront updated successfully! You can now request verification or add products.');
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">Loading storefront settings...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Storefront Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Customize your public brand identity, regional heritage story, and contact options.</p>
      </div>
      
      {error && <div className="p-4 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">{error}</div>}

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Store / Business Name</label>
              <input 
                type="text" 
                required 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)} 
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Owner / Creator Name</label>
              <input 
                type="text" 
                required 
                value={ownerName} 
                onChange={(e) => setOwnerName(e.target.value)} 
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Email</label>
              <input 
                type="email" 
                required 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Phone</label>
              <input 
                type="text" 
                required 
                value={contactPhone} 
                onChange={(e) => setContactPhone(e.target.value)} 
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Maharashtra District</label>
              <input 
                type="text" 
                required 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)} 
                placeholder="e.g. Kolhapur, Nashik, Pune"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Village / Taluka</label>
              <input 
                type="text" 
                value={village} 
                onChange={(e) => setVillage(e.target.value)} 
                placeholder="e.g. Shirol, Niphad, Yeola"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Craft Category</label>
              <select 
                required 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a category</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Handloom/Textiles">Handloom/Textiles</option>
                <option value="Organic/Food Products">Organic/Food Products</option>
                <option value="Agro Products">Agro Products</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Business Heritage & Story</label>
              <textarea 
                required 
                rows="4" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Tell customers about your craftsmanship history, natural materials used, and your community roots..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Cover Image URL (Optional)</label>
              <input 
                type="url" 
                value={coverImageUrl} 
                onChange={(e) => setCoverImageUrl(e.target.value)} 
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving} 
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              {saving ? 'Saving changes...' : 'Save Storefront Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
