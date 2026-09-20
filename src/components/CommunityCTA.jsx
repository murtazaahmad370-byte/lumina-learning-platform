import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, UserPlus } from 'lucide-react';

export const CommunityCTA = ({ onOpenAuth }) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 pb-20">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-6">
        
        {/* Banner 1: 'Join a community, not just a classroom' */}
        <div className="bg-[#4B6BB6] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="font-opensans font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white mb-3">
                Join a community, not just a classroom
              </h2>
              <p className="font-poppins text-base sm:text-lg text-white/90 max-w-xl">
                Collaborate on live briefs, participate in weekly critique sessions, and join live workshops with fellow creatives across the globe.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white/40 h-32 sm:h-36">
                <img 
                  src="/images/community-study.jpg" 
                  alt="Community Study Circle"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white/40 h-32 sm:h-36">
                <img 
                  src="/images/live-workshop-seminar.jpg" 
                  alt="Live Workshop Seminar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banner 2: White Registration Card matching Figma 'coniner' & 'button sign in' */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
          
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#153FD4] flex items-center justify-center mb-6 shadow-sm">
            <UserPlus className="w-7 h-7" />
          </div>

          <h3 className="font-opensans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#131720] tracking-tight mb-2">
            Register for a free account
          </h3>

          <p className="font-poppins text-base sm:text-lg text-[#737B8C] max-w-lg mb-8">
            Get instant access to free intro courses, community events, and monthly creative design assets.
          </p>

          {/* Perks list */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 text-sm font-inter font-medium text-[#131720]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Instant course previews
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Access to Discord community
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#153FD4] hover:bg-[#1030a8] text-white font-opensans font-semibold text-lg shadow-[0px_6px_25px_rgba(21,63,212,0.4)] flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <span>Sign up now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#131720] font-opensans font-semibold text-lg transition-all duration-200"
            >
              Sign in to Lumina
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
