import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ── GET /api/courses/my-learning ──
router.get('/my-learning', requireAuth, (req, res) => {
  try {
    const enrollments = db.prepare(`
      SELECT * FROM course_enrollments 
      WHERE user_id = ? 
      ORDER BY enrolled_at DESC
    `).all(req.user.id);

    return res.json({
      success: true,
      data: enrollments
    });
  } catch (err) {
    console.error('[MY LEARNING FETCH ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch enrolled courses.' });
  }
});

// ── POST /api/courses/enroll ──
router.post('/enroll', requireAuth, (req, res) => {
  try {
    const { courseId, title, totalLessons = 10 } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ success: false, message: 'Course ID and title are required.' });
    }

    // Check if already enrolled
    const existing = db.prepare(`
      SELECT * FROM course_enrollments 
      WHERE user_id = ? AND course_id = ?
    `).get(req.user.id, String(courseId));

    if (existing) {
      return res.json({
        success: true,
        message: 'Already enrolled in this course.',
        data: existing
      });
    }

    const result = db.prepare(`
      INSERT INTO course_enrollments (user_id, course_id, course_title, progress, completed_lessons, total_lessons)
      VALUES (?, ?, ?, 0, 0, ?)
    `).run(req.user.id, String(courseId), title, totalLessons);

    const enrollment = db.prepare('SELECT * FROM course_enrollments WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: `Enrolled in "${title}" successfully!`,
      data: enrollment
    });
  } catch (err) {
    console.error('[COURSE ENROLL ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to enroll in course.' });
  }
});

export default router;
