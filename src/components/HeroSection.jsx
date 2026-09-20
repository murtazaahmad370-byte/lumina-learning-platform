import React from 'react';
import { Link2, Compass } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const HeroSection = ({ onOpenAuth, onExploreClick }) => {
  return (
    <section className="relative w-full overflow-hidden pt-6 pb-14 lg:pt-10 lg:pb-20 px-4 sm:px-8 lg:px-14 transition-colors">
      
      {/* Ambient Glow — blue only, no amber */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#4B6BB6]/15 dark:bg-[#4B6BB6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#6B8BD6]/10 dark:bg-[#385396]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          
          {/* Headline — original colors */}
          <h1 className="font-poppins text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] text-[#131720] dark:text-white leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
            <span className="font-normal">a </span>
            <span className="font-bold text-[#4B6BB6]">learning</span><br />
            <span className="font-bold text-[#131720] dark:text-white">platform </span>
            <span className="font-bold text-[#131720] dark:text-white">for</span><br />
            <span className="font-bold text-[#4B6BB6]">creative </span>
            <span className="font-normal text-[#131720] dark:text-white">minds</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins font-medium text-base sm:text-lg text-[#385396] dark:text-[#6B8BD6] max-w-md leading-relaxed mb-6">
            Discover courses, join events, and connect with a community that inspires you.
          </p>

          {/* CTA Buttons — pure blue, no amber */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <button
              onClick={() => onOpenAuth('signup')}
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#4B6BB6] hover:bg-[#385396] dark:bg-[#385396] dark:hover:bg-[#4B6BB6] text-white font-montserrat font-bold text-lg rounded-full shadow-[0px_8px_32px_rgba(75,107,182,0.5)] transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>join for free</span>
              <Link2 className="w-5 h-5 text-white stroke-[2.5] group-hover:rotate-45 transition-transform duration-300" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/70 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-[#131720] dark:text-white font-montserrat font-bold text-sm rounded-full shadow-sm border border-white dark:border-slate-700 transition-all"
            >
              <Compass className="w-4 h-4 text-[#4B6BB6]" />
              <span>Explore Courses</span>
            </button>
          </div>

          {/* Software Ecosystem Icons */}
          <div className="flex items-center gap-3.5 mb-8 p-2.5 rounded-2xl bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-slate-700">
            {/* Figma */}
            <div title="Figma" className="w-11 h-11 rounded-full flex items-center justify-center shadow-[0_6px_22px_rgba(242,78,30,0.35)] hover:scale-110 transition-transform cursor-pointer overflow-hidden bg-white">
              <img src="/images/icon-figma.png" alt="Figma" className="w-full h-full object-cover" />
            </div>

            {/* Photoshop */}
            <div title="Adobe Photoshop" className="w-11 h-11 rounded-full flex items-center justify-center shadow-[0_6px_22px_rgba(49,168,255,0.4)] hover:scale-110 transition-transform cursor-pointer overflow-hidden bg-white">
              <img src="/images/icon-photoshop.png" alt="Photoshop" className="w-full h-full object-cover" />
            </div>

            {/* Picsart */}
            <div title="Picsart" className="w-11 h-11 rounded-full flex items-center justify-center shadow-[0_6px_22px_rgba(255,42,127,0.35)] hover:scale-110 transition-transform cursor-pointer overflow-hidden bg-white">
              <img src="/images/icon-picsart.png" alt="Picsart" className="w-full h-full object-cover" />
            </div>

            {/* Leonardo AI — crisp, centered, matching header style */}
            <div title="Leonardo AI" className="w-11 h-11 rounded-full flex items-center justify-center shadow-[0_6px_22px_rgba(168,85,247,0.4)] hover:scale-110 transition-transform cursor-pointer overflow-hidden bg-white">
              <img src="/images/icon-leonardo.png" alt="Leonardo AI" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-poppins font-medium text-sm text-[#385396] dark:text-[#6B8BD6]">
              join thousand of creators
            </span>
            <div className="flex items-center -space-x-2.5">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Creator" className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Creator" className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Creator" className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Creator" className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm" />
            </div>
            <span className="font-poppins font-bold text-xl text-[#385396] dark:text-[#6B8BD6]">
              +<AnimatedCounter target={25} suffix="k" duration={2000} />
            </span>
          </div>

        </div>

        {/* ── RIGHT COLUMN: Student PNG ── */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] lg:min-h-[520px]">
          <div className="relative w-full max-w-[580px] flex justify-center items-center">
            <img 
              src="/images/hero-student.png" 
              alt="Creative Student with Laptop" 
              className="w-full h-auto object-contain max-h-[500px] lg:max-h-[580px] drop-shadow-2xl select-none transform hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

      </div>

    </section>
  );
};
