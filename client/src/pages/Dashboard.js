import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/registrations/me');
        setRegs(res.data);
      } catch (e) {}
    };
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">My Dashboard</h1>
        <div className="space-y-3">
          {regs.map((r) => (
            <div key={r._id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <div className="font-medium">{r.event?.title}</div>
                <div className="text-sm text-gray-600">Payment: {r.paymentStatus} | Attendance: {r.status}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/events/${r.event?._id}`} className="btn-outline">View</Link>
                {r.isWinner && r.paymentStatus === 'paid' && r.status === 'attended' && (
                  <a
                    href={`/api/results/certificate/${r._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    {/* Download Certificate */}
                  </a>
                )}
              </div>
            </div>
          ))}
          {regs.length === 0 && <p className="text-gray-600">No registrations yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;












