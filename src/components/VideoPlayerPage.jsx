import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  Globe, 
  Headphones, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText, 
  Send, 
  ArrowLeft, 
  Clock, 
  Check, 
  Lightbulb, 
  HelpCircle, 
  Settings as SettingsIcon,
  ChevronRight,
  FolderArchive,
  Subtitles,
  Tv,
  ListVideo
} from 'lucide-react';
import { Footer } from './Footer';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import { courseVideoMap } from '../data/courseVideoMap';

const fallbackSections = [
  {
    id: 1,
    title: 'Section 01: Introduction & Fundamentals',
    lessons: [
      { id: '01', title: 'Course Overview & Setup', duration: '12:30', completed: true, videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', about: 'Welcome to this masterclass! We cover development environment, toolchain, and roadmaps.' },
      { id: '02', title: 'Core Concepts & Mental Models', duration: '18:40', completed: false, videoUrl: 'https://www.youtube.com/watch?v=ZVnjOPwW4G8', about: 'Understand architectural paradigms, key patterns, and best practices.' }
    ]
  }
];

const defaultResourcesList = [
  { name: 'Course Starter Code & Cheatsheet (ZIP)', size: '4.5 MB', type: 'zip' },
  { name: 'Architecture Reference Manual (PDF)', size: '1.8 MB', type: 'pdf' },
  { name: 'Practice Exercises & Solutions (ZIP)', size: '8.2 MB', type: 'zip' }
];

export const VideoPlayerPage = ({ course, onBackToLanding, onNavigate }) => {
  const { darkMode } = useTheme();

  // Video element refs
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  const courseId = String(course?.id || 'web-1');
  const courseData = courseVideoMap[courseId] || courseVideoMap['web-1'] || {};
  const currentSections = courseData.sections || fallbackSections;
  const currentResources = courseData.resources || defaultResourcesList;
  const currentLearningTip = courseData.learningTip || "Practice each concept directly in your IDE or workspace to build real mastery.";
  const currentCourseTitle = course?.title || courseData.title || 'Course Masterclass';

  // Active lesson and sections
  const [openSections, setOpenSections] = useState([1, 2]);
  const [activeLesson, setActiveLesson] = useState(() => {
    const sec = (courseVideoMap[course?.id]?.sections || currentSections)[0];
    return sec?.lessons?.[0] || currentSections[0].lessons[0];
  });

  useEffect(() => {
    const targetMap = courseVideoMap[course?.id] || courseVideoMap['web-1'];
    const newSecs = targetMap?.sections || currentSections;
    if (newSecs && newSecs.length > 0 && newSecs[0].lessons && newSecs[0].lessons.length > 0) {
      setActiveLesson(newSecs[0].lessons[0]);
      setOpenSections(newSecs.map(s => s.id));
    }
  }, [course?.id]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaylistMode, setIsPlaylistMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(405); // 06:45
  const [duration, setDuration] = useState(1425); // 23:45
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Audio Language State
  const defaultLanguage = courseData.primaryLanguage || course?.language || 'English';
  const [audioLang, setAudioLang] = useState(defaultLanguage);
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(null);
  const [selectedLanguageStream, setSelectedLanguageStream] = useState(null);
  const audioTrackRef = useRef(null);

  useEffect(() => {
    const lang = courseVideoMap[course?.id]?.primaryLanguage || course?.language || 'English';
    setAudioLang(lang);
    setSelectedLanguageStream(null);
  }, [course?.id, course?.language]);

  // Student notes
  const [studentNote, setStudentNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const audioOptions = [
    { id: 'English', name: 'English', flag: '🇬🇧' },
    { id: 'Urdu', name: 'Urdu', flag: '🇵🇰' },
    { id: 'Hindi', name: 'Hindi', flag: '🇮🇳' },
    { id: 'Pashto', name: 'Pashto', flag: '🇵🇰' },
    { id: 'Punjabi', name: 'Punjabi', flag: '🇵🇰' },
    { id: 'Sindhi', name: 'Sindhi', flag: '🇵🇰' }
  ];

  const resourcesList = [
    { name: 'Tools Panel Guide (PDF)', size: '1.2 MB', type: 'pdf' },
    { name: 'Photoshop Tools Cheat Sheet', size: '780 KB', type: 'pdf' },
    { name: 'Practice File (ZIP)', size: '12.4 MB', type: 'zip' },
    { name: 'Keyboard Shortcuts (PDF)', size: '1.1 MB', type: 'pdf' }
  ];

  // Video playback handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 1425);
    }
  };

  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipSeconds = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleSpeedChange = (spd) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = spd;
    }
    setPlaybackSpeed(spd);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSelectAudio = (langName) => {
    setAudioLang(langName);
    setIsAudioMenuOpen(false);

    // Stop any separate audio track currently playing
    if (audioTrackRef.current) {
      audioTrackRef.current.pause();
    }

    // 1. Check if course or lesson has a direct video stream in that language
    const langStream = activeLesson?.languagesMap?.[langName] || courseData?.languagesMap?.[langName];
    if (langStream) {
      setSelectedLanguageStream(langStream);
      setAudioFeedback(`Audio switched to ${langName} • Other audio muted`);
    } else {
      setSelectedLanguageStream(null);
      const primary = courseData.primaryLanguage || 'English';
      if (langName.toLowerCase().includes(primary.toLowerCase()) || primary.toLowerCase().includes(langName.toLowerCase())) {
        setAudioFeedback(`Audio: Original ${langName} voice track active`);
      } else {
        setAudioFeedback(`Audio: ${langName} Voice Track active • Other audio muted`);
      }
    }

    // Speech audio feedback for browser voice
    try {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const msgText = langName === 'Urdu' 
          ? 'Urdu audio track active ho gaya hai.' 
          : `${langName} audio track activated.`;
        const utterance = new SpeechSynthesisUtterance(msgText);
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      // ignore
    }

    setTimeout(() => setAudioFeedback(null), 4000);
  };

  // Load note from storage when lesson changes
  useEffect(() => {
    const saved = localStorage.getItem(`lumina_note_${courseId}_${activeLesson?.id}`);
    if (saved) {
      setStudentNote(saved);
    } else {
      setStudentNote('');
    }
  }, [courseId, activeLesson?.id]);

  const handleNoteChange = (text) => {
    setStudentNote(text);
    if (activeLesson?.id) {
      localStorage.setItem(`lumina_note_${courseId}_${activeLesson.id}`, text);
    }
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const allLessons = currentSections.flatMap(s => s.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const currentProgressPercent = Math.round(((Math.max(0, currentIndex) + 1) / (allLessons.length || 1)) * 100);

  const handleNextLesson = async () => {
    if (nextLesson) {
      handleSelectLesson(nextLesson);
    }
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const completedCount = Math.min(allLessons.length, currentIndex + 2);
        const percent = Math.round((completedCount / (allLessons.length || 1)) * 100);
        await supabase.from('enrollments').upsert({
          user_id: user.id,
          course_id: courseId,
          course_title: currentCourseTitle,
          course_image: course?.image || '/images/ui-ux-design.png',
          course_badge: course?.badge || 'Course',
          course_badge_color: course?.badgeColor || 'bg-[#001E36] text-[#31A8FF] border border-[#31A8FF]/40',
          completed_lessons: completedCount,
          total_lessons: allLessons.length,
          progress: percent,
          last_watched_at: new Date().toISOString(),
          is_completed: percent >= 100
        }, { onConflict: 'user_id,course_id' });
      }
    } catch (e) {
      // ignore
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      handleSelectLesson(prevLesson);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleSection = (secId) => {
    setOpenSections((prev) => 
      prev.includes(secId) ? prev.filter((id) => id !== secId) : [...prev, secId]
    );
  };

  const handleSelectLesson = (lesson) => {
    setActiveLesson(lesson);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }, 200);
    }
  };

  const getYouTubeEmbedUrl = (url, forcePlaylist = false) => {
    if (!url) return null;
    try {
      const listMatch = url.match(/[?&]list=([^#&?]+)/);
      const vMatch = url.match(/[?&]v=([^#&?]+)/);
      const idxMatch = url.match(/[?&]index=([0-9]+)/);
      const startMatch = url.match(/[?&](?:t|start)=([0-9]+)/);
      const shortMatch = url.includes('youtu.be/') ? url.split('youtu.be/')[1]?.split(/[?#&]/)[0] : null;
      
      const videoId = vMatch ? vMatch[1] : shortMatch;
      const playlistId = listMatch ? listMatch[1] : (courseData?.playlistId || null);

      const params = new URLSearchParams();
      params.set('autoplay', '1');
      params.set('rel', '0');
      params.set('modestbranding', '1');
      params.set('enablejsapi', '1');

      if (startMatch && startMatch[1]) {
        params.set('start', startMatch[1]);
      }

      if (forcePlaylist && playlistId) {
        return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&${params.toString()}`;
      }

      if (videoId && playlistId) {
        if (idxMatch && idxMatch[1]) {
          params.set('index', idxMatch[1]);
        }
        return `https://www.youtube-nocookie.com/embed/${videoId}?list=${playlistId}&${params.toString()}`;
      }

      if (playlistId && !videoId) {
        return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&${params.toString()}`;
      }

      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const currentVideoUrl = isPlaylistMode && courseData?.playlistUrl 
    ? courseData.playlistUrl 
    : (selectedLanguageStream || activeLesson?.videoUrl || courseData?.playlistUrl);

  const youtubeEmbedUrl = getYouTubeEmbedUrl(currentVideoUrl, isPlaylistMode);

  return (
    <div className="min-h-screen bg-[#D4C79C] dark:bg-[#0E131F] text-[#131720] dark:text-white transition-colors duration-300 flex flex-col font-sans">
      
      {/* ── TOP BREADCRUMB BAR ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs font-inter text-slate-600 dark:text-slate-400 truncate">
            <button onClick={() => onNavigate && onNavigate('my-learning')} className="hover:text-[#4B6BB6] transition-colors">
              My Learning
            </button>
            <span>›</span>
            <button onClick={() => onNavigate && onNavigate('course-details')} className="hover:text-[#4B6BB6] transition-colors truncate">
              {currentCourseTitle}
            </button>
            <span>›</span>
            <span className="font-semibold text-[#131720] dark:text-white shrink-0">
              Lesson {activeLesson.id}
            </span>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('course-details') : onBackToLanding && onBackToLanding()}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-poppins font-bold text-[#4B6BB6] dark:text-[#6B8BD6] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </button>

        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER WITH SIDEBAR & PLAYER ── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pb-20 flex-1 flex flex-col lg:flex-row items-start gap-8">
        
        {/* ── LEFT COLUMN: COURSE CURRICULUM SIDEBAR ── */}
        <aside className="w-full lg:w-80 shrink-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-5">
          
          {/* Progress Header */}
          <div>
            <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
              Course Curriculum
            </h3>
            <span className="font-poppins font-bold text-xs text-[#4B6BB6] dark:text-[#6B8BD6] block mt-1">
              {currentProgressPercent}% Complete
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-1.5">
              <div className="bg-[#4B6BB6] h-full rounded-full transition-all duration-300" style={{ width: `${currentProgressPercent}%` }} />
            </div>
          </div>

          {/* Sections Accordion List */}
          <div className="flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1">
            {currentSections.map((sec) => {
              const isOpen = openSections.includes(sec.id);
              return (
                <div key={sec.id} className="border border-slate-100 dark:border-slate-700/60 rounded-2xl overflow-hidden">
                  
                  {/* Section Title Header */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full p-3.5 bg-slate-50/70 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-between text-left"
                  >
                    <span className="font-poppins font-bold text-xs text-[#131720] dark:text-white">
                      {sec.title}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  {/* Section Lessons List */}
                  {isOpen && (
                    <div className="flex flex-col p-1.5 bg-white dark:bg-slate-800">
                      {sec.lessons.map((les) => {
                        const isActive = activeLesson.id === les.id;
                        return (
                          <div
                            key={les.id}
                            onClick={() => handleSelectLesson(les)}
                            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                              isActive 
                                ? 'bg-[#4B6BB6]/15 text-[#4B6BB6] dark:text-[#6B8BD6] font-semibold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isActive ? (
                                <div className="w-5 h-5 rounded-full bg-[#4B6BB6] text-white flex items-center justify-center shrink-0">
                                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                                </div>
                              ) : les.completed ? (
                                <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              ) : (
                                <span className="w-5 text-[11px] font-mono text-slate-400 text-center shrink-0">
                                  {les.id}
                                </span>
                              )}

                              <div className="truncate">
                                <span className="text-xs truncate block">
                                  {les.title}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {les.duration}
                                </span>
                              </div>
                            </div>

                            {les.completed && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Download Resources Pill Action */}
          <button 
            onClick={() => alert(`Downloading resources for ${currentCourseTitle}...`)}
            className="w-full py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#4B6BB6] hover:text-[#4B6BB6] text-xs font-poppins font-semibold text-[#131720] dark:text-white flex items-center justify-between transition-colors shadow-sm mt-auto"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#4B6BB6]" />
              <div className="text-left">
                <span className="block font-bold">Download Resources</span>
                <span className="text-[10px] text-slate-400">All course resources</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

        </aside>

        {/* ── RIGHT COLUMN: VIDEO PLAYER & LESSON INTERACTION ── */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Lesson Header with Prev / Next Navigation & Playlist Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-poppins font-bold text-xl sm:text-2xl text-[#131720] dark:text-white tracking-tight">
                {isPlaylistMode ? `Full Playlist: ${currentCourseTitle}` : `Lesson ${activeLesson.id}: ${activeLesson.title}`}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-poppins font-semibold bg-[#4B6BB6]/15 text-[#4B6BB6] dark:text-[#6B8BD6]">
                  🌐 Language: {courseData.languages || courseData.primaryLanguage || 'English'}
                </span>
                {isPlaylistMode && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-poppins font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    📑 Full Playlist Mode Active
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <button
                onClick={() => setIsPlaylistMode(!isPlaylistMode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-poppins font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                  isPlaylistMode
                    ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500 shadow-amber-500/25'
                    : 'bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-[#4B6BB6]'
                }`}
                title="Toggle between Lesson Video and Full YouTube Playlist"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>{isPlaylistMode ? '🎬 Lesson Mode' : '📑 Full Playlist'}</span>
              </button>

              <button 
                onClick={handlePrevLesson}
                disabled={!prevLesson || isPlaylistMode}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-xs font-poppins font-semibold text-[#131720] dark:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ‹ Previous
              </button>
              <button 
                onClick={handleNextLesson}
                disabled={isPlaylistMode}
                className="px-5 py-2 rounded-xl bg-[#4B6BB6] hover:bg-[#385396] text-white text-xs font-poppins font-bold transition-all shadow-md shadow-[#4B6BB6]/25 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {nextLesson ? 'Next Lesson ›' : 'Complete Course 🎉'}
              </button>
            </div>
          </div>

          {/* ── VIDEO PLAYER CONTAINER ── */}
          <div 
            ref={playerContainerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20 group select-none"
          >
            {/* Video Rendering: YouTube Iframe or HTML5 Video */}
            {youtubeEmbedUrl ? (
              <iframe
                key={youtubeEmbedUrl}
                src={youtubeEmbedUrl}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={activeLesson.videoUrl}
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="w-full h-full object-contain cursor-pointer"
                  playsInline
                />

                {/* Center Large Play Icon when paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px]"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/90 text-[#4B6BB6] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-9 h-9 fill-[#4B6BB6] ml-1.5" />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Floating Audio Language Selector at Top Left */}
            <div className="absolute top-4 left-4 z-30">
              <div className="relative">
                <button
                  onClick={() => setIsAudioMenuOpen(!isAudioMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-poppins font-semibold border border-white/20 shadow-lg transition-all"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#4B6BB6]" />
                  <span>Audio: <strong>{audioLang}</strong></span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Dropdown Menu matching screenshot */}
                {isAudioMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-40 flex flex-col gap-1 animate-fadeIn">
                    <span className="font-poppins font-bold text-[10px] uppercase text-slate-400 px-3 py-1">
                      Select Audio Track
                    </span>
                    {audioOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectAudio(opt.name)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-inter transition-colors text-left ${
                          audioLang === opt.name
                            ? 'bg-[#4B6BB6] text-white font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{opt.flag}</span>
                          <span>{opt.name}</span>
                        </div>
                        {audioLang === opt.name && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Audio Feedback Badge */}
            {audioFeedback && (
              <div className="absolute top-4 right-4 z-30 bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-xs font-poppins font-semibold shadow-lg animate-fadeIn flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{audioFeedback}</span>
              </div>
            )}

            {/* Bottom Controls Bar (only shown for HTML5 video) */}
            {!youtubeEmbedUrl && (
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2 transition-opacity">
              
              {/* Scrubber Progress Bar */}
              <div 
                onClick={handleScrub}
                className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all flex items-center group/bar"
              >
                <div 
                  className="bg-[#4B6BB6] h-full rounded-full relative"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                </div>
              </div>

              {/* Bottom Buttons Row */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                
                {/* Left Playback controls */}
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="hover:text-[#4B6BB6] transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button onClick={() => skipSeconds(10)} className="hover:text-[#4B6BB6] transition-colors" title="Forward 10s">
                    <RotateCw className="w-4 h-4" />
                  </button>

                  <button onClick={toggleMute} className="hover:text-[#4B6BB6] transition-colors">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* Playback speed button */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 font-mono text-xs"
                    >
                      {playbackSpeed}x
                    </button>

                    {showSpeedMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-slate-900 border border-white/20 rounded-xl p-1 flex flex-col text-xs shadow-xl">
                        {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleSpeedChange(s)}
                            className={`px-3 py-1 rounded-lg text-left ${playbackSpeed === s ? 'bg-[#4B6BB6] text-white font-bold' : 'hover:bg-white/10'}`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="hover:text-[#4B6BB6] transition-colors" title="Subtitles / CC">
                    <Subtitles className="w-4 h-4" />
                  </button>

                  <button className="hover:text-[#4B6BB6] transition-colors" title="Settings">
                    <SettingsIcon className="w-4 h-4" />
                  </button>

                  <button onClick={toggleFullscreen} className="hover:text-[#4B6BB6] transition-colors" title="Fullscreen">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
            )}

          </div>

          {/* ── ABOUT THIS LESSON & LEARNING TIP ── */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row gap-6 items-start justify-between">
            <div className="flex-1">
              <h2 className="font-poppins font-bold text-base sm:text-lg text-[#131720] dark:text-white mb-2">
                About this lesson
              </h2>
              <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {activeLesson.about || `In this lesson, you will master ${activeLesson.title} in ${currentCourseTitle}. Follow along with the instructor step-by-step to gain real-world practical experience.`}
              </p>

              <h3 className="font-poppins font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                In this lesson you'll learn:
              </h3>
              <div className="flex flex-col gap-2 text-xs font-inter text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                  <span>Key fundamentals of {activeLesson.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                  <span>Practical application & code walkthrough</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                  <span>Industry best practices & optimization techniques</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4B6BB6] shrink-0" />
                  <span>Hands-on mini exercise to test your understanding</span>
                </div>
              </div>
            </div>

            {/* Learning Tip Card */}
            <div className="w-full lg:w-72 bg-[#FAF7EF] dark:bg-slate-900/60 rounded-2xl p-5 border border-[#D4C79C]/40 dark:border-slate-700 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="font-poppins font-bold text-xs text-[#131720] dark:text-white">
                  Learning Tip
                </h4>
              </div>
              <p className="font-inter text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentLearningTip}
              </p>
            </div>
          </div>

          {/* ── RESOURCES & ADD A NOTE (TWO COLUMNS) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Resources Box */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-3">
              <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                Resources
              </h3>

              <div className="flex flex-col gap-2.5">
                {currentResources.map((res, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-poppins font-semibold text-xs text-[#131720] dark:text-white block">
                          {res.name}
                        </span>
                        <span className="font-inter text-[10px] text-slate-400">
                          {res.size}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Downloading ${res.name}...`)}
                      className="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-[#4B6BB6] transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add A Note Notepad */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-3">
              <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                Add a Note
              </h3>

              <textarea 
                rows="6"
                placeholder="Write your notes about this lesson..."
                value={studentNote}
                onChange={(e) => handleNoteChange(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-inter text-[#131720] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B6BB6] resize-none"
              />

              <div className="flex items-center justify-between text-[11px] font-inter text-slate-400 pt-1">
                <span>📄 Your notes will be saved automatically.</span>
                {noteSaved && <span className="text-emerald-500 font-semibold">Saved!</span>}
              </div>
            </div>

          </div>

          {/* ── BOTTOM HELP & LESSON PROGRESS BANNER ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm">
            
            {/* Need Help */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#131720] dark:text-white">
                    Need Help?
                  </h4>
                  <p className="font-inter text-xs text-slate-500 dark:text-slate-400">
                    Stuck on something? Get help from our community or instructor.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => alert('Community support modal opened!')}
                className="px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#4B6BB6] text-[#4B6BB6] text-xs font-poppins font-semibold shrink-0"
              >
                Ask a Question
              </button>
            </div>

            {/* Lesson Progress */}
            <div className="flex flex-col gap-1.5 md:border-l md:border-slate-100 md:dark:border-slate-700 md:pl-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-poppins font-bold text-[#131720] dark:text-white">
                  Course Progress
                </span>
                <span className="font-inter font-bold text-[#4B6BB6]">
                  {currentProgressPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#4B6BB6] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${currentProgressPercent}%` }} 
                />
              </div>
              <span className="font-inter text-[11px] text-slate-400">
                Lesson {currentIndex + 1} of {allLessons.length} lessons
              </span>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
