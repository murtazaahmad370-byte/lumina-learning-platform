import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Award, 
  FileText, 
  Settings, 
  Flame,
  Check
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export const LearnerSidebar = ({ 
  currentTab = 'my-learning', 
  onSelectTab,
  onNavigate 
}) => {
  const [profile, setProfile] = useState({
    name: 'Learner',
    avatar: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .single();

          const name = data?.full_name || user.user_metadata?.full_name || 
            (user.user_metadata?.first_name ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim() : null) || 
            user.email?.split('@')[0] || 'Learner';

          setProfile({
            name,
            avatar: data?.avatar_url || null
          });
        }
      } catch (e) {
        // keep fallback
      }
    };
    fetchUser();
  }, []);

  const navItems = [
    { id: 'my-learning', label: 'My Learning', icon: BookOpen },
    { id: 'in-progress', label: 'In Progress', icon: Clock },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'saved', label: 'Saved Courses', icon: Bookmark },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'notes', label: 'My Notes', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const streakDays = [
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: true },
    { day: 'S', active: true },
    { day: 'S', active: false }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'settings') {
      if (onNavigate) onNavigate('settings');
    } else if (tabId === 'my-learning') {
      if (onNavigate) onNavigate('my-learning');
    }
    if (onSelectTab) onSelectTab(tabId);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
      
      {/* ── PROFILE HEADER CARD ── */}
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-5 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img 
              src={profile.avatar || "/images/murtaza-profile.jpg"} 
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-[#4B6BB6] shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800"></span>
          </div>

          <div className="flex flex-col">
            <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white leading-tight truncate max-w-[130px]">
              {profile.name}
            </h3>
            <span className="font-inter font-semibold text-xs text-[#4B6BB6] dark:text-[#6B8BD6]">
              Active Learner
            </span>
            <span className="font-inter text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              850 XP ⭐
            </span>
          </div>
        </div>

        {/* XP Level Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#4B6BB6] h-full rounded-full transition-all duration-500" 
            style={{ width: '70%' }}
          />
        </div>
      </div>

      {/* ── SIDEBAR NAVIGATION TABS ── */}
      <nav className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-3 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-poppins font-semibold text-xs transition-all text-left ${
                isActive
                  ? 'bg-[#4B6BB6] text-white shadow-md shadow-[#4B6BB6]/25'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-[#4B6BB6] dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── LEARNING STREAK CARD ── */}
      <div className="bg-[#FAF7EF] dark:bg-slate-800/80 rounded-3xl p-5 border border-[#D4C79C]/40 dark:border-slate-700 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-poppins font-bold text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
              Learning Streak
            </span>
            <span className="font-poppins font-extrabold text-base text-[#131720] dark:text-white">
              12 Days
            </span>
          </div>
        </div>

        <p className="font-inter text-xs text-slate-500 dark:text-slate-400">
          Keep it up! You're doing great.
        </p>

        {/* Weekly Day Circles */}
        <div className="flex items-center justify-between pt-1">
          {streakDays.map((d, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  d.active
                    ? 'bg-[#4B6BB6] text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {d.active ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
              </div>
              <span className="font-inter text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
