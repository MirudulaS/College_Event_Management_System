import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [regsByEvent, setRegsByEvent] = useState({});
  const [rankByReg, setRankByReg] = useState({});

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
      setRegsByEvent({ ...regsByEvent, [eventId]: res.data });
    } catch (e) {
      toast.error('Failed to load registrations');
    }
  };

  const markAttendance = async (registrationId, status, eventId) => {
    try {
      await axios.post(`/api/registrations/${registrationId}/attendance`, { status });
      await loadRegs(eventId);
      toast.success('Attendance updated');
    } catch (e) {
      toast.error('Failed to update attendance');
    }
  };

  const autoAbsent = async (registrationId, eventId) => {
    try {
      await axios.post(`/api/registrations/${registrationId}/auto-absent`);
      await loadRegs(eventId);
    } catch (e) {}
  };

  const markWinner = async (registrationId, eventId) => {
    try {
      const rank = Number(rankByReg[registrationId] || 1);
      await axios.post('/api/results/mark', { registrationId, rank });
      await loadRegs(eventId);
      toast.success('Winner marked');
    } catch (e) {
      toast.error('Failed to mark winner');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Manage Events</h1>
        <div className="space-y-6">
          {events.map((ev) => (
            <div key={ev._id} className="border rounded-xl">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-sm text-gray-600">{new Date(ev.date).toLocaleString()}</div>
                </div>
                <button onClick={() => loadRegs(ev._id)} className="btn-outline">Load Registrations</button>
              </div>
              {Array.isArray(regsByEvent[ev._id]) && (
                <div className="p-4 space-y-3 border-t">
                  {regsByEvent[ev._id].map((r) => (
                    <div key={r._id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{r.student?.name} <span className="text-xs text-gray-500">({r.student?.email})</span></div>
                          <div className="text-sm text-gray-600">Payment: {r.paymentStatus} | Attendance: {r.status}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => markAttendance(r._id, 'attended', ev._id)} className="btn-primary">Present</button>
                          <button onClick={() => markAttendance(r._id, 'absent', ev._id)} className="btn-outline">Absent</button>
                          <button onClick={() => autoAbsent(r._id, ev._id)} className="btn-outline">Auto-absent</button>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <input type="number" min={1} className="input-field w-24" placeholder="Rank" onChange={(e) => setRankByReg({ ...rankByReg, [r._id]: e.target.value })} />
                        <button onClick={() => markWinner(r._id, ev._id)} className="btn-primary">Mark Winner</button>
                      </div>
                    </div>
                  ))}
                  {regsByEvent[ev._id].length === 0 && <div className="text-gray-600">No registrations yet.</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;












