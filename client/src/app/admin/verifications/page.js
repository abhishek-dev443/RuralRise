'use client';

import { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function AdminVerifications() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVerifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/verifications', {
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

  const handleUpdateStatus = async (id, status, badgeLevel = 'VERIFIED') => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/verifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, badgeLevel })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      // Refresh list
      fetchVerifications();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading verifications...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('admin.verifications')}</h1>
      
      {requests.length === 0 ? (
        <Card className="p-8 text-center bg-gray-50 border-dashed border-2 border-gray-200">
          <p className="text-gray-500">No pending verification requests.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <Card key={req.id} className="p-6 bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-semibold">{req.storeName}</h3>
                <p className="text-sm text-gray-500">Owner: {req.ownerName} | User: {req.user.name} ({req.user.email})</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p><strong>Category:</strong> {req.businessCategory}</p>
                  <p><strong>Location:</strong> {req.village}, {req.district}, {req.state}</p>
                  <p><strong>Contact:</strong> {req.contactInfo}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button 
                  onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => handleUpdateStatus(req.id, 'APPROVED')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Approve (Verified)
                </Button>
                <Button 
                  onClick={() => handleUpdateStatus(req.id, 'APPROVED', 'PREMIUM')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Approve (Premium)
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
