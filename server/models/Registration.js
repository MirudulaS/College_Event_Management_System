const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    default: ''
  },
  transactionId: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'attended', 'absent', 'disqualified'],
    default: 'registered'
  },
  teamName: {
    type: String,
    default: ''
  },
  teamMembers: [{
    name: String,
    studentId: String,
    department: String
  }],
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  rank: {
    type: Number,
    default: null
  },
  certificateGenerated: {
    type: Boolean,
    default: false
  },
  certificateUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Ensure unique registration per student per event
registrationSchema.index({ student: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);

