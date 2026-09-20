import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

// ─────────────────────────────────────────────────────────────
// useBookmarks — load, toggle (save/remove) bookmarks for user
// ─────────────────────────────────────────────────────────────
export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);

      const { data } = await supabase
        .from('bookmarks')
        .select('course_id')
        .eq('user_id', user.id);

      if (data) {
        setBookmarkedIds(new Set(data.map(b => b.course_id)));
      }
      setLoading(false);
    };
    init();
  }, []);

  const toggleBookmark = useCallback(async (course) => {
    if (!userId) return null; // not logged in
    const courseId = String(course.id);
    const isBookmarked = bookmarkedIds.has(courseId);

    if (isBookmarked) {
      await supabase.from('bookmarks').delete()
        .eq('user_id', userId).eq('course_id', courseId);
      setBookmarkedIds(prev => {
        const next = new Set(prev);
        next.delete(courseId);
        return next;
      });
      return false;
    } else {
      await supabase.from('bookmarks').upsert({
        user_id: userId,
        course_id: courseId,
        course_title: course.title,
        course_image: course.image,
      }, { onConflict: 'user_id,course_id' });
      setBookmarkedIds(prev => new Set([...prev, courseId]));
      return true;
    }
  }, [userId, bookmarkedIds]);

  return { bookmarkedIds, toggleBookmark, loading, isLoggedIn: !!userId };
}

// ─────────────────────────────────────────────────────────────
// useEnrollments — enroll in course, update progress, list all
// ─────────────────────────────────────────────────────────────
export function useEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = useCallback(async (uid) => {
    const { data } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', uid)
      .order('last_watched_at', { ascending: false });

    if (data) {
      setEnrollments(data);
      setEnrolledIds(new Set(data.map(e => e.course_id)));
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);
      await fetchEnrollments(user.id);
      setLoading(false);
    };
    init();
  }, [fetchEnrollments]);

  const enroll = useCallback(async (course) => {
    if (!userId) return false;
    const courseId = String(course.id);
    if (enrolledIds.has(courseId)) return true;

    const { error } = await supabase.from('enrollments').upsert({
      user_id: userId,
      course_id: courseId,
      course_title: course.title,
      course_image: course.image,
      course_badge: course.badge || '',
      course_badge_color: course.badgeColor || '',
      total_lessons: course.totalLessons || 10,
      progress: 0,
      completed_lessons: 0,
    }, { onConflict: 'user_id,course_id' });

    if (!error) {
      await fetchEnrollments(userId);
      return true;
    }
    return false;
  }, [userId, enrolledIds, fetchEnrollments]);

  const updateProgress = useCallback(async (courseId, progress, completedLessons) => {
    if (!userId) return;
    await supabase.from('enrollments').update({
      progress,
      completed_lessons: completedLessons,
      last_watched_at: new Date().toISOString(),
      is_completed: progress >= 100,
    }).eq('user_id', userId).eq('course_id', String(courseId));
    await fetchEnrollments(userId);
  }, [userId, fetchEnrollments]);

  return { enrollments, enrolledIds, enroll, updateProgress, loading, isLoggedIn: !!userId };
}
