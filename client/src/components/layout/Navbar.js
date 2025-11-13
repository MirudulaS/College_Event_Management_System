import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Calendar, 
  Trophy, 
  MessageCircle,
  Settings,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Events', path: '/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Winners', path: '/winners', icon: <Trophy className="w-4 h-4" /> },
    { name: 'Chatbot', path: '/chatbot', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <User className="w-4 h-4" /> },
    { name: 'My Registrations', path: '/my-registrations', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const organizerMenuItems = [
    { name: 'Organizer Dashboard', path: '/organizer', icon: <User className="w-4 h-4" /> },
    { name: 'Create Event', path: '/organizer/create-event', icon: <Plus className="w-4 h-4" /> },
    { name: 'Manage Events', path: '/organizer/manage-events', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-custom border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-college-primary to-college-secondary rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-college-primary font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-college-primary font-medium transition-colors duration-200">
                  <div className="w-8 h-8 bg-college-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-college-primary" />
                  </div>
                  <span>{user?.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-4 border-b border-gray-100">
                    <div className="font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-600">{user?.email}</div>
                    <div className="text-xs text-college-primary font-medium capitalize">{user?.role}</div>
                  </div>
                  
                  <div className="p-2">
                    {(user?.role === 'student' ? userMenuItems : organizerMenuItems).map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-college-primary font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-college-primary hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-college-primary font-medium py-2 transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="px-3 py-2">
                      <div className="font-semibold text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-600">{user?.email}</div>
                      <div className="text-xs text-college-primary font-medium capitalize">{user?.role}</div>
                    </div>
                    
                    {(user?.role === 'student' ? userMenuItems : organizerMenuItems).map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-700 hover:text-college-primary font-medium py-2 transition-colors duration-200"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full text-red-600 hover:text-red-700 font-medium py-2 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-college-primary font-medium py-2 transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-primary block text-center"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;










