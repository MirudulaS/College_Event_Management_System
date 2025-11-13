const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/college-events';

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Ensure a default organizer exists (for first-time login)
async function ensureDefaultOrganizer() {
  try {
    const defaultEmail = process.env.DEFAULT_ORG_EMAIL || 'organizer@example.com';
    const defaultPassword = process.env.DEFAULT_ORG_PASSWORD || 'Passw0rd!';
    let user = await User.findOne({ email: defaultEmail.toLowerCase() });
    if (!user) {
      user = new User({
        name: 'Default Organizer',
        email: defaultEmail.toLowerCase(),
        // Set plain password; userSchema pre('save') will hash it once
        password: defaultPassword,
        role: 'organizer',
        phone: '9999999999',
      });
      await user.save();
      console.log('Seeded default organizer:', defaultEmail, '(change this later)');
    } else {
      // Ensure known password in dev to avoid double-hash issues from previous runs
      user.password = defaultPassword; // pre-save hook will hash correctly
      await user.save();
      console.log('Default organizer password reset for development');
    }
  } catch (e) {
    console.error('Failed to ensure default organizer:', e.message);
  }
}

ensureDefaultOrganizer();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/results', require('./routes/results'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to College Event API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
