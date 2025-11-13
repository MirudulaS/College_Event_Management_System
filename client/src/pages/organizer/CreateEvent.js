import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Convert numeric fields
      const payload = {
        ...data,
        registrationFee: Number(data.registrationFee || 0),
        maxParticipants: Number(data.maxParticipants || 0),
        date: new Date(data.date).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        registrationDeadline: new Date(data.registrationDeadline).toISOString(),
        rules: data.rules ? data.rules.split('\n').map((s) => s.trim()).filter(Boolean) : [],
        prizes: data.prizes ? data.prizes.split('\n').map((s) => s.trim()).filter(Boolean) : [],
        requirements: data.requirements ? data.requirements.split('\n').map((s) => s.trim()).filter(Boolean) : [],
        tags: data.tags ? data.tags.split(',').map((s) => s.trim()).filter(Boolean) : [],
      };

      const res = await axios.post('/api/events', payload);
      toast.success('Event created');
      navigate('/events');
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create event';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create Event</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input className="input-field" {...register('title', { required: 'Title is required' })} />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows={4} className="input-field" {...register('description', { required: 'Description is required' })} />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="input-field" {...register('category', { required: true })}>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
                <option value="Workshop">Workshop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
              <input className="input-field" {...register('venue', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
              <input type="datetime-local" className="input-field" {...register('date', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
              <input type="datetime-local" className="input-field" {...register('endDate', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline</label>
              <input type="datetime-local" className="input-field" {...register('registrationDeadline', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee (₹)</label>
              <input type="number" className="input-field" {...register('registrationFee', { required: true })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
              <input type="number" className="input-field" {...register('maxParticipants', { required: true })} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rules (one per line)</label>
              <textarea rows={3} className="input-field" {...register('rules')} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prizes (one per line)</label>
              <textarea rows={3} className="input-field" {...register('prizes')} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (one per line)</label>
              <textarea rows={3} className="input-field" {...register('requirements')} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
              <input className="input-field" placeholder="coding, hackathon" {...register('tags')} />
            </div>

            <div className="md:col-span-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg disabled:opacity-50">
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;


