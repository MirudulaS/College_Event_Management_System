let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  // Fallback to console logging when nodemailer is not installed
  nodemailer = null;
}

function createTransportFromEnv() {
  if (!nodemailer) {
    return null;
  }
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const secure = port === 465; // true for 465, false for other ports
  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return transport;
}

/**
 * Sends an email using SMTP credentials from environment variables.
 * If SMTP is not configured, logs the message to console and resolves.
 *
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 */
async function sendEmail(to, subject, html) {
  const transport = createTransportFromEnv();
  if (!transport) {
    console.log('[Email Fallback] Would send email to:', to, 'subject:', subject);
    return;
  }
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };


