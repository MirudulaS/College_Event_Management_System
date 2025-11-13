const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { isOrganizer } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Organizer only)
router.post('/', [auth, isOrganizer], async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      endDate,
      venue,
      registrationFee,
      maxParticipants,
      rules,
      prizes,
      requirements,
      registrationDeadline,
      tags
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      category,
      date,
      endDate,
      venue,
      registrationFee,
      maxParticipants,
      rules,
      prizes,
      requirements,
      registrationDeadline,
      tags,
      organizer: req.user.id
    });

    const event = await newEvent.save();
    await event.populate('organizer', 'name email');
    
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private (Organizer only)
router.put('/:id', [auth, isOrganizer], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('organizer', 'name email');

    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private (Organizer only)
router.delete('/:id', [auth, isOrganizer], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await event.remove();
    res.json({ message: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET /api/events/upcoming
// @desc    Get upcoming events
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const events = await Event.find({
      status: 'upcoming',
      date: { $gte: new Date() }
    })
    .populate('organizer', 'name email')
    .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/events/past
// @desc    Get past events
// @access  Public
router.get('/past', async (req, res) => {
  try {
    const events = await Event.find({
      status: 'completed'
    })
    .populate('organizer', 'name email')
    .sort({ date: -1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;





