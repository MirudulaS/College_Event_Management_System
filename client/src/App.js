import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventRegistration from './pages/EventRegistration';
import Winners from './pages/Winners';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import CreateEvent from './pages/organizer/CreateEvent';
import ManageEvents from './pages/organizer/ManageEvents';
import ManageRegistrations from './pages/organizer/ManageRegistrations';
import MyRegistrations from './pages/MyRegistrations';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route
                path="/register/:eventId"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <EventRegistration />
                  </ProtectedRoute>
                }
              />
              <Route path="/winners" element={<Winners />} />
              <Route path="/chatbot" element={<Chatbot />} />
{/* sdsd */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-registrations"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <MyRegistrations />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organizer"
                element={
                  <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/create-event"
                element={
                  <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/manage-events"
                element={
                  <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                    <ManageEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/manage-registrations"
                element={
                  <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                    <ManageRegistrations />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;



