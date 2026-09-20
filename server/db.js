import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure storage directories exist
const dataDir = path.resolve(__dirname, 'data');
const uploadsDir = path.resolve(__dirname, 'uploads');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = process.env.DATABASE_PATH || path.join(dataDir, 'lumina.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys for high performance and integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT DEFAULT '',
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    phone TEXT DEFAULT '+92 300 1234567',
    location TEXT DEFAULT 'Peshawar, Pakistan',
    member_since TEXT DEFAULT 'May 15, 2024',
    avatar_url TEXT DEFAULT '/images/murtaza-profile.jpg',
    video_voice_lang TEXT DEFAULT 'Urdu',
    interface_lang TEXT DEFAULT 'Urdu',
    video_quality TEXT DEFAULT 'Auto (Recommended)',
    playback_speed TEXT DEFAULT 'Normal (1.0x)',
    notifications_json TEXT DEFAULT '{"courseUpdates":true,"announcements":true,"reminders":true,"promotions":false,"community":true}',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS course_enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id TEXT NOT NULL,
    course_title TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    completed_lessons INTEGER DEFAULT 0,
    total_lessons INTEGER DEFAULT 10,
    enrolled_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, course_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// Seed default profile for Murtaza Ahmad if not present
const seedUser = () => {
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('murtazaahmad@gmail.com');
  if (!existingUser) {
    const defaultPassword = 'Password123!';
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(defaultPassword, salt);

    db.prepare(`
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
      'Murtaza',
      'Ahmad',
      'Murtaza Ahmad',
      'murtazaahmad@gmail.com',
      passwordHash,
      '+92 300 1234567',
      'Peshawar, Pakistan',
      'May 15, 2024',
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
    console.log('[DB] Seeded default user "Murtaza Ahmad" (murtazaahmad@gmail.com)');
  }
};

try {
  seedUser();
} catch (err) {
  console.error('[DB] Error seeding user:', err);
}
