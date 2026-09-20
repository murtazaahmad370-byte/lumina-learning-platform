import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// ── POST /api/contact ──
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    const errors = [];
    if (!name || !name.trim()) errors.push('Name is required.');
    if (!email || !email.trim()) {
      errors.push('Email address is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.push('Please enter a valid email address.');
    }
    if (!subject || !subject.trim()) errors.push('Subject is required.');
    if (!message || !message.trim()) {
      errors.push('Message is required.');
    } else if (message.trim().length < 10) {
      errors.push('Message must be at least 10 characters.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors
      });
    }

    const result = db.prepare(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `).run(name.trim(), email.trim(), subject.trim(), message.trim());

    const savedMessage = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you soon.',
      data: savedMessage
    });
  } catch (err) {
    console.error('[CONTACT SUBMISSION ERROR]', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit your message at this time. Please try again later.'
    });
  }
});

// ── GET /api/contact (List messages) ──
router.get('/', (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 50').all();
    return res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    console.error('[CONTACT FETCH ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve messages.' });
  }
});

export default router;
