import React, { useState } from 'react';
import { 
  X, 
  Play, 
  CheckCircle2, 
  Clock, 
  Users, 
  Star, 
  Award, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Video,
  FileText
} from 'lucide-react';

export const CourseModal = ({ course, onClose, onEnroll, onWatchCourse }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  if (!course) return null;

  const handleEnroll = () => {
    setEnrolled(true);
    setTimeout(() => {
      onEnroll && onEnroll(course);
    }, 800);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[90vh]"
      >
        
        {/* Modal Top Media Area */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden flex-shrink-0">
          {isPlaying ? (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#4B6BB6] flex items-center justify-center mb-3 animate-pulse">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-poppins font-bold text-lg">
                Previewing: {course.title}
              </h4>
              <p className="text-xs text-white/70 mt-1 max-w-md">
                Stream sample lesson with {course.instructor}. Full high-definition modules unlock upon enrollment.
              </p>
              <button
                onClick={() => setIsPlaying(false)}
                className="mt-4 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-semibold"
              >
                Exit Preview
              </button>
            </div>
          ) : (
            <>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#4B6BB6]/90 hover:bg-[#4B6BB6] text-white shadow-xl backdrop-blur-md transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span className="font-poppins font-semibold text-sm">Watch Free Intro (3:45)</span>
                </button>
              </div>

              {/* Top Tags */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 text-[#131720] text-xs font-inter font-semibold shadow-sm">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#4B6BB6] text-white text-xs font-inter font-bold shadow-sm">
                  {course.price}
                </span>
              </div>
            </>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          
          {/* Header Title & Instructor */}
          <div>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#131720] leading-snug">
              {course.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#737B8C]">
              <span>Taught by <strong className="text-[#131720]">{course.instructor}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#4B6BB6] font-semibold">
                <Star className="w-4 h-4 fill-[#4B6BB6]" />
                {course.rating} ({course.reviews || '5,200'} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.students} students
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-poppins font-semibold text-base text-[#131720] mb-2">
              Course Overview
            </h3>
            <p className="font-inter text-sm text-[#737B8C] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h3 className="font-poppins font-semibold text-base text-[#131720] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#4B6BB6]" />
              <span>Key Learning Modules</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {(course.syllabus || [
                'Core Foundations & Project Setup',
                'Hands-On Industry Workflows & Techniques',
                'Advanced Creative Composition & Polish',
                'Final Capstone Project & Portfolio Review'
              ]).map((module, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-inter text-[#131720]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#4B6BB6]/15 text-[#4B6BB6] font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <span className="flex-1 font-medium">{module}</span>
                  <FileText className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Included Features */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-inter text-[#131720]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-[#131720]">
              <Award className="w-4 h-4 text-[#4B6BB6]" />
              <span>Shareable Certificate Included</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-inter text-[#131720]">
              <Clock className="w-4 h-4 text-[#4B6BB6]" />
              <span>Lifetime Full Access</span>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 gap-4 mt-auto">
            <div>
              <span className="text-xs font-inter text-[#737B8C] block">Total Course Fee</span>
              <span className="font-poppins font-bold text-3xl text-[#4B6BB6]">
                {course.price}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#131720] text-sm font-semibold transition-colors"
              >
                Close
              </button>
              
              <button
                onClick={() => onWatchCourse && onWatchCourse(course)}
                className="px-6 py-3.5 rounded-full bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-[#4B6BB6]/25 hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch in Player</span>
              </button>

              <button
                onClick={handleEnroll}
                disabled={enrolled}
                className={`px-7 py-3.5 rounded-full font-poppins font-bold text-sm text-white shadow-lg flex items-center gap-2 transition-all duration-200 ${
                  enrolled 
                    ? 'bg-emerald-600 cursor-default' 
                    : 'bg-[#4B6BB6] hover:bg-[#385396] shadow-[#4B6BB6]/40 transform hover:scale-[1.02]'
                }`}
              >
                {enrolled ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enrolled!</span>
                  </>
                ) : (
                  <>
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
