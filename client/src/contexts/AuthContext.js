import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Point axios to the backend API in dev; relies on CRA proxy as a fallback
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';

  // Set axios default header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['x-auth-token'] = state.token;
      localStorage.setItem('token', state.token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  }, [state.token]);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const res = await axios.get('/api/auth/user');
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: res.data, token: state.token }
          });
          try { localStorage.setItem('user', JSON.stringify(res.data)); } catch {}
        } catch (err) {
          dispatch({ type: 'AUTH_FAIL', payload: 'Token is invalid' });
        }
      } else {
        dispatch({ type: 'AUTH_FAIL', payload: null });
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res = await axios.post('/api/auth/register', userData);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: res.data
      });
      return { success: true };
    } catch (err) {
      const error = err.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAIL', payload: error });
      return { success: false, error };
    }
  };

  // Login user
  const login = async (credentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res = await axios.post('/api/auth/login', credentials);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: res.data
      });
      // Persist user for role-based redirect convenience
      try { localStorage.setItem('user', JSON.stringify(res.data.user)); } catch {}
      return { success: true, user: res.data.user };
    } catch (err) {
      const error = err.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAIL', payload: error });
      return { success: false, error };
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Update user profile
  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    register,
    login,
    logout,
    clearError,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
