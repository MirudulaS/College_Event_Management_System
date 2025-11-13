const express = require('express');
const PDFDocument = require('pdfkit');
const Result = require('../models/Result');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { isOrganizer } = require('../middleware/auth');

const router = express.Router();

// POST /api/results/mark - organizer marks winners
router.post('/mark', [auth, isOrganizer], async (req, res) => {
  try {
    const { registrationId, rank, category, prize } = req.body;
    const reg = await Registration.findById(registrationId).populate('student event');
    if (!reg) return res.status(404).json({ message: 'Registration not found' });

    const result = await Result.create({
      event: reg.event._id,
      registration: reg._id,
      student: reg.student._id,
      rank,
      category,
      prize: prize || '',
      announcedBy: req.user.id,
    });

    reg.isWinner = true;
    reg.rank = rank;
    await reg.save();

    return res.json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/results/event/:eventId - public past winners for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const results = await Result.find({ event: req.params.eventId })
      .populate('student', 'name department year')
      .populate('event', 'title date');
    return res.json(results);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/results/certificate/:registrationId - generate simple PDF certificate
router.get('/certificate/:registrationId', async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.registrationId)
      .populate('student', 'name')
      .populate('event', 'title date');
    if (!reg) return res.status(404).json({ message: 'Registration not found' });

    // Eligibility: must be winner, payment paid, and attended
    if (!reg.isWinner || reg.paymentStatus !== 'paid' || reg.status !== 'attended') {
      return res.status(403).json({ message: 'Certificate not available yet' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="certificate.pdf"');
    doc.pipe(res);

    doc.fontSize(24).text('Certificate of Achievement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`This is to certify that ${reg.student.name}`, { align: 'center' });
    doc.text(`has secured rank ${reg.rank} in ${reg.event.title}.`, { align: 'center' });
    doc.moveDown();
    doc.text(`Date: ${new Date(reg.event.date).toDateString()}`, { align: 'center' });
    doc.end();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;












