import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { trendingCourses } from '../data/coursesData';
import { Flame, Play, ChevronLeft, ChevronRight, Users, Clock } from 'lucide-react';

export const TrendingCarousel = ({ onSelectCourse }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="trending-section" className="w-full px-4 sm:px-8 lg:px-14 pb-16">
      <div className="max-w-[1320px] mx-auto bg-gradient-to-r from-[#FCFBF8] to-[#EEF1F6] p-6 sm:p-10 rounded-3xl border border-white/60 shadow-lg relative overflow-hidden">
        
        {/* Decorative Ambient Radial Glow matching Figma */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header with Trending Tag and Nav Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
              <Flame className="w-5 h-5 fill-blue-600" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#131720] tracking-tight">
                Trending Now
              </h2>
              <p className="font-inter text-sm text-[#737B8C] mt-0.5">
                Most popular this week among creative professionals
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white text-[#131720] hover:bg-[#4B6BB6] hover:text-white shadow-sm border border-slate-200 flex items-center justify-center transition-all duration-200"
              aria-label="Previous courses"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white text-[#131720] hover:bg-[#4B6BB6] hover:text-white shadow-sm border border-slate-200 flex items-center justify-center transition-all duration-200"
              aria-label="Next courses"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track (Scrollbar hidden) */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x scroll-smooth relative z-10"
        >
          {trendingCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.2, ease: 'easeOut' } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCourse(course)}
              className="group min-w-[280px] sm:min-w-[310px] max-w-[320px] bg-white rounded-3xl p-3 shadow-md hover:shadow-xl border border-slate-200/80 transition-shadow duration-300 cursor-pointer snap-start flex flex-col justify-between"
            >
              {/* Card Image Container with Figma Play Overlay & Trending Badge */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 mb-3.5">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Darkness on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Trending Badge matching Figma: rgba(21, 63, 212, 0.62) */}
                <div className="absolute top-3 left-3 bg-[#153FD4]/80 backdrop-blur-md text-white text-[11px] font-inter font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>Trending</span>
                </div>

                {/* Center Hover Play Button with Cyan Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#153FD4]/80 text-white flex items-center justify-center shadow-[0px_0px_30px_rgba(0,128,255,0.6)] group-hover:scale-110 group-hover:bg-[#153FD4] transition-all duration-300">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-inter px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="px-1 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-space font-bold text-base text-[#131720] group-hover:text-[#4B6BB6] transition-colors leading-snug line-clamp-2 mb-1.5">
                    {course.title}
                  </h3>
                  <p className="font-inter text-xs text-[#737B8C] flex items-center gap-1.5 mb-3">
                    <span className="font-medium text-[#131720]/80">{course.instructor}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#737B8C]" />
                      {course.students} students
                    </span>
                  </p>
                </div>

                {/* Bottom Row: Rating & Price */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-1 text-[#4B6BB6] font-inter text-xs font-semibold">
                    <span>★</span>
                    <span>{course.rating}</span>
                    <span className="text-[#737B8C] font-normal">({course.reviews})</span>
                  </div>
                  <span className="font-inter font-bold text-sm text-[#4B6BB6] bg-[#4B6BB6]/10 px-2.5 py-0.5 rounded-full">
                    {course.price}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
