import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageRegistrations = () => {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState('');
  const [regs, setRegs] = useState([]);
  const [rankById, setRankById] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
      } catch (e) {
        toast.error('Failed to load events');
      }
    };
    load();
  }, []);

  const loadRegs = async (eventId) => {
    try {
      const res = await axios.get(`/api/registrations/event/${eventId}`);
      setRegs(res.data);
    } catch (e) {
      toast.error('Failed to load registrations');
    }
  };

  const markWinner = async (registrationId) => {
    try {
      const rank = Number(rankById[registrationId] || 1);
      await axios.post('/api/results/mark', {
        registrationId,
        rank,
        category: rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd',
      });
      toast.success('Winner marked');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to mark winner');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Registrations</h1>
        <div className="mb-6 flex gap-3 items-center">
          <select
            className="input-field max-w-md"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              if (e.target.value) loadRegs(e.target.value);
              else setRegs([]);
            }}
          >
            <option value="">Select event</option>
            {events.map((e) => (
              <option key={e._id} value={e._id}>{e.title}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          {regs.map((r) => (
            <div key={r._id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <div className="font-medium">{r.student?.name} <span className="text-xs text-gray-500">({r.student?.email})</span></div>
                <div className="text-sm text-gray-600">Payment: {r.paymentStatus}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="input-field w-24"
                  placeholder="Rank"
                  min={1}
                  onChange={(e) => setRankById({ ...rankById, [r._id]: e.target.value })}
                />
                <button onClick={() => markWinner(r._id)} className="btn-primary">Mark Winner</button>
              </div>
            </div>
          ))}
          {selected && regs.length === 0 && (
            <p className="text-gray-600">No registrations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRegistrations;


