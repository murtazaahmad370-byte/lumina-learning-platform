import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { StatsBanner } from './components/StatsBanner';
import { AboutSection } from './components/AboutSection';
import { TrendingCarousel } from './components/TrendingCarousel';
import { CourseLibrary } from './components/CourseLibrary';
import { FeaturedCourses } from './components/FeaturedCourses';
import { Testimonials } from './components/Testimonials';
import { CommunityCTA } from './components/CommunityCTA';
import { AuthPage } from './components/AuthPage';
import { CourseModal } from './components/CourseModal';
import { VideoPlayerPage } from './components/VideoPlayerPage';
import { CoursesPage } from './components/CoursesPage';
import { CourseDetailsPage } from './components/CourseDetailsPage';
import { MyLearningPage } from './components/MyLearningPage';
import { ProfileSettingsPage } from './components/ProfileSettingsPage';
import { Footer } from './components/Footer';
import { CheckCircle2, X } from 'lucide-react';
import { supabase } from './lib/supabase';
import { courseVideoMap } from './data/courseVideoMap';

// Shared page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: 'easeIn' } },
};
const playerVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.98, transition: { duration: 0.22 } },
};

function AppContent() {
  const { darkMode } = useTheme();

  // Views: 'landing' | 'courses' | 'course-details' | 'my-learning' | 'settings' | 'player' | 'auth'
  const [currentView, setCurrentView] = useState('landing');
  const [authMode, setAuthMode] = useState('signup');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseForDetails, setCourseForDetails] = useState(null);
  const [playerCourse, setPlayerCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize and persist Supabase Auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const fullName = u.user_metadata?.full_name || 
          (u.user_metadata?.first_name ? `${u.user_metadata.first_name} ${u.user_metadata.last_name || ''}`.trim() : null) || 
          u.email?.split('@')[0] || 'Learner';
        setUser({
          name: fullName,
          email: u.email,
          id: u.id,
          user_metadata: u.user_metadata,
        });
        setIsLoggedIn(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const fullName = u.user_metadata?.full_name || 
          (u.user_metadata?.first_name ? `${u.user_metadata.first_name} ${u.user_metadata.last_name || ''}`.trim() : null) || 
          u.email?.split('@')[0] || 'Learner';
        setUser({
          name: fullName,
          email: u.email,
          id: u.id,
          user_metadata: u.user_metadata,
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  /* ── Helpers ── */
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const navigate = (view, opts = {}) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (opts.toast) showToast(opts.toast);
  };

  /* ── Auth ── */
  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    navigate('auth');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    navigate('landing', { toast: `Welcome to Lumina, ${userData.name}!` });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsLoggedIn(false);
    setUser(null);
    navigate('landing', { toast: 'Logged out successfully.' });
  };

  /* ── Course actions ── */
  const openCourseDetails = (course) => {
    setCourseForDetails(course);
    setSelectedCourse(null);
    navigate('course-details');
  };

  const openPlayer = (course) => {
    setPlayerCourse(course || courseForDetails || selectedCourse);
    setSelectedCourse(null);
    navigate('player');
  };

  const handleEnroll = async (targetCourse) => {
    const c = targetCourse || courseForDetails;
    if (!c) return;

    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      showToast('Please sign in to enroll in this course');
      handleOpenAuth('signup');
      return;
    }

    try {
      const { error } = await supabase.from('enrollments').upsert({
        user_id: currentUser.id,
        course_id: String(c.id),
        course_title: c.title,
        course_image: c.image,
        course_badge: c.badge || (c.title ? c.title.slice(0, 2).toUpperCase() : 'PS'),
        course_badge_color: c.badgeColor || 'bg-[#001E36] text-[#31A8FF]',
        total_lessons: c.lessonsCount || 10,
        progress: 0,
        completed_lessons: 0,
        language: courseVideoMap[c.id]?.primaryLanguage || c.primaryLanguage || 'English',
      }, { onConflict: 'user_id,course_id' });

      if (error) {
        showToast(`Enrolled in "${c.title}"!`);
      } else {
        showToast(`🎉 Enrolled in "${c.title}" successfully!`);
      }
      navigate('my-learning');
    } catch (e) {
      showToast(`Enrolled in "${c.title}"!`);
      navigate('my-learning');
    }
  };

  const handleEnrollCourse = (course) => {
    setSelectedCourse(null);
    showToast(`Enrolled in "${course.title}"!`);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('courses-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateCourses = () => navigate('courses');

  /* ── Reusable Navbar props ── */
  const navbarProps = {
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    onOpenAuth: handleOpenAuth,
    onOpenPlayer: () => navigate('player'),
    onNavigateCourses: handleNavigateCourses,
    onNavigateMyLearning: () => navigate('my-learning'),
    onNavigateSettings: () => navigate('settings'),
    isLoggedIn,
    user,
    onLogout: handleLogout,
  };

  return (
    <div className="min-h-screen bg-[#D4C79C] dark:bg-[#0E131F] text-[#131720] dark:text-[#F0F3F8] flex flex-col font-sans selection:bg-[#4B6BB6] selection:text-white transition-colors duration-300">

      {/* ── Global Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#131720] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── VIEW ROUTER ── */}
      <AnimatePresence mode="wait">

        {/* ── LANDING ── */}
        {currentView === 'landing' && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <Navbar {...navbarProps} />
            <main className="flex-1">
              <HeroSection onOpenAuth={handleOpenAuth} onExploreClick={handleExploreClick} />
              <FeatureCards onCardClick={(title) => {
                if (title.toLowerCase().includes('skill') || title.toLowerCase().includes('courses')) {
                  handleExploreClick();
                } else if (title.toLowerCase().includes('events')) {
                  const el = document.getElementById('trending-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleOpenAuth('signup');
                }
              }} />
              <StatsBanner />
              <AboutSection />
              <TrendingCarousel onSelectCourse={openCourseDetails} />
              <FeaturedCourses
                onSelectCourse={openCourseDetails}
                onWatchCourse={openPlayer}
                onViewAllCourses={handleNavigateCourses}
              />
              <Testimonials />
              <CommunityCTA onOpenAuth={handleOpenAuth} />
            </main>
            <Footer />
          </motion.div>
        )}

        {/* ── COURSES PAGE ── */}
        {currentView === 'courses' && (
          <motion.div key="courses" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <Navbar {...navbarProps} />
            <CoursesPage
              onSelectCourse={openCourseDetails}
              onWatchCourse={openPlayer}
              onBackToLanding={() => navigate('landing')}
            />
            <Footer />
          </motion.div>
        )}

        {/* ── COURSE DETAILS PAGE ── */}
        {currentView === 'course-details' && (
          <motion.div key="course-details" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <Navbar {...navbarProps} />
            <CourseDetailsPage
              course={courseForDetails}
              onBackToCourses={() => navigate('courses')}
              onEnroll={handleEnroll}
              onWatchCourse={openPlayer}
              onNavigate={navigate}
            />
            <Footer />
          </motion.div>
        )}

        {/* ── MY LEARNING DASHBOARD ── */}
        {currentView === 'my-learning' && (
          <motion.div key="my-learning" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <Navbar {...navbarProps} />
            <MyLearningPage
              onOpenPlayer={openPlayer}
              onWatch={openPlayer}
              onExploreCourses={() => navigate('courses')}
              onNavigate={navigate}
            />
          </motion.div>
        )}

        {/* ── PROFILE & SETTINGS ── */}
        {currentView === 'settings' && (
          <motion.div key="settings" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <Navbar {...navbarProps} />
            <ProfileSettingsPage onNavigate={navigate} />
          </motion.div>
        )}

        {/* ── VIDEO PLAYER ── */}
        {currentView === 'player' && (
          <motion.div key="player" variants={playerVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <VideoPlayerPage
              course={playerCourse || courseForDetails}
              onBackToLanding={() => navigate('landing')}
              onBackToCourses={() => navigate('courses')}
            />
          </motion.div>
        )}

        {/* ── AUTH ── */}
        {currentView === 'auth' && (
          <motion.div key="auth" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col">
            <AuthPage
              initialMode={authMode}
              onAuthSuccess={handleAuthSuccess}
              onBackToLanding={() => navigate('landing')}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Course Modal (non-destructive quick peek) ── */}
      {selectedCourse && currentView !== 'player' && currentView !== 'course-details' && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleEnrollCourse}
          onWatchCourse={openPlayer}
        />
      )}

    </div>
  );
}

export default function App() {
  return <AppContent />;
}
