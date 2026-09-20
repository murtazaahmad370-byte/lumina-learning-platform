import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Video, Users2, ArrowUpRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Build your skill',
    desc: 'Design, create, and advance your career',
    icon: Sparkles,
    delay: 0
  },
  {
    id: 2,
    title: 'Expert courses',
    desc: 'Learn from industry professionals',
    icon: GraduationCap,
    delay: 0.08
  },
  {
    id: 3,
    title: 'Live events',
    desc: 'Join workshops and creative sessions',
    icon: Video,
    delay: 0.16
  },
  {
    id: 4,
    title: 'Creative community',
    desc: 'Connect, share and grow together',
    icon: Users2,
    delay: 0.24
  }
];

export const FeatureCards = ({ onCardClick }) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 pb-12">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: item.delay, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCardClick && onCardClick(item.title)}
                className="group relative bg-[#4B6BB6] hover:bg-[#3d599b] text-white p-4 sm:p-5 rounded-[18px] border border-white/35 shadow-lg flex items-center gap-4 transition-colors duration-200 cursor-pointer"
              >
                {/* Circular Golden Badge with Icon */}
                <div className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-[#D4C79C] border border-white/80 flex items-center justify-center text-[#4B6BB6] shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-semibold text-lg lg:text-xl text-white tracking-tight leading-snug truncate">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="font-montserrat text-xs text-white/90 leading-tight mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
