import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (e) {
        toast.error('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    const loadWinners = async () => {
      try {
        const res = await axios.get(`/api/results/event/${id}`);
        setWinners(res.data || []);
      } catch (e) {}
    };
    loadWinners();
  }, [id]);

  const goToRegister = () => {
    if (!isAuthenticated || user?.role !== 'student') {
      toast('Please sign in as a student to register');
      navigate('/login');
      return;
    }
    navigate(`/register/${id}`);
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  if (!event) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-700 mb-6">{event.description}</p>
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
          <span>Venue: {event.venue}</span>
          <span>Date: {new Date(event.date).toLocaleString()}</span>
          <span>Fee: ₹{event.registrationFee}</span>
          <span>Participants: {event.currentParticipants}/{event.maxParticipants}</span>
        </div>
        {Array.isArray(event.rules) && event.rules.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Rules</h3>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {event.rules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}
        {Array.isArray(event.requirements) && event.requirements.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Requirements</h3>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {event.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}
        {event.registrationDeadline && (
          <div className="mb-4 text-sm text-gray-700">
            Registration Deadline: {new Date(event.registrationDeadline).toLocaleString()}
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={goToRegister} className="btn-primary">Register</button>
          <Link to="/events" className="btn-outline">Back</Link>
        </div>
        {winners.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Winners</h3>
            <div className="space-y-2">
              {winners.map((w) => (
                <div key={w._id} className="text-sm text-gray-700">
                  {w.rank}. {w.student?.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;


