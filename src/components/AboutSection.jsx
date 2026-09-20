import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Target, Users } from 'lucide-react';

export const AboutSection = () => {
  return (
    <motion.section 
      id="about-section" 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full px-4 sm:px-8 lg:px-14 pb-14"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="bg-[#4B6BB6] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-xl relative overflow-hidden border border-white/20">
          
          {/* Subtle Ambient Shapes */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#153FD4]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-5 text-sm font-semibold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#D4C79C]" />
              <span>Our Mission</span>
            </div>

            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white mb-6">
              Empowering the World's Creative Minds
            </h2>

            {/* Paragraph matching Figma spec */}
            <p className="font-poppins font-normal text-lg sm:text-xl lg:text-[22px] leading-relaxed text-white/95 mb-8">
              Lumina is an online learning platform that offers courses, tutorials, and resources for creative professionals and enthusiasts. We connect ambitious creators with industry leaders in UI/UX, filmmaking, graphic design, motion arts, and photography.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-4 border-t border-white/20">
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-[#D4C79C]" />
                </div>
                <h4 className="font-poppins font-semibold text-base">Project-Driven</h4>
                <p className="text-xs text-white/80 mt-1">Build portfolio-ready pieces with every course module.</p>
              </div>

              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                  <Layers className="w-6 h-6 text-[#D4C79C]" />
                </div>
                <h4 className="font-poppins font-semibold text-base">Expert Mentors</h4>
                <p className="text-xs text-white/80 mt-1">Direct feedback from working art directors and artists.</p>
              </div>

              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-[#D4C79C]" />
                </div>
                <h4 className="font-poppins font-semibold text-base">Global Community</h4>
                <p className="text-xs text-white/80 mt-1">Join 190,000+ creators sharing critiques and opportunities.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.section>
  );
};
