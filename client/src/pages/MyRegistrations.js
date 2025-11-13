import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRegistrations = () => {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/registrations/me');
        setRegs(res.data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">My Registrations</h1>
        <div className="space-y-3">
          {regs.map((r) => (
            <div key={r._id} className="p-4 border rounded-lg">
              <div className="font-medium">{r.event?.title}</div>
              <div className="text-sm text-gray-600">{new Date(r.event?.date).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Payment: {r.paymentStatus}</div>
              {r.transactionId && <div className="text-sm text-gray-600">Txn: {r.transactionId}</div>}
            </div>
          ))}
          {regs.length === 0 && <p className="text-gray-600">No registrations yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default MyRegistrations;


