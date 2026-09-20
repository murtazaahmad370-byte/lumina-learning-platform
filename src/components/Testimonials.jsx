import React, { useRef } from 'react';
import { testimonials } from '../data/testimonialsData';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 pb-20">
      <div className="max-w-[1320px] mx-auto bg-gradient-to-b from-[#4B6BB6] to-[#D4C79C]/25 rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <span className="text-white/80 font-poppins text-xs uppercase tracking-widest font-semibold block mb-1">
              Community Voices
            </span>
            <h2 className="font-opensans font-bold text-2xl sm:text-3xl lg:text-[34px] text-white tracking-tight">
              See what people think about Lumina
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#4B6BB6] backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#4B6BB6] backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel Track (Scrollbar hidden) */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x scroll-smooth"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] sm:min-w-[360px] max-w-[380px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col justify-between snap-start transform hover:-translate-y-1 transition-all duration-300 border border-slate-100"
            >
              {/* Top Accent Cap in #4B6BB6 matching Figma Rectangle 20 */}
              <div className="bg-[#4B6BB6] p-6 pb-10 flex items-center justify-between text-white relative">
                <div className="flex items-center gap-1 text-[#D4C79C]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4C79C]" />
                  ))}
                </div>
                <span className="text-xs font-poppins font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* Card Body with Overlapping Avatar */}
              <div className="p-6 pt-0 relative flex flex-col flex-1 justify-between -mt-7">
                
                {/* User Avatar with White Border */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-opensans font-bold text-lg text-[#131720]">
                      {item.name}
                    </h4>
                    <p className="font-opensans text-xs text-[#737B8C]">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Testimonial Quote matching Figma text styling */}
                <div className="relative pl-1 pr-1 pb-2">
                  <p className="font-opensans font-normal text-sm sm:text-[15px] leading-relaxed text-[#131720]/90 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom Quote Mark Icon */}
                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <Quote className="w-5 h-5 text-[#4B6BB6]/30" />
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
