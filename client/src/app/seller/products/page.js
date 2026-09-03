'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Handicrafts');
  const [qualityInfo, setQualityInfo] = useState('');
  const [imageUrls, setImageUrls] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const profRes = await fetch(`${API_URL}/api/entrepreneurs/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!profRes.ok) throw new Error('Failed to fetch profile. Make sure you created a storefront first.');
      const profile = await profRes.json();
      setProducts(profile.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [router]);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditProduct(product);
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
      setQualityInfo(product.qualityInfo || '');
      setImageUrls(product.imageUrls ? product.imageUrls.join(', ') : '');
    } else {
      setEditProduct(null);
      setTitle('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('Handicrafts');
      setQualityInfo('');
      setImageUrls('');
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        qualityInfo,
        imageUrls: imageUrls.split(',').map(s => s.trim()).filter(Boolean)
      };

      const url = editProduct ? `${API_URL}/api/products/${editProduct.id}` : `${API_URL}/api/products`;
      const method = editProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save product');

      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this product from your storefront?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="py-16 text-center text-xs font-semibold text-slate-500 animate-pulse">Loading products...</div>;
  if (error) return <div className="p-4 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Catalog</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage the rural crafts and farm goods listed on your storefront.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>+</span>
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-xs">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No products listed yet. Click "+ Add New Product" to list your first craft!
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center text-white text-[10px] font-bold">
                          {p.imageUrls?.[0] && !p.imageUrls[0].includes('placehold.co') ? (
                            <img src={p.imageUrls[0]} alt={p.title} className="h-full w-full object-cover" />
                          ) : (
                            <span>Craft</span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{p.title}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">{p.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-black text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(p)} 
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Product Title</label>
                <input 
                  type="text" 
                  required 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Handcrafted Kolhapuri Leather Chappal"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                <textarea 
                  required 
                  rows="3" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe the materials, origin, and craftsmanship..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    min="0" 
                    step="0.01" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Stock Units</label>
                  <input 
                    type="number" 
                    required 
                    min="0" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                  <select 
                    required 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Organic/Food Products">Organic/Food Products</option>
                    <option value="Handloom/Textiles">Handloom/Textiles</option>
                    <option value="Agro Products">Agro Products</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Quality & Authenticity Information</label>
                <input 
                  type="text" 
                  value={qualityInfo} 
                  onChange={(e) => setQualityInfo(e.target.value)} 
                  placeholder="e.g. 100% genuine vegetable-tanned leather certified"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Image URLs (comma separated)</label>
                <input 
                  type="text" 
                  value={imageUrls} 
                  onChange={(e) => setImageUrls(e.target.value)} 
                  placeholder="https://example.com/image1.jpg, https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  {editProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
