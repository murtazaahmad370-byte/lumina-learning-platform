import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Menu, X, Moon, Sun, Bell, Globe, ChevronDown,
  BookOpen, Settings as SettingsIcon, LogOut, Play,
  UserCircle, Sparkles, GraduationCap, Home, Compass
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ 
  currentView, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery,
  onOpenAuth,
  onOpenPlayer,
  onNavigateCourses,
  onNavigateMyLearning,
  onNavigateSettings,
  onNavigate,
  isLoggedIn = false,
  user,
  onLogout
}) => {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [currentLang, setCurrentLang] = useState('Urdu');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { id: 'explore', label: 'explore', sectionId: null, icon: Home },
    { id: 'courses', label: 'courses', sectionId: 'courses-section', icon: GraduationCap },
    { id: 'events', label: 'events', sectionId: 'trending-section', icon: Sparkles },
    { id: 'about', label: 'about', sectionId: 'about-section', icon: Compass },
  ];

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active tab on scroll
  useEffect(() => {
    const onScroll = () => {
      if (currentView !== 'landing') return;
      const y = window.scrollY + 200;
      const about = document.getElementById('about-section');
      const trending = document.getElementById('trending-section');
      const courses = document.getElementById('courses-section');
      if (about && y >= about.offsetTop) setActiveTab('about');
      else if (trending && y >= trending.offsetTop) setActiveTab('events');
      else if (courses && y >= courses.offsetTop) setActiveTab('courses');
      else setActiveTab('explore');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentView]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileMenu(false);
        setShowLangMenu(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const goTo = (view, sectionId = null) => {
    setMobileMenuOpen(false);
    setShowProfileMenu(false);
    if (view === 'my-learning' && onNavigateMyLearning) { onNavigateMyLearning(); return; }
    if (view === 'settings' && onNavigateSettings) { onNavigateSettings(); return; }
    if (view === 'courses' && onNavigateCourses) { onNavigateCourses(); return; }
    if (view === 'player' && onOpenPlayer) { onOpenPlayer(); return; }
    if (onNavigate) onNavigate(view);
    else if (setCurrentView) setCurrentView(view);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (item) =>
    (currentView === 'landing' && activeTab === item.id) ||
    (currentView === 'courses' && item.id === 'courses') ||
    (currentView === 'my-learning' && item.id === 'my-learning');

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 
      bg-white/96 dark:bg-[#0E131F]/96 backdrop-blur-xl
      ${scrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/30 border-b border-slate-200/60 dark:border-slate-800/60' : 'border-b border-transparent'}`}>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center gap-3">

        {/* ── LOGO ── */}
        <div 
          onClick={() => goTo('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="relative">
            <img 
              src="/images/lumina-logo.png" 
              alt="lumina" 
              className="w-9 h-9 rounded-full object-cover shadow-md group-hover:shadow-[#4B6BB6]/40 transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0E131F] animate-pulse" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-poppins font-bold text-lg tracking-tight text-[#131720] dark:text-white group-hover:text-[#4B6BB6] transition-colors">
              lumina
            </span>
            <span className="font-inter text-[9px] tracking-widest text-[#4B6BB6] font-semibold uppercase -mt-0.5">
              Creative Lab
            </span>
          </div>
        </div>

        {/* ── DESKTOP NAV ── */}
        <nav className="hidden lg:flex items-center gap-1.5 ml-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id === 'courses' ? 'courses' : 'landing', item.sectionId)}
              style={isActive(item) ? { background: 'linear-gradient(96.41deg, #4B6BB6 2.43%, #D4C79C 92.59%)' } : {}}
              className={`rounded-full font-montserrat font-bold italic text-sm transition-all duration-200 tracking-wide ${
                isActive(item)
                  ? 'px-6 py-2 text-white shadow-sm hover:opacity-95'
                  : 'px-4 py-2 text-[#4B6BB6] dark:text-[#6B8BD6] hover:bg-slate-100 dark:hover:bg-slate-800/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── SEARCH BAR (center flex) ── */}
        <div className="flex-1 max-w-xs xl:max-w-sm mx-2 hidden md:block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goTo('courses');
            }}
            className="relative group"
          >
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-[#4B6BB6] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search 36+ free courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-slate-100/80 dark:bg-slate-800/80 text-sm font-inter text-[#131720] dark:text-white placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-[#4B6BB6]/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all duration-200 shadow-inner"
            />
          </form>
        </div>

        {/* ── RIGHT SIDE ACTIONS ── */}
        <div ref={dropdownRef} className="ml-auto flex items-center gap-1.5">

          {/* Language Switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => { setShowLangMenu(!showLangMenu); setShowNotifications(false); setShowProfileMenu(false); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-poppins font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#4B6BB6]" />
              <span className="hidden lg:block">{currentLang}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>
            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 w-38 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 flex flex-col gap-1">
                {[
                  { code: 'Urdu', flag: '🇵🇰', label: 'اردو — Urdu' },
                  { code: 'English', flag: '🇬🇧', label: 'English' },
                  { code: 'Pashto', flag: '🇵🇰', label: 'پښتو — Pashto' },
                  { code: 'Punjabi', flag: '🇵🇰', label: 'ਪੰਜਾਬੀ — Punjabi' },
                ].map(({ code, flag, label }) => (
                  <button
                    key={code}
                    onClick={() => { setCurrentLang(code); setShowLangMenu(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-poppins text-left transition-colors ${
                      currentLang === code ? 'bg-[#4B6BB6] text-white font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{flag}</span><span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell — only when logged in */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowLangMenu(false); setShowProfileMenu(false); }}
                className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <Bell className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#0E131F]">5</span>
              </button>
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-76 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 flex flex-col gap-3" style={{ width: 288 }}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="font-poppins font-bold text-sm text-[#131720] dark:text-white">Notifications</span>
                    <span className="text-[11px] text-[#4B6BB6] cursor-pointer hover:underline font-medium">Mark all read</span>
                  </div>
                  {[
                    { title: '🎉 Lesson 04 Unlocked!', sub: 'React Masterclass — Chapter 4 is live', dot: 'bg-blue-500' },
                    { title: '🔥 12-Day Streak Active!', sub: 'Keep going — you\'re on a roll!', dot: 'bg-orange-500' },
                    { title: '✅ Certificate Earned', sub: 'Python for Automation — Completed', dot: 'bg-emerald-500' },
                    { title: '📢 New Course Added', sub: 'Generative AI & LangGraph is now free', dot: 'bg-purple-500' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                      <div>
                        <span className="font-semibold text-xs text-[#131720] dark:text-white block">{n.title}</span>
                        <span className="text-[11px] text-slate-400">{n.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode 
              ? <Sun className="w-4.5 h-4.5 text-amber-400" style={{ width: 18, height: 18 }} />
              : <Moon className="w-4.5 h-4.5 text-[#4B6BB6]" style={{ width: 18, height: 18 }} />
            }
          </button>

          {/* ── LOGGED OUT: Sign In + Sign Up buttons ── */}
          {!isLoggedIn && (
            <div className="flex items-center gap-2 ml-1">
              <button
                onClick={() => onOpenAuth && onOpenAuth('signin')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl font-poppins font-semibold text-sm text-[#4B6BB6] dark:text-[#7B9BD6] border-2 border-[#4B6BB6]/30 hover:border-[#4B6BB6] hover:bg-[#4B6BB6]/5 transition-all duration-200"
              >
                <UserCircle className="w-4 h-4" />
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth('signup')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-poppins font-bold text-sm bg-gradient-to-r from-[#4B6BB6] to-[#3557a7] text-white shadow-md shadow-[#4B6BB6]/30 hover:shadow-[#4B6BB6]/50 hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:block">Get Started</span>
                <span className="sm:hidden">Join</span>
              </button>
            </div>
          )}

          {/* ── LOGGED IN: Profile Pill ── */}
          {isLoggedIn && (
            <div className="relative ml-1">
              <button
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowLangMenu(false); setShowNotifications(false); }}
                className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <img
                  src="/images/murtaza-profile.jpg"
                  alt="Murtaza Ahmad"
                  className="w-8 h-8 rounded-lg object-cover object-top ring-2 ring-[#4B6BB6]/60"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Murtaza+Ahmad&background=4B6BB6&color=fff&size=64'; }}
                />
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="font-poppins font-bold text-xs text-[#131720] dark:text-white">Murtaza</span>
                  <span className="font-inter text-[10px] text-emerald-500 font-semibold">Lv. 3 • 850 XP</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 p-2 z-50 flex flex-col gap-0.5">
                  {/* Profile Header */}
                  <div className="p-3 bg-gradient-to-r from-[#4B6BB6]/10 to-[#3557a7]/5 dark:from-[#4B6BB6]/20 dark:to-slate-800 rounded-xl flex items-center gap-3 mb-1">
                    <img
                      src="/images/murtaza-profile.jpg"
                      alt="Murtaza Ahmad"
                      className="w-11 h-11 rounded-xl object-cover object-top ring-2 ring-[#4B6BB6]/50"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Murtaza+Ahmad&background=4B6BB6&color=fff&size=64'; }}
                    />
                    <div>
                      <span className="font-poppins font-bold text-sm text-[#131720] dark:text-white block">Murtaza Ahmad</span>
                      <span className="font-inter text-[11px] text-[#4B6BB6] font-semibold">Level 3 Learner • 850 XP</span>
                    </div>
                  </div>

                  {[
                    { label: 'My Learning', icon: BookOpen, action: () => goTo('my-learning') },
                    { label: 'Profile & Settings', icon: SettingsIcon, action: () => goTo('settings') },
                    { label: 'Video Player', icon: Play, action: () => goTo('player') },
                  ].map(({ label, icon: Icon, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 text-sm font-poppins font-semibold text-[#131720] dark:text-slate-200 transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#4B6BB6]/10 dark:bg-[#4B6BB6]/20 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-[#4B6BB6]" />
                      </div>
                      {label}
                    </button>
                  ))}

                  <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                  <button
                    onClick={() => { setShowProfileMenu(false); onLogout && onLogout(); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-poppins font-semibold text-red-600 dark:text-red-400 transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#131720] dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-slate-700 ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-5 flex flex-col gap-4 shadow-2xl">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 36+ free courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-sm font-inter pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[#131720] dark:text-white focus:outline-none focus:border-[#4B6BB6]/50"
            />
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1 border-t border-slate-100 dark:border-slate-800 pt-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id === 'courses' ? 'courses' : 'landing', item.sectionId)}
                className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl font-poppins font-semibold text-sm transition-colors ${
                  isActive(item) ? 'bg-[#4B6BB6] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            {isLoggedIn && (
              <>
                <button
                  onClick={() => goTo('my-learning')}
                  className="flex items-center gap-3 text-left px-4 py-3 rounded-xl font-poppins font-semibold text-sm text-[#4B6BB6] bg-[#4B6BB6]/10 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  My Learning Dashboard
                </button>
                <button
                  onClick={() => goTo('settings')}
                  className="flex items-center gap-3 text-left px-4 py-3 rounded-xl font-poppins font-semibold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <SettingsIcon className="w-4 h-4" />
                  Profile & Settings
                </button>
              </>
            )}
          </div>

          {/* Mobile Auth Buttons */}
          {!isLoggedIn && (
            <div className="flex gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth && onOpenAuth('signin'); }}
                className="flex-1 py-2.5 rounded-xl font-poppins font-bold text-sm text-[#4B6BB6] border-2 border-[#4B6BB6]/30 hover:border-[#4B6BB6] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth && onOpenAuth('signup'); }}
                className="flex-1 py-2.5 rounded-xl font-poppins font-bold text-sm bg-[#4B6BB6] text-white shadow-md"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
