import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, '..', 'uploads');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `avatar-${req.user.id}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, GIF, and WEBP image files are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

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

// ── GET /api/profile ──
router.get('/', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  return res.json({ success: true, user: formatUser(user) });
});

// ── PUT /api/profile ──
router.put('/', requireAuth, (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      videoVoiceLang,
      interfaceLang,
      videoQuality,
      playbackSpeed,
      notifications
    } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let updatedFullName = user.full_name;
    let updatedFirstName = user.first_name;
    let updatedLastName = user.last_name;

    if (name && name.trim()) {
      updatedFullName = name.trim();
      const parts = updatedFullName.split(' ');
      updatedFirstName = parts[0] || user.first_name;
      updatedLastName = parts.slice(1).join(' ') || '';
    }

    const updatedPhone = phone !== undefined ? phone : user.phone;
    const updatedLocation = location !== undefined ? location : user.location;
    const updatedVideoVoiceLang = videoVoiceLang !== undefined ? videoVoiceLang : user.video_voice_lang;
    const updatedInterfaceLang = interfaceLang !== undefined ? interfaceLang : user.interface_lang;
    const updatedVideoQuality = videoQuality !== undefined ? videoQuality : user.video_quality;
    const updatedPlaybackSpeed = playbackSpeed !== undefined ? playbackSpeed : user.playback_speed;
    const updatedNotificationsJson = notifications !== undefined 
      ? JSON.stringify(notifications) 
      : user.notifications_json;

    db.prepare(`
      UPDATE users SET
        full_name = ?,
        first_name = ?,
        last_name = ?,
        phone = ?,
        location = ?,
        video_voice_lang = ?,
        interface_lang = ?,
        video_quality = ?,
        playback_speed = ?,
        notifications_json = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      updatedFullName,
      updatedFirstName,
      updatedLastName,
      updatedPhone,
      updatedLocation,
      updatedVideoVoiceLang,
      updatedInterfaceLang,
      updatedVideoQuality,
      updatedPlaybackSpeed,
      updatedNotificationsJson,
      req.user.id
    );

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: formatUser(updatedUser)
    });
  } catch (err) {
    console.error('[PROFILE UPDATE ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

// ── POST /api/profile/avatar ──
router.post('/avatar', requireAuth, upload.single('avatar'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload.' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    db.prepare(`
      UPDATE users SET
        avatar_url = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(avatarUrl, req.user.id);

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    return res.json({
      success: true,
      message: 'Profile photo updated successfully!',
      avatarUrl,
      user: formatUser(updatedUser)
    });
  } catch (err) {
    console.error('[AVATAR UPLOAD ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to upload photo.' });
  }
});

export default router;
