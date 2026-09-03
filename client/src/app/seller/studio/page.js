'use client';

import { useState } from 'react';

export default function AIBrandStudio() {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('description');
  const [language, setLanguage] = useState('en');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setCopied(false);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type, prompt, language })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      
      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TEMPLATES = [
    { label: 'Kolhapuri Leather Footwear', type: 'description', text: 'Handmade genuine leather Kolhapuri chappal with braided strap, vegetable tanned' },
    { label: 'Nashik Sun-Dried Raisins', type: 'description', text: 'Golden seedless Nashik raisins sun-dried naturally on vines, no artificial sulfur' },
    { label: 'Vidarbha Handloom Saree', type: 'caption', text: 'Pure cotton handwoven saree with traditional border weave from Nagpur artisans' },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Studio Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">✨</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Brand Studio</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Empowering rural entrepreneurs with professional marketing copy, SEO tags, and multi-language translations across English, Hindi, and Marathi.
        </p>
      </div>

      {/* Main Studio Two-Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Cols: Creative Input Controls */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          
          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* Generation Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Output Format
              </label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="description">E-Commerce Product Description</option>
                <option value="title">Catchy Product Title</option>
                <option value="caption">Social Media Marketing Caption</option>
                <option value="tags">SEO Keywords & Search Tags</option>
                <option value="business">Store 'About Us' Heritage Story</option>
              </select>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Target Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'हिंदी (Hindi)' },
                  { id: 'mr', label: 'मराठी (Marathi)' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLanguage(l.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      language === l.id
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description / Keywords Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Describe Your Craft / Product Roughly
                </label>
                <span className="text-[10px] text-slate-400">Simple notes work best</span>
              </div>
              <textarea 
                required
                rows="4" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. handmade bamboo basket from Ratnagiri, natural finish, durable weave for home decor..."
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Sample Prompts */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Quick Sample Ideas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TEMPLATES.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setType(t.type);
                      setPrompt(t.text);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 font-medium transition-colors"
                  >
                    + {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button 
              type="submit" 
              disabled={loading || !prompt.trim()}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Multilingual Copy...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Content</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}
          </form>

        </div>

        {/* Right 6 Cols: Result Workspace Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col min-h-[420px]">
          
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Studio Generated Output
            </span>
            {result && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ready to Copy
              </span>
            )}
          </div>

          {result ? (
            <div className="flex-1 flex flex-col justify-between">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-serif flex-1">
                {result}
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                  <span>{copied ? '✓ Copied to Clipboard!' : 'Copy Copy'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl mb-3">
                🪄
              </div>
              <h4 className="text-sm font-bold text-slate-700 mb-1">Your AI Content Workspace</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Choose an output format and provide rough craft details on the left to see your content appear here.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
