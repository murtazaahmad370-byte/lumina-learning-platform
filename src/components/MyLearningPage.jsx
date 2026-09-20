import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Award, 
  Play, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Sparkles, 
  GraduationCap, 
  TrendingUp, 
  Compass,
  Filter,
  Loader2
} from 'lucide-react';
import { LearnerSidebar } from './LearnerSidebar';
import { Footer } from './Footer';
import { useTheme } from '../context/ThemeContext';
import { useEnrollments, useBookmarks } from '../lib/useSupabaseHooks';
import { allCoursesData } from '../data/coursesData';
import { courseVideoMap } from '../data/courseVideoMap';

export const MyLearningPage = ({ 
  onOpenPlayer, 
  onWatch,
  onExploreCourses, 
  onNavigate 
}) => {
  const { darkMode } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('All Courses');
  const [selectedSidebarTab, setSelectedSidebarTab] = useState('my-learning');

  const handlePlay = onOpenPlayer || onWatch;

  // Supabase hooks for real user enrollments and bookmarks
  const { enrollments, loading: enrollmentsLoading, isLoggedIn } = useEnrollments();
  const { bookmarkedIds } = useBookmarks();

  const sampleContinueCourses = [
    {
      id: 'photoshop',
      title: 'Adobe Photoshop Complete Course',
      progress: 72,
      completedLessons: 5,
      totalLessons: 10,
      language: 'Urdu',
      image: '/images/ui-ux-design.png',
      badge: 'Ps',
      badgeColor: 'bg-[#001E36] text-[#31A8FF] border border-[#31A8FF]/40'
    },
    {
      id: 'illustrator',
      title: 'Adobe Illustrator Complete Course',
      progress: 45,
      completedLessons: 6,
      totalLessons: 12,
      language: 'Urdu',
      image: '/images/graphic-design.png',
      badge: 'Ai',
      badgeColor: 'bg-[#330000] text-[#FF9A00] border border-[#FF9A00]/40'
    },
    {
      id: 'python',
      title: 'Python for Beginners',
      progress: 30,
      completedLessons: 3,
      totalLessons: 10,
      language: 'Urdu',
      image: '/images/particles-motion.png',
      badge: 'Py',
      badgeColor: 'bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/40'
    },
    {
      id: 'premiere',
      title: 'Video Editing with Adobe Premiere Pro',
      progress: 15,
      completedLessons: 2,
      totalLessons: 13,
      language: 'Pashto',
      image: '/images/cinematic-video.png',
      badge: 'Pr',
      badgeColor: 'bg-[#2D0036] text-[#EA77FF] border border-[#EA77FF]/40'
    }
  ];

  // Dynamic user courses from Supabase enrollments, or fallback to sample
  const hasRealEnrollments = enrollments && enrollments.length > 0;
  
  const displayCourses = hasRealEnrollments
    ? enrollments.map((e) => ({
        id: e.course_id,
        title: e.course_title,
        progress: e.progress || 0,
        completedLessons: e.completed_lessons || 0,
        totalLessons: e.total_lessons || 10,
        language: courseVideoMap[e.course_id]?.primaryLanguage || e.language || 'English',
        image: e.course_image || '/images/ui-ux-design.png',
        badge: e.course_badge || e.course_title?.slice(0, 2).toUpperCase() || 'CO',
        badgeColor: e.course_badge_color || 'bg-[#001E36] text-[#31A8FF] border border-[#31A8FF]/40',
        isCompleted: e.is_completed || (e.progress >= 100)
      }))
    : sampleContinueCourses;

  // Bookmarked courses
  const savedCourses = allCoursesData.filter((c) => bookmarkedIds.has(String(c.id)));

  // Filter courses based on selectedFilter or sidebar tab
  const activeTab = selectedSidebarTab === 'saved' ? 'Saved' : selectedFilter;

  const filteredCourses = activeTab === 'Saved'
    ? savedCourses.map(c => ({
        id: c.id,
        title: c.title,
        progress: 0,
        completedLessons: 0,
        totalLessons: 10,
        language: courseVideoMap[c.id]?.primaryLanguage || c.language || 'English',
        image: c.image,
        badge: c.title.slice(0, 2).toUpperCase(),
        badgeColor: 'bg-[#001E36] text-[#31A8FF] border border-[#31A8FF]/40',
        isCompleted: false
      }))
    : activeTab === 'Completed'
    ? displayCourses.filter(c => c.progress >= 100)
    : activeTab === 'In Progress'
    ? displayCourses.filter(c => c.progress < 100)
    : displayCourses;

  // Dynamic metrics
  const totalEnrolled = hasRealEnrollments ? enrollments.length : 4;
  const totalCompletedLessons = hasRealEnrollments 
    ? enrollments.reduce((acc, curr) => acc + (curr.completed_lessons || 0), 0)
    : 18;
  const avgProgress = hasRealEnrollments
    ? Math.round(enrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (enrollments.length || 1))
    : 62;
  const certificatesEarned = hasRealEnrollments
    ? enrollments.filter(e => e.progress >= 100).length
    : 2;

  const inProgressList = [
    {
      id: 'photoshop',
      title: 'Adobe Photoshop Complete Course',
      completedLessons: 5,
      totalLessons: 10,
      progress: 72,
      badge: 'Ps',
      badgeColor: 'bg-[#001E36] text-[#31A8FF]'
    },
    {
      id: 'illustrator',
      title: 'Adobe Illustrator Complete Course',
      completedLessons: 6,
      totalLessons: 12,
      progress: 45,
      badge: 'Ai',
      badgeColor: 'bg-[#330000] text-[#FF9A00]'
    },
    {
      id: 'python',
      title: 'Python for Beginners',
      completedLessons: 3,
      totalLessons: 10,
      progress: 30,
      badge: 'Py',
      badgeColor: 'bg-[#1E293B] text-[#38BDF8]'
    },
    {
      id: 'premiere',
      title: 'Video Editing with Adobe Premiere Pro',
      completedLessons: 2,
      totalLessons: 13,
      progress: 15,
      badge: 'Pr',
      badgeColor: 'bg-[#2D0036] text-[#EA77FF]'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'completed',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 bg-emerald-500/10',
      title: 'Completed lesson',
      detail: 'Workspace Overview in Adobe Photoshop',
      time: '2h ago'
    },
    {
      id: 2,
      type: 'started',
      icon: Play,
      iconColor: 'text-[#4B6BB6] bg-[#4B6BB6]/10',
      title: 'Started lesson',
      detail: 'Tools Panel Overview in Adobe Photoshop',
      time: '3h ago'
    },
    {
      id: 3,
      type: 'saved',
      icon: Bookmark,
      iconColor: 'text-amber-500 bg-amber-500/10',
      title: 'Saved course',
      detail: 'Advanced Cloud Architecture & Microservices',
      time: '1d ago'
    },
    {
      id: 4,
      type: 'achievement',
      icon: Award,
      iconColor: 'text-purple-500 bg-purple-500/10',
      title: 'Earned achievement',
      detail: 'Consistent Learner (7 Days Streak)',
      time: '2d ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#D4C79C] dark:bg-[#0E131F] text-[#131720] dark:text-white transition-colors duration-300 flex flex-col font-sans">
      
      {/* ── BREADCRUMB & HEADER SECTION ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-inter text-slate-600 dark:text-slate-400 mb-4">
          <button onClick={() => onNavigate && onNavigate('landing')} className="hover:text-[#4B6BB6] transition-colors">
            Home
          </button>
          <span>›</span>
          <span className="font-semibold text-[#131720] dark:text-white">My Learning</span>
        </div>
      </div>

      {/* ── MAIN DASHBOARD CONTAINER WITH SIDEBAR ── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pb-16 flex-1 flex flex-col lg:flex-row items-start gap-8">
        
        {/* Left Learner Sidebar */}
        <LearnerSidebar 
          currentTab={selectedSidebarTab}
          onSelectTab={(tab) => {
            setSelectedSidebarTab(tab);
            if (tab === 'saved') setSelectedFilter('Saved');
            else if (tab === 'completed') setSelectedFilter('Completed');
            else if (tab === 'in-progress') setSelectedFilter('In Progress');
            else if (tab === 'my-learning') setSelectedFilter('All Courses');
          }}
          onNavigate={onNavigate}
        />

        {/* Right Dashboard Content */}
        <div className="flex-1 w-full flex flex-col gap-8">
          
          {/* Top Title & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-[#131720] dark:text-white tracking-tight">
                My Learning
              </h1>
              <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {hasRealEnrollments 
                  ? 'Your personalized learning dashboard synced with your account.' 
                  : 'Track your progress and continue where you left off.'}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 px-4 py-2.5 rounded-2xl border border-white/80 dark:border-slate-700 shadow-sm self-start sm:self-auto">
              <select 
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  if (e.target.value === 'Saved') setSelectedSidebarTab('saved');
                  else if (e.target.value === 'Completed') setSelectedSidebarTab('completed');
                  else if (e.target.value === 'In Progress') setSelectedSidebarTab('in-progress');
                  else setSelectedSidebarTab('my-learning');
                }}
                className="bg-transparent text-xs font-poppins font-semibold text-[#131720] dark:text-white outline-none cursor-pointer"
              >
                <option value="All Courses" className="dark:bg-slate-800">All Courses ({displayCourses.length})</option>
                <option value="In Progress" className="dark:bg-slate-800">In Progress</option>
                <option value="Completed" className="dark:bg-slate-800">Completed</option>
                <option value="Saved" className="dark:bg-slate-800">Saved Wishlist ({savedCourses.length})</option>
              </select>
            </div>
          </div>

          {/* ── CONTINUE LEARNING SECTION ── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-poppins font-bold text-base sm:text-lg text-[#131720] dark:text-white">
                {activeTab === 'Saved' ? 'Saved Courses (Wishlist)' : 'Continue Learning'}
              </h2>
              {hasRealEnrollments && (
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  ● Synced with Supabase
                </span>
              )}
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {filteredCourses.map((c) => (
                  <div 
                    key={c.id}
                    onClick={() => handlePlay && handlePlay(c)}
                    className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-4 border border-white/80 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Thumbnail / Mock Screen */}
                    <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-slate-900 mb-3.5 flex items-center justify-center">
                      <img 
                        src={c.image} 
                        alt={c.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Software Badge Icon */}
                      <div className={`absolute z-10 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg ${c.badgeColor}`}>
                        {c.badge}
                      </div>

                      {/* Language Badge */}
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-inter font-semibold">
                        {c.language}
                      </span>

                      {/* Percentage Pill */}
                      <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-inter font-semibold">
                        {c.progress}%
                      </span>
                    </div>

                    {/* Title & Progress */}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-poppins font-bold text-sm text-[#131720] dark:text-white group-hover:text-[#4B6BB6] transition-colors line-clamp-2 leading-snug">
                        {c.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                        <div 
                          className="bg-[#4B6BB6] h-full rounded-full transition-all duration-500"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-inter text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-semibold text-[#4B6BB6] dark:text-[#6B8BD6]">
                          {c.progress}% Complete
                        </span>
                        <span>
                          {c.completedLessons} of {c.totalLessons} lessons
                        </span>
                      </div>

                      {/* Continue Action */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 mt-2 flex items-center justify-between">
                        <span className="font-poppins font-bold text-xs text-[#4B6BB6] dark:text-[#6B8BD6] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>{c.progress > 0 ? 'Continue' : 'Start Course'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#4B6BB6]/10 text-[#4B6BB6] flex items-center justify-center group-hover:bg-[#4B6BB6] group-hover:text-white transition-colors">
                          <Play className="w-3 h-3 fill-current" />
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/95 dark:bg-slate-800/95 rounded-3xl p-10 text-center border border-white/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center gap-3">
                <BookOpen className="w-10 h-10 text-slate-300" />
                <h4 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                  {activeTab === 'Saved' ? 'No saved courses yet' : 'No courses found'}
                </h4>
                <p className="font-inter text-xs text-slate-500 max-w-sm">
                  {activeTab === 'Saved' 
                    ? 'Click the heart icon on any course card in Course Library to bookmark it here.' 
                    : 'Enroll in courses from the Course Library to see your personal progress here.'}
                </p>
                <button
                  onClick={() => onExploreCourses ? onExploreCourses() : (onNavigate && onNavigate('courses'))}
                  className="mt-2 px-5 py-2.5 rounded-2xl bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-xs transition-colors shadow-md shadow-[#4B6BB6]/20"
                >
                  Explore Course Catalog
                </button>
              </div>
            )}
          </section>

          {/* ── LEARNING OVERVIEW CARDS ── */}
          <section className="flex flex-col gap-4">
            <h2 className="font-poppins font-bold text-base sm:text-lg text-[#131720] dark:text-white">
              Learning Overview
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Enrolled */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-5 border border-white/80 dark:border-slate-700 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4B6BB6]/15 text-[#4B6BB6] dark:text-[#6B8BD6] flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-poppins font-extrabold text-2xl text-[#131720] dark:text-white block leading-tight">
                    {totalEnrolled}
                  </span>
                  <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
                    Courses Enrolled
                  </span>
                </div>
              </div>

              {/* Card 2: Lessons Completed */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-5 border border-white/80 dark:border-slate-700 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-poppins font-extrabold text-2xl text-[#131720] dark:text-white block leading-tight">
                    {totalCompletedLessons}
                  </span>
                  <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
                    Lessons Completed
                  </span>
                </div>
              </div>

              {/* Card 3: Overall Progress */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-5 border border-white/80 dark:border-slate-700 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-poppins font-extrabold text-2xl text-[#131720] dark:text-white block leading-tight">
                    {avgProgress}%
                  </span>
                  <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
                    Overall Progress
                  </span>
                </div>
              </div>

              {/* Card 4: Certificates */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-5 border border-white/80 dark:border-slate-700 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-poppins font-extrabold text-2xl text-[#131720] dark:text-white block leading-tight">
                    {certificatesEarned}
                  </span>
                  <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
                    Certificates Earned
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* ── BOTTOM TWO COLUMNS: IN PROGRESS & RECENT ACTIVITY ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left: In Progress List */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                  In Progress
                </h3>
                <button 
                  onClick={() => onNavigate && onNavigate('courses')}
                  className="font-inter font-semibold text-xs text-[#4B6BB6] dark:text-[#6B8BD6] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {inProgressList.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onOpenPlayer && onOpenPlayer(item)}
                    className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    {/* Badge */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${item.badgeColor}`}>
                      {item.badge}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-poppins font-semibold text-xs text-[#131720] dark:text-white truncate">
                          {item.title}
                        </h4>
                        <span className="font-inter font-bold text-xs text-[#4B6BB6] shrink-0">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className="bg-[#4B6BB6] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>

                      <span className="font-inter text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                        {item.completedLessons} of {item.totalLessons} lessons completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onNavigate && onNavigate('courses')}
                className="mt-2 text-xs font-poppins font-bold text-[#4B6BB6] dark:text-[#6B8BD6] flex items-center gap-1.5 hover:gap-2 transition-all self-start"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Recent Activity & Motivation Banner */}
            <div className="flex flex-col gap-6">
              
              {/* Activity Timeline Card */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                    Recent Activity
                  </h3>
                  <button className="font-inter font-semibold text-xs text-[#4B6BB6] dark:text-[#6B8BD6] hover:underline">
                    View All
                  </button>
                </div>

                <div className="flex flex-col gap-3.5">
                  {recentActivities.map((act) => {
                    const Icon = act.icon;
                    return (
                      <div key={act.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-poppins font-semibold text-xs text-[#131720] dark:text-white">
                              {act.title}
                            </span>
                            <span className="font-inter text-[10px] text-slate-400">
                              {act.time}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {act.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Motivational Learning Card */}
              <div className="bg-gradient-to-br from-white/95 to-[#FAF7EF] dark:from-slate-800/95 dark:to-slate-850 rounded-3xl p-6 border border-[#D4C79C]/50 dark:border-slate-700 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0 shadow-inner">
                  <GraduationCap className="w-8 h-8 stroke-[2]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-poppins font-bold text-sm text-[#131720] dark:text-white">
                    Keep learning, keep growing!
                  </h4>
                  <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-3">
                    You're making great progress. Don't stop now.
                  </p>
                  <button
                    onClick={() => onExploreCourses && onExploreCourses()}
                    className="px-5 py-2 rounded-full bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-xs shadow-md shadow-[#4B6BB6]/25 transition-all"
                  >
                    Explore More Courses
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
