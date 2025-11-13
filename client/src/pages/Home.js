import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Award, 
  MessageCircle, 
  ArrowRight,
  Play,
  Star,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Discovery",
      description: "Browse through a wide variety of college events, workshops, and competitions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Easy Registration",
      description: "Simple and quick registration process with secure payment options"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Track Winners",
      description: "View past winners and download certificates for your achievements"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Get instant help from our AI chatbot for any questions or doubts"
    }
  ];

  const stats = [
    { number: "500+", label: "Events Organized" },
    { number: "10K+", label: "Students Registered" },
    { number: "50+", label: "Colleges Participating" },
    { number: "100%", label: "Secure Payments" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content: "The platform made it so easy to discover and register for events. I won my first coding competition!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Mechanical Engineering",
      content: "Great experience with the event registration system. The payment process was smooth and secure.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      role: "Event Organizer",
      content: "As an organizer, managing registrations and participants has never been easier. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-college-primary via-college-primary/90 to-college-secondary text-white">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Amazing
                <span className="block text-college-gold">College Events</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Join exciting competitions, workshops, and cultural events. 
                Register with ease, track your progress, and celebrate your achievements!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/events"
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2"
                >
                  Explore Events
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/register"
                  className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-college-primary"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-custom rounded-2xl p-8 border border-white/20">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">Watch Demo</h3>
                  <p className="text-blue-100">See how easy it is to register for events</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-college-gold text-white p-3 rounded-full">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-college-accent text-white p-3 rounded-full">
                <Award className="w-6 h-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-college-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive solution for college event management with 
              features designed to make your experience seamless and enjoyable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center group hover:scale-105"
              >
                <div className="w-16 h-16 bg-college-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-college-primary group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our users have to say about their experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-college-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-college-primary to-college-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Event Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of students who are already discovering amazing opportunities 
              and building their skills through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/events"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-college-primary"
              >
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;










