import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Winners = () => {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/events?status=completed');
        setEvents(res.data);
      } catch (e) {
        toast.error('Failed to load events');
      }
    };
    load();
  }, []);

  useEffect(() => {
    const loadResults = async () => {
      if (!selected) return setResults([]);
      try {
        const res = await axios.get(`/api/results/event/${selected}`);
        setResults(res.data);
      } catch (e) {
        toast.error('Failed to load winners');
      }
    };
    loadResults();
  }, [selected]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Past Winners</h1>
        <div className="mb-6">
          <select
            className="input-field max-w-md"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select an event</option>
            {events.map((e) => (
              <option key={e._id} value={e._id}>{e.title}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4">
          {results.map((r) => (
            <div key={r._id} className="p-4 border rounded-lg">
              <div className="font-medium">{r.student?.name}</div>
              <div className="text-sm text-gray-600">Rank: {r.rank} • Category: {r.category}</div>
            </div>
          ))}
          {selected && results.length === 0 && (
            <p className="text-gray-600">No winners published for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Winners;


