const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true,
    index: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  transactionId: {
    type: String,
    default: '',
    index: true,
  },
  paidAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

paymentSchema.index({ student: 1, event: 1 });

module.exports = mongoose.model('Payment', paymentSchema);



