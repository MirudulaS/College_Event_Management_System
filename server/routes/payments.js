const express = require('express');
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// POST /api/payments/dummy - mark a registration as paid with a fake txn id
router.post('/dummy', auth, async (req, res) => {
  try {
    const { registrationId, transactionId } = req.body;
    const reg = await Registration.findById(registrationId);
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    if (reg.student.toString() !== req.user.id && req.user.role === 'student') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    let payment = await Payment.findOne({ registration: reg._id });
    if (!payment) {
      payment = await Payment.create({
        registration: reg._id,
        student: reg.student,
        event: reg.event,
        amount: reg.amount,
        status: 'completed',
        transactionId: transactionId || `FAKE-${Date.now()}`,
        paidAt: new Date(),
      });
    } else {
      payment.status = 'completed';
      payment.transactionId = transactionId || `FAKE-${Date.now()}`;
      payment.paidAt = new Date();
      await payment.save();
    }

    reg.paymentStatus = 'paid';
    reg.transactionId = payment.transactionId;
    await reg.save();

    try {
      // Send confirmation email (best-effort)
      const populated = await Registration.findById(reg._id).populate('student event');
      if (populated?.student?.email) {
        await sendEmail(
          populated.student.email,
          'Payment Confirmation - EventHub',
          `<p>Hi ${populated.student.name || ''},</p>
           <p>Your payment for the event <b>${populated.event?.title || ''}</b> is confirmed.</p>
           <p>Transaction ID: <b>${payment.transactionId}</b></p>
           <p>Thank you.</p>`
        );
      }
    } catch (e) {
      console.log('Email send skipped/failure:', e.message);
    }

    return res.json({ message: 'Payment marked as completed', payment });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;












