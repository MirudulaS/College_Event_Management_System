const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: 'General',
  },
  prize: {
    type: String,
    default: '',
  },
  announcedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

resultSchema.index({ event: 1, rank: 1 });

module.exports = mongoose.model('Result', resultSchema);



