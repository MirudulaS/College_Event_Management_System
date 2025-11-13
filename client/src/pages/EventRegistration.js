import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    const load = async () => {
      try {
        const [eRes, rRes] = await Promise.all([
          axios.get(`/api/events/${eventId}`),
          axios.get('/api/registrations/me')
        ]);
        setEvent(eRes.data);
        const existing = rRes.data.find((r) => r.event?._id === eventId);
        if (existing) setRegistration(existing);
      } catch (e) {
        toast.error('Failed to load');
      }
    };
    load();
  }, [eventId]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/registrations', {
        eventId: eventId,
        teamName: data.teamName,
      });
      setRegistration(res.data);
      toast.success('Registered!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Registration failed');
    }
  };

  const qrValue = useMemo(() => {
    if (!registration) return '';
    return `upi://pay?pa=dummy@upi&pn=EventHub&am=${event?.registrationFee || 0}&tn=Event ${event?.title} Reg ${registration._id}`;
  }, [registration, event]);

  const makeDummyPayment = async () => {
    try {
      const res = await axios.post('/api/payments/dummy', {
        registrationId: registration._id,
      });
      toast.success('Payment completed');
      // Refresh registration
      const r = await axios.get('/api/registrations/me');
      const updated = r.data.find((x) => x._id === registration._id);
      setRegistration(updated || registration);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Payment failed');
    }
  };

  if (!event) return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-2">Register for {event.title}</h1>
        <p className="text-gray-600 mb-6">Fee: ₹{event.registrationFee}</p>

        {!registration ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Name (optional)</label>
              <input className="input-field" placeholder="Your team" {...register('teamName')} />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Registration ID: {registration._id}</p>
              <p>Status: {registration.paymentStatus}</p>
              {registration.transactionId && <p>Txn: {registration.transactionId}</p>}
            </div>
            {registration.paymentStatus !== 'paid' && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Scan this QR in any UPI app (demo only)</p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrValue)}&size=180x180`}
                    alt="QR"
                    className="border rounded p-2 bg-white"
                  />
                </div>
                <button onClick={makeDummyPayment} className="btn-primary">Mark Payment Done</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRegistration;


