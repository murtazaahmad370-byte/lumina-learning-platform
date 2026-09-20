import React from 'react';
import { motion } from 'framer-motion';
import { allCoursesData } from '../data/coursesData';
import {
  Star, Clock, Users, Play, Eye, ArrowRight, BookOpen, Sparkles
} from 'lucide-react';

// Pick 6 best featured courses (diverse categories)
const FEATURED_IDS = ['web-1', 'web-2', 'ai-1', 'design-1', 'mob-1', 'cloud-1'];
const featuredCourses = FEATURED_IDS
  .map(id => allCoursesData.find(c => c.id === id))
  .filter(Boolean)
  .slice(0, 6);

// Fallback: if some IDs not found, fill with first 6
const displayCourses = featuredCourses.length >= 4
  ? featuredCourses
  : allCoursesData.slice(0, 6);

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.07, ease: 'easeOut' }
  })
};

const difficultyColor = {
  Beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  Advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
};

export const FeaturedCourses = ({ onSelectCourse, onWatchCourse, onViewAllCourses }) => {
  return (
    <section id="courses-section" className="w-full px-4 sm:px-8 lg:px-14 py-16 lg:py-20">
      <div className="max-w-[1360px] mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4B6BB6]/10 dark:bg-[#4B6BB6]/20 border border-[#4B6BB6]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#4B6BB6]" />
              <span className="text-xs font-poppins font-semibold text-[#4B6BB6] tracking-wide uppercase">
                Featured Courses
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#131720] dark:text-white leading-tight">
              Start Learning <span className="text-[#4B6BB6]">Today</span>
            </h2>
            <p className="font-inter text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-lg">
              Handpicked courses from top instructors — all free, all creative.
            </p>
          </div>

          {/* View All Button — Desktop */}
          <button
            onClick={onViewAllCourses}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-sm shadow-lg shadow-[#4B6BB6]/30 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Course Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course, i) => (
            <motion.div
              key={course.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative bg-white dark:bg-[#151C2C] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => onSelectCourse && onSelectCourse(course)}
            >
              {/* Course Image */}
              <div className="relative w-full h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/images/graphic-design.png'; }}
                />
                {/* Badge */}
                {course.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#4B6BB6] text-white text-[11px] font-poppins font-bold shadow-sm">
                    {course.badge}
                  </span>
                )}
                {/* Free tag */}
                {course.isFree && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-poppins font-bold shadow-sm">
                    FREE
                  </span>
                )}
                {/* Play overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onWatchCourse && onWatchCourse(course); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#131720] font-poppins font-bold text-xs hover:scale-105 transition-transform shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Watch
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelectCourse && onSelectCourse(course); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4B6BB6] text-white font-poppins font-bold text-xs hover:scale-105 transition-transform shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4.5 p-[18px]">
                {/* Category + Difficulty */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[11px] font-inter font-semibold text-[#4B6BB6] dark:text-[#6B8BD6] truncate">
                    {course.category}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className={`text-[10px] font-inter font-bold px-2 py-0.5 rounded-full ${difficultyColor[course.difficulty] || difficultyColor.Beginner}`}>
                    {course.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-sm text-[#131720] dark:text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-[#4B6BB6] transition-colors">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-xs font-inter text-slate-500 dark:text-slate-400 mb-3">
                  by <span className="font-semibold text-slate-600 dark:text-slate-300">{course.instructor}</span>
                </p>

                {/* Rating + Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-poppins font-bold text-[#131720] dark:text-white">{course.rating}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {course.students}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── View All Button — Mobile + Center ── */}
        <div className="flex justify-center mt-10">
          <button
            onClick={onViewAllCourses}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-base shadow-lg shadow-[#4B6BB6]/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <BookOpen className="w-5 h-5" />
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
