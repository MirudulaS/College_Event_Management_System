const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technical', 'Cultural', 'Sports', 'Academic', 'Workshop', 'Other']
  },
  date: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  registrationFee: {
    type: Number,
    required: true,
    default: 0
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  image: {
    type: String,
    default: ''
  },
  rules: [String],
  prizes: [String],
  requirements: [String],
  isRegistrationOpen: {
    type: Boolean,
    default: true
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for better query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Event', eventSchema);

