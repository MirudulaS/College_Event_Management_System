import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isAuthenticated, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: 'student',
    },
  });

  const selectedRole = watch('role');

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, error, clearError, navigate]);

  const onSubmit = async (data) => {
    const payload = { ...data };
    if (payload.role !== 'student') {
      delete payload.studentId;
      delete payload.department;
      delete payload.year;
    } else if (payload.year) {
      payload.year = Number(payload.year);
    }

    const res = await registerUser(payload);
    if (res.success) {
      toast.success('Registration successful');
      if (payload.role === 'organizer' || payload.role === 'admin') {
        navigate('/organizer');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create an account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                className="input-field"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                className="input-field"
                placeholder="9876543210"
                {...register('phone', { required: 'Phone is required' })}
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Create a strong password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select className="input-field" {...register('role', { required: true })}>
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>

            {selectedRole === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input className="input-field" placeholder="STU123" {...register('studentId', { required: 'Student ID is required' })} />
                  {errors.studentId && <p className="text-sm text-red-600 mt-1">{errors.studentId.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input className="input-field" placeholder="CSE" {...register('department', { required: 'Department is required' })} />
                  {errors.department && <p className="text-sm text-red-600 mt-1">{errors.department.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select className="input-field" {...register('year', { required: 'Year is required' })}>
                    <option value="">Select year</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                  {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>}
                </div>
              </>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg disabled:opacity-50">
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-college-primary hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;


