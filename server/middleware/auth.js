import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'lumina_super_secure_secret_key_2026_murtaza';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.prepare(`
      SELECT 
        id, first_name, last_name, full_name, email, phone, location, 
        member_since, avatar_url, video_voice_lang, interface_lang, 
        video_quality, playback_speed, notifications_json, created_at
      FROM users WHERE id = ?
    `).get(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid session. User not found.' });
    }

    req.user = {
      ...user,
      notifications: JSON.parse(user.notifications_json || '{}')
    };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};
