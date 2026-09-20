import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'lumina_super_secure_secret_key_2026_murtaza';

const formatUser = (userRow) => {
  return {
    id: userRow.id,
    firstName: userRow.first_name,
    lastName: userRow.last_name,
    name: userRow.full_name,
    email: userRow.email,
    phone: userRow.phone,
    location: userRow.location,
    memberSince: userRow.member_since,
    avatarUrl: userRow.avatar_url,
    videoVoiceLang: userRow.video_voice_lang,
    interfaceLang: userRow.interface_lang,
    videoQuality: userRow.video_quality,
    playbackSpeed: userRow.playback_speed,
    notifications: JSON.parse(userRow.notifications_json || '{}'),
    createdAt: userRow.created_at,
  };
};

// ── POST /api/auth/signup ──
router.post('/signup', (req, res) => {
  try {
    const { firstName, lastName = '', email, password } = req.body;

    if (!firstName || !firstName.trim()) {
      return res.status(400).json({ success: false, message: 'First name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const now = new Date();
    const memberSinceStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const result = db.prepare(`
      INSERT INTO users (
        first_name,
        last_name,
        full_name,
        email,
        password_hash,
        phone,
        location,
        member_since,
        avatar_url,
        video_voice_lang,
        interface_lang,
        video_quality,
        playback_speed,
        notifications_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      firstName.trim(),
      lastName.trim(),
      fullName,
      cleanEmail,
      passwordHash,
      '+92 300 0000000',
      'Pakistan',
      memberSinceStr,
      '/images/murtaza-profile.jpg',
      'Urdu',
      'Urdu',
      'Auto (Recommended)',
      'Normal (1.0x)',
      JSON.stringify({
        courseUpdates: true,
        announcements: true,
        reminders: true,
        promotions: false,
        community: true
      })
    );

    const newUserId = result.lastInsertRowid;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(newUserId);

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: formatUser(user)
    });
  } catch (err) {
    console.error('[AUTH SIGNUP ERROR]', err);
    return res.status(500).json({ success: false, message: 'Server error during signup. Please try again.' });
  }
});

// ── POST /api/auth/login ──
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    return res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: formatUser(user)
    });
  } catch (err) {
    console.error('[AUTH LOGIN ERROR]', err);
    return res.status(500).json({ success: false, message: 'Server error during login. Please try again.' });
  }
});

// ── GET /api/auth/me (Session Check) ──
router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  return res.json({
    success: true,
    user: formatUser(user)
  });
});

export default router;
