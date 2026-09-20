import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Globe, 
  CheckCircle2, 
  Play, 
  ShoppingCart, 
  Heart, 
  Share2, 
  FileText, 
  Tv, 
  Award, 
  HelpCircle, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Download,
  Link as LinkIcon
} from 'lucide-react';
import { Footer } from './Footer';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../lib/useSupabaseHooks';
import { courseVideoMap } from '../data/courseVideoMap';

export const CourseDetailsPage = ({ 
  course, 
  onEnroll, 
  onWatchCourse, 
  onBackToCourses, 
  onNavigate 
}) => {
  const { darkMode } = useTheme();
  const [openLessonIndex, setOpenLessonIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [detailToast, setDetailToast] = useState(null);

  const { bookmarkedIds, toggleBookmark, isLoggedIn } = useBookmarks();

  // Default course fallback if none passed
  const activeCourse = course || {
    id: 'photoshop-complete',
    title: 'Adobe Photoshop Complete Course',
    instructor: 'Muhammad Usman',
    instructorRole: 'Graphic Designer & Trainer',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    instructorRating: 4.9,
    instructorReviews: 890,
    instructorStudents: '18,450',
    instructorCourses: 22,
    rating: 4.8,
    reviews: '1.2K',
    students: '12.5K',
    category: 'Design',
    difficulty: 'Beginner',
    lessonsCount: 10,
    duration: '5h 30m',
    languages: 'Urdu, Hindi (English Subtitles)',
    price: 'Free',
    originalPrice: 'PKR 2,500',
    discount: '100% OFF',
    image: '/images/ui-ux-design.png',
    description: 'Learn Photoshop from basics to advanced and become a professional designer.',
    about: 'This Adobe Photoshop course is designed for beginners who want to learn graphic design, photo editing, and creative designs. You will learn all the essential tools and techniques step by step with practical examples.'
  };

  const whatYouWillLearn = [
    'Understand Photoshop interface and workspace',
    'Retouch photos like a professional',
    'Use selection and cropping tools effectively',
    'Create stunning graphics and posters',
    'Work with layers, masks and blending',
    'Export and save designs for web and print'
  ];

  const curriculum = [
    { id: 1, number: '01', title: 'Introduction to Photoshop', duration: '23:45', overview: 'Overview of Photoshop interface and basic tools.', hasPreview: true },
    { id: 2, number: '02', title: 'Getting Started with Tools', duration: '28:10', overview: 'In-depth breakdown of brush, pen, and shape tools.', hasPreview: false },
    { id: 3, number: '03', title: 'Working with Layers', duration: '32:20', overview: 'Master layer styles, blending modes, and opacity.', hasPreview: false },
    { id: 4, number: '04', title: 'Selection and Masking', duration: '26:15', overview: 'Precision cutout with quick selection and refine edge.', hasPreview: false },
    { id: 5, number: '05', title: 'Color Correction', duration: '24:30', overview: 'Curves, levels, hue/saturation, and color balance.', hasPreview: false },
    { id: 6, number: '06', title: 'Retouching Photos', duration: '29:50', overview: 'Healing brush, clone stamp, and frequency separation.', hasPreview: false },
    { id: 7, number: '07', title: 'Text and Typography', duration: '21:40', overview: 'Font pairing, character styles, and text effects.', hasPreview: false },
    { id: 8, number: '08', title: 'Filters and Effects', duration: '22:30', overview: 'Camera raw filter, blurs, and smart filters.', hasPreview: false },
    { id: 9, number: '09', title: 'Creative Poster Design', duration: '31:10', overview: 'Full project: designing high-converting social media posters.', hasPreview: false },
    { id: 10, number: '10', title: 'Export and Save for Web', duration: '15:20', overview: 'PNG, JPEG, WebP optimization and color profiles.', hasPreview: false }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#D4C79C] dark:bg-[#0E131F] text-[#131720] dark:text-white transition-colors duration-300 flex flex-col font-sans">
      
      {/* Toast Alert */}
      {detailToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131720] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-fadeIn text-xs font-poppins font-medium">
          <span>{detailToast}</span>
        </div>
      )}

      {/* ── BREADCRUMB ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-inter text-slate-600 dark:text-slate-400">
          <button onClick={() => onNavigate && onNavigate('landing')} className="hover:text-[#4B6BB6] transition-colors">
            Home
          </button>
          <span>›</span>
          <button onClick={onBackToCourses} className="hover:text-[#4B6BB6] transition-colors">
            Courses
          </button>
          <span>›</span>
          <span className="font-semibold text-[#131720] dark:text-white truncate max-w-xs sm:max-w-md">
            {activeCourse.title}
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pb-20 flex-1 flex flex-col lg:flex-row items-start gap-8">
        
        {/* ── LEFT COLUMN: COURSE OVERVIEW & CURRICULUM ── */}
        <div className="flex-1 w-full flex flex-col gap-8">
          
          {/* Header Info */}
          <div className="flex flex-col gap-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4B6BB6]/15 text-[#4B6BB6] dark:text-[#6B8BD6] font-poppins font-bold text-xs self-start">
              {activeCourse.category}
            </span>

            <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#131720] dark:text-white tracking-tight leading-tight">
              {activeCourse.title}
            </h1>

            <p className="font-inter text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {activeCourse.description}
            </p>

            {/* Ratings & Enrolled count */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-inter text-slate-600 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 font-bold text-[#131720] dark:text-white">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{activeCourse.rating}</span>
                <span className="font-normal text-slate-500">({activeCourse.reviews} reviews)</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{activeCourse.students} students enrolled</span>
              </span>
            </div>

            {/* Metadata Pills matching screenshot */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/80 dark:border-slate-700 shadow-sm text-xs font-poppins font-semibold text-slate-700 dark:text-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-[#4B6BB6]" />
                <span>{activeCourse.difficulty}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/80 dark:border-slate-700 shadow-sm text-xs font-poppins font-semibold text-slate-700 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-[#4B6BB6]" />
                <span>{activeCourse.lessonsCount || 10} Lessons</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/80 dark:border-slate-700 shadow-sm text-xs font-poppins font-semibold text-slate-700 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-[#4B6BB6]" />
                <span>{activeCourse.duration}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-white/80 dark:border-slate-700 shadow-sm text-xs font-poppins font-semibold text-slate-700 dark:text-slate-200">
                <Globe className="w-3.5 h-3.5 text-[#4B6BB6]" />
                <span>{courseVideoMap[activeCourse?.id]?.languages || courseVideoMap[activeCourse?.id]?.primaryLanguage || activeCourse.languages || activeCourse.language || 'English (Voice & Subtitles)'}</span>
              </div>
            </div>

          </div>

          {/* About This Course */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-slate-700 shadow-sm">
            <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#131720] dark:text-white mb-3">
              About this course
            </h2>
            <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeCourse.about || activeCourse.description}
            </p>
          </div>

          {/* What You'll Learn Card */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-slate-700 shadow-sm">
            <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#131720] dark:text-white mb-5">
              What you'll learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-inter text-slate-700 dark:text-slate-200">
              {whatYouWillLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum Accordion */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#131720] dark:text-white">
                  Course curriculum
                </h2>
              </div>
              <span className="font-inter text-xs font-semibold text-slate-500 dark:text-slate-400">
                10 Lessons • 5h 30m
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {curriculum.map((lesson, idx) => {
                const isOpen = openLessonIndex === idx;
                return (
                  <div 
                    key={lesson.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen 
                        ? 'border-[#4B6BB6]/40 bg-[#4B6BB6]/5 dark:bg-slate-750' 
                        : 'border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80'
                    }`}
                  >
                    <div 
                      onClick={() => setOpenLessonIndex(isOpen ? -1 : idx)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-7 h-7 rounded-xl bg-[#4B6BB6] text-white flex items-center justify-center font-poppins font-bold text-xs shrink-0">
                          <Play className="w-3 h-3 fill-white ml-0.5" />
                        </div>
                        <span className="font-poppins font-semibold text-xs text-[#4B6BB6] shrink-0">
                          {lesson.number}
                        </span>
                        <h4 className="font-poppins font-semibold text-xs sm:text-sm text-[#131720] dark:text-white truncate">
                          {lesson.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
                          {lesson.duration}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#4B6BB6]/15 text-xs font-inter text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                        <p>{lesson.overview}</p>
                        {lesson.hasPreview && (
                          <button
                            onClick={() => onWatchCourse && onWatchCourse(activeCourse)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B6BB6] text-white font-poppins font-bold text-[11px] self-start sm:self-auto hover:bg-[#385396] shadow-sm transition-all"
                          >
                            <span>Preview</span>
                            <Play className="w-2.5 h-2.5 fill-white" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN: STICKY PURCHASE / PREVIEW CARD ── */}
        <aside className="w-full lg:w-96 shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">
          
          {/* Card 1: Video Preview & Purchase Action */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-xl flex flex-col gap-5">
            
            {/* Thumbnail with Big Play Button */}
            <div 
              onClick={() => onWatchCourse && onWatchCourse(activeCourse)}
              className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer group shadow-md"
            >
              <img 
                src={activeCourse.image} 
                alt={activeCourse.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              
              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white text-[#4B6BB6] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-[#4B6BB6] ml-1" />
                </div>
              </div>

              {/* Preview Badge */}
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-poppins font-semibold">
                Preview Course
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="font-poppins font-extrabold text-3xl text-[#131720] dark:text-white">
                  {activeCourse.price}
                </span>
                {activeCourse.originalPrice && (
                  <span className="font-inter text-xs text-slate-400 line-through">
                    {activeCourse.originalPrice}
                  </span>
                )}
              </div>

              {activeCourse.discount && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-poppins font-bold text-xs">
                  {activeCourse.discount}
                </span>
              )}
            </div>

            {/* Action Buttons: Enroll Now + Cart */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => onEnroll && onEnroll(activeCourse)}
                className="flex-1 py-3.5 rounded-2xl bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-sm shadow-lg shadow-[#4B6BB6]/30 transition-all transform hover:scale-[1.02]"
              >
                Enroll Now
              </button>
              <button 
                onClick={() => onEnroll && onEnroll(activeCourse)}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#4B6BB6] text-[#4B6BB6] hover:bg-[#4B6BB6]/5 transition-colors"
                title="Add to Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            {/* Save For Later Outline Button */}
            <button 
              onClick={async () => {
                if (!isLoggedIn) {
                  setDetailToast('Please sign in to save courses to wishlist');
                  setTimeout(() => setDetailToast(null), 2500);
                  return;
                }
                const added = await toggleBookmark(activeCourse);
                setDetailToast(added ? 'Course saved to wishlist! ❤️' : 'Removed from wishlist');
                setTimeout(() => setDetailToast(null), 2000);
              }}
              className={`w-full py-3 rounded-2xl border text-xs font-poppins font-semibold transition-all flex items-center justify-center gap-2 ${
                bookmarkedIds.has(String(activeCourse.id))
                  ? 'border-rose-400 text-rose-500 bg-rose-50 dark:bg-rose-950/20' 
                  : 'border-slate-300 dark:border-slate-600 text-[#131720] dark:text-white hover:border-[#4B6BB6]'
              }`}
            >
              <Heart className={`w-4 h-4 ${bookmarkedIds.has(String(activeCourse.id)) ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{bookmarkedIds.has(String(activeCourse.id)) ? 'Saved in Wishlist' : 'Save for later'}</span>
            </button>

            {/* This Course Includes */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2.5 text-xs font-inter text-slate-600 dark:text-slate-300">
              <span className="font-poppins font-bold text-xs text-[#131720] dark:text-white block mb-1">
                This course includes:
              </span>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                <span>10 lessons</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                <span>5h 30m on-demand video</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                <span>Downloadable resources</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Tv className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                <span>Access on mobile and TV</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                <span>Certificate of completion</span>
              </div>
            </div>

            {/* Share This Course */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
              <span className="font-inter">Share this course:</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyLink}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#4B6BB6] hover:text-white flex items-center justify-center transition-colors"
                  title="Copy link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#4B6BB6] hover:text-white flex items-center justify-center transition-colors font-serif font-bold text-xs"
                >
                  f
                </button>
                <button 
                  onClick={() => window.open('https://twitter.com', '_blank')}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#4B6BB6] hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
                >
                  𝕏
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#4B6BB6] hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
                >
                  in
                </button>
              </div>
            </div>
            {copiedLink && (
              <span className="text-[11px] font-inter text-emerald-500 text-center -mt-2">
                Link copied to clipboard!
              </span>
            )}

          </div>

          {/* Card 2: Instructor Card */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col items-center text-center gap-3">
            <span className="font-poppins font-bold text-xs text-slate-400 uppercase tracking-wider self-start">
              Instructor
            </span>
            
            <img 
              src={activeCourse.instructorAvatar} 
              alt={activeCourse.instructor}
              className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-[#4B6BB6]/30 mt-1" 
            />

            <div>
              <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                {activeCourse.instructor}
              </h3>
              <p className="font-inter text-xs text-slate-500 dark:text-slate-400">
                {activeCourse.instructorRole}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-inter text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{activeCourse.instructorRating}</span>
                <span className="font-normal text-slate-400">({activeCourse.instructorReviews})</span>
              </span>
              <span>•</span>
              <span>{activeCourse.instructorStudents} students</span>
              <span>•</span>
              <span>{activeCourse.instructorCourses} courses</span>
            </div>

            <button 
              onClick={() => onNavigate && onNavigate('about')}
              className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#4B6BB6] text-[#4B6BB6] dark:text-[#6B8BD6] font-poppins font-semibold text-xs transition-colors mt-2"
            >
              View Profile
            </button>
          </div>

          {/* Card 3: Have A Question */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-sm text-[#131720] dark:text-white">
                  Have a question?
                </h4>
                <p className="font-inter text-xs text-slate-500 dark:text-slate-400">
                  Ask questions in our community and get help from instructors and other students.
                </p>
              </div>
            </div>

            <button 
              onClick={() => onNavigate && onNavigate('about')}
              className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#4B6BB6] text-[#4B6BB6] dark:text-[#6B8BD6] font-poppins font-semibold text-xs transition-colors mt-1"
            >
              Visit Community
            </button>
          </div>

          {/* Card 4: 30-Day Money Back Guarantee */}
          <div className="bg-[#FAF7EF] dark:bg-slate-800/80 rounded-3xl p-5 border border-[#D4C79C]/40 dark:border-slate-700 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-[#131720] dark:text-white uppercase tracking-wide">
                30-Day Money Back Guarantee
              </h4>
              <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>

        </aside>

      </main>

      <Footer />
    </div>
  );
};
