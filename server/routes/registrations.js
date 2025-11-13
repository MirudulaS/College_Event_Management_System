const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { isOrganizer } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// POST /api/registrations
// Student registers for an event
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, teamName, teamMembers = [], additionalInfo = {} } = req.body;

    // Only students can self-register
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can register for events' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!event.isRegistrationOpen) return res.status(400).json({ message: 'Registration is closed' });
    if (event.currentParticipants >= event.maxParticipants) return res.status(400).json({ message: 'Event capacity reached' });

    const existing = await Registration.findOne({ student: req.user.id, event: eventId });
    if (existing) return res.status(400).json({ message: 'Already registered for this event' });

    const registration = await Registration.create({
      student: req.user.id,
      event: eventId,
      amount: event.registrationFee,
      teamName: teamName || '',
      teamMembers,
      additionalInfo,
    });

    // Increment participant count
    event.currentParticipants += 1;
    await event.save();

    return res.json(registration);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/registrations/me - student's own registrations
router.get('/me', auth, async (req, res) => {
  try {
    const query = req.user.role === 'student' ? { student: req.user.id } : {};
    const regs = await Registration.find(query)
      .populate('event', 'title date venue registrationFee status')
      .populate('student', 'name email');
    return res.json(regs);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/registrations/event/:eventId - organizer view
router.get('/event/:eventId', [auth, isOrganizer], async (req, res) => {
  try {
    const regs = await Registration.find({ event: req.params.eventId })
      .populate('student', 'name email department year phone')
      .populate('event', 'title date endDate');

    // Auto-mark absent for past events where status was never set (still 'registered')
    const now = new Date();
    const updates = regs
      .filter((r) => (new Date(r.event.endDate || r.event.date) < now) && r.status === 'registered')
      .map(async (r) => {
        r.status = 'absent';
        await r.save();
        return r;
      });
    if (updates.length > 0) await Promise.all(updates);

    return res.json(regs);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/registrations/:id/attendance - organizer marks attendance
router.post('/:id/attendance', [auth, isOrganizer], async (req, res) => {
  try {
    const { status } = req.body; // 'attended' | 'absent'
    const reg = await Registration.findById(req.params.id).populate('student event');
    if (!reg) return res.status(404).json({ message: 'Registration not found' });

    reg.status = status === 'attended' ? 'attended' : 'absent';
    await reg.save();

    return res.json(reg);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/registrations/:id/auto-absent - mark absent if event passed
router.post('/:id/auto-absent', [auth, isOrganizer], async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id).populate('event');
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    const now = new Date();
    if (new Date(reg.event.endDate || reg.event.date) < now && reg.status === 'registered') {
      reg.status = 'absent';
      await reg.save();
    }
    return res.json(reg);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;












