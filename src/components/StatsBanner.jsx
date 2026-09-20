import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

export const StatsBanner = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="w-full px-4 sm:px-8 lg:px-14 pb-12"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="bg-[#4B6BB6] rounded-2xl sm:rounded-3xl border border-white/20 shadow-[0_12px_40px_rgba(75,107,182,0.35)] p-6 sm:p-8 lg:px-12 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
          
          {/* Main Statement */}
          <div className="lg:max-w-xs text-center lg:text-left">
            <h3 className="font-poppins font-normal text-base sm:text-lg lg:text-xl leading-relaxed text-white/95">
              All courses from best universities and platforms
            </h3>
          </div>

          {/* Stat 1: 2K+ Courses */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-poppins font-bold text-4xl sm:text-5xl lg:text-[56px] text-white tracking-tight leading-none">
              <AnimatedCounter target={2} suffix="K+" duration={1800} />
            </span>
            <span className="font-poppins font-medium text-sm sm:text-base text-white/90 mt-1.5">
              Courses
            </span>
          </div>

          {/* Stat 2: 500+ */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-poppins font-bold text-4xl sm:text-5xl lg:text-[56px] text-white tracking-tight leading-none">
              <AnimatedCounter target={500} suffix="+" duration={2000} />
            </span>
            <span className="font-poppins font-medium text-sm sm:text-base text-white/90 mt-1.5">
              Events
            </span>
          </div>

          {/* Stat 3: 10K+ Active Students */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-poppins font-bold text-4xl sm:text-5xl lg:text-[56px] text-white tracking-tight leading-none">
              <AnimatedCounter target={10} suffix="K+" duration={2200} />
            </span>
            <span className="font-poppins font-medium text-sm sm:text-base text-white/90 mt-1.5">
              Active Students
            </span>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
