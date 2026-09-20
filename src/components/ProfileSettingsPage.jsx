import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Upload, 
  Globe, 
  Volume2, 
  Tv, 
  Gauge, 
  Bell, 
  Lock, 
  Link as LinkIcon, 
  Shield, 
  Trash2, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  Edit3, 
  Check, 
  Save,
  Loader2
} from 'lucide-react';
import { LearnerSidebar } from './LearnerSidebar';
import { Footer } from './Footer';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

export const ProfileSettingsPage = ({ onNavigate }) => {
  const { darkMode } = useTheme();

  // Loading / saving state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Personal info state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    memberSince: ''
  });

  // Learning preferences state
  const [videoVoiceLang, setVideoVoiceLang] = useState('English');
  const [interfaceLang, setInterfaceLang] = useState('English');
  const [videoQuality, setVideoQuality] = useState('Auto (Recommended)');
  const [playbackSpeed, setPlaybackSpeed] = useState('Normal (1.0x)');

  // Notification toggles
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    announcements: true,
    reminders: true,
    promotions: false,
    community: true
  });

  // Download options
  const [downloadOptions, setDownloadOptions] = useState({
    progress: true,
    certificates: true,
    account: true,
    history: true
  });

  const [savedSuccessMessage, setSavedSuccessMessage] = useState(null);

  // ── Load profile from Supabase on mount ──────────────────
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Profile load error:', error);
        }

        if (profile) {
          setPersonalInfo({
            name: profile.full_name || user.user_metadata?.full_name || '',
            email: profile.email || user.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            memberSince: profile.created_at
              ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : ''
          });
          if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
          if (profile.video_voice_lang) setVideoVoiceLang(profile.video_voice_lang);
          if (profile.interface_lang) setInterfaceLang(profile.interface_lang);
          if (profile.video_quality) setVideoQuality(profile.video_quality);
          if (profile.playback_speed) setPlaybackSpeed(profile.playback_speed);
          setNotifications({
            courseUpdates: profile.notif_course_updates ?? true,
            announcements: profile.notif_announcements ?? true,
            reminders: profile.notif_reminders ?? true,
            promotions: profile.notif_promotions ?? false,
            community: profile.notif_community ?? true,
          });
        } else {
          // No profile row yet — fallback to auth user metadata
          setPersonalInfo({
            name: user.user_metadata?.full_name || '',
            email: user.email || '',
            phone: '',
            location: '',
            memberSince: user.created_at
              ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : ''
          });
        }
      } catch (err) {
        console.error('Unexpected profile load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ── Helper: upsert profile row in Supabase ────────────────
  const upsertProfile = async (updates) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not logged in' };
    return supabase.from('profiles').upsert({ id: user.id, ...updates }, { onConflict: 'id' });
  };

  // ── Upload avatar to Supabase Storage ─────────────────────
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showNotification('Image too large! Max size is 2MB.');
      return;
    }
    setAvatarUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { showNotification('Please sign in first.'); return; }

      const ext = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) { showNotification('Upload failed: ' + uploadError.message); return; }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl + '?t=' + Date.now());
      await upsertProfile({ avatar_url: publicUrl });
      showNotification('Profile photo updated! ✅');
    } catch (err) {
      showNotification('Something went wrong uploading the photo.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const showNotification = (msg) => {
    setSavedSuccessMessage(msg);
    setTimeout(() => setSavedSuccessMessage(null), 3000);
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    const { error } = await upsertProfile({
      video_voice_lang: videoVoiceLang,
      interface_lang: interfaceLang,
      video_quality: videoQuality,
      playback_speed: playbackSpeed,
      notif_course_updates: notifications.courseUpdates,
      notif_announcements: notifications.announcements,
      notif_reminders: notifications.reminders,
      notif_promotions: notifications.promotions,
      notif_community: notifications.community,
    });
    setSaving(false);
    showNotification(error ? 'Error saving preferences.' : 'Preferences updated successfully!');
  };

  const handleSavePersonalInfo = async () => {
    setSaving(true);
    const { error } = await upsertProfile({
      full_name: personalInfo.name,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
    });
    setSaving(false);
    setIsEditingInfo(false);
    showNotification(error ? 'Error saving info. Try again.' : 'Personal information updated!');
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#D4C79C] dark:bg-[#0E131F] text-[#131720] dark:text-white transition-colors duration-300 flex flex-col font-sans">
      
      {/* Full-page loading overlay while fetching profile */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#D4C79C]/80 dark:bg-[#0E131F]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-[#4B6BB6] animate-spin" />
            <span className="font-poppins text-sm text-slate-600 dark:text-slate-300">Loading your profile…</span>
          </div>
        </div>
      )}

      {/* Toast alert */}
      {savedSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131720] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-poppins font-medium">{savedSuccessMessage}</span>
        </div>
      )}

      {/* ── BREADCRUMB ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-inter text-slate-600 dark:text-slate-400 mb-4">
          <button onClick={() => onNavigate && onNavigate('landing')} className="hover:text-[#4B6BB6] transition-colors">
            Home
          </button>
          <span>›</span>
          <button onClick={() => onNavigate && onNavigate('my-learning')} className="hover:text-[#4B6BB6] transition-colors">
            My Learning
          </button>
          <span>›</span>
          <span className="font-semibold text-[#131720] dark:text-white">Profile & Settings</span>
        </div>
      </div>

      {/* ── MAIN SETTINGS CONTAINER WITH SIDEBAR ── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pb-16 flex-1 flex flex-col lg:flex-row items-start gap-8">
        
        {/* Left Learner Sidebar */}
        <LearnerSidebar 
          currentTab="settings" 
          onNavigate={onNavigate}
        />

        {/* Right Settings Grid Content */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Header Title */}
          <div>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-[#131720] dark:text-white tracking-tight">
              Profile & Settings
            </h1>
            <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Manage your account information and preferences
            </p>
          </div>

          {/* ── ROW 1: PERSONAL INFORMATION & PROFILE PICTURE ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Card 1: Personal Information */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                  Personal Information
                </h3>
                <button
                  onClick={() => isEditingInfo ? handleSavePersonalInfo() : setIsEditingInfo(true)}
                  className="px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-poppins font-semibold text-[#4B6BB6] dark:text-[#6B8BD6] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  {isEditingInfo ? (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-3.5 text-xs font-inter">
                {/* Full Name */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-500 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 block">Full Name</span>
                    {isEditingInfo ? (
                      <input 
                        type="text" 
                        value={personalInfo.name} 
                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-semibold text-[#131720] dark:text-white"
                      />
                    ) : (
                      <span className="font-semibold text-[#131720] dark:text-white">{personalInfo.name}</span>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-500 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 block">Email Address</span>
                    {isEditingInfo ? (
                      <input 
                        type="email" 
                        value={personalInfo.email} 
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-semibold text-[#131720] dark:text-white"
                      />
                    ) : (
                      <span className="font-semibold text-[#131720] dark:text-white">{personalInfo.email}</span>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-500 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 block">Phone Number</span>
                    {isEditingInfo ? (
                      <input 
                        type="text" 
                        value={personalInfo.phone} 
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-semibold text-[#131720] dark:text-white"
                      />
                    ) : (
                      <span className="font-semibold text-[#131720] dark:text-white">{personalInfo.phone}</span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 block">Location</span>
                    {isEditingInfo ? (
                      <input 
                        type="text" 
                        value={personalInfo.location} 
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-semibold text-[#131720] dark:text-white"
                      />
                    ) : (
                      <span className="font-semibold text-[#131720] dark:text-white">{personalInfo.location}</span>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Member Since</span>
                    <span className="font-semibold text-[#131720] dark:text-white">{personalInfo.memberSince}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: Profile Picture — Real Supabase Storage Upload */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                  Profile Picture
                </h3>
                {avatarUploading && (
                  <span className="flex items-center gap-1 text-xs text-[#4B6BB6] font-poppins">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center justify-center py-3 gap-4">
                <div className="relative">
                  <img 
                    src={avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'} 
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover object-top ring-4 ring-[#4B6BB6]/20 shadow-xl" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';
                    }}
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-800"></span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <label className="px-6 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-600 text-xs font-poppins font-semibold text-[#131720] dark:text-white hover:border-[#4B6BB6] hover:text-[#4B6BB6] transition-all flex items-center gap-2 shadow-sm cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{avatarUploading ? 'Uploading…' : 'Change Photo'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      disabled={avatarUploading}
                      onChange={handleAvatarUpload}
                    />
                  </label>
                  <span className="font-inter text-[11px] text-slate-400 mt-1">
                    JPG, PNG or GIF. Max size 2MB
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ── ROW 2: LEARNING PREFERENCES & NOTIFICATIONS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Card 3: Learning Preferences */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                  Learning Preferences
                </h3>
                <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Customize your learning experience
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs font-inter">
                
                {/* Default Video Voice */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">
                        Default Video Language (Voice)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        All course videos will play in this language by default.
                      </span>
                    </div>
                  </div>

                  <select
                    value={videoVoiceLang}
                    onChange={(e) => setVideoVoiceLang(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-[#131720] dark:text-white outline-none cursor-pointer"
                  >
                    <option value="Urdu">🇵🇰 Urdu</option>
                    <option value="English">🇬🇧 English</option>
                    <option value="Pashto">🇵🇰 Pashto</option>
                    <option value="Punjabi">🇵🇰 Punjabi</option>
                    <option value="Sindhi">🇵🇰 Sindhi</option>
                  </select>
                </div>

                {/* Interface Language */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">
                        Interface Language
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Choose the language for the website interface.
                      </span>
                    </div>
                  </div>

                  <select
                    value={interfaceLang}
                    onChange={(e) => setInterfaceLang(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-[#131720] dark:text-white outline-none cursor-pointer"
                  >
                    <option value="Urdu">🇵🇰 Urdu</option>
                    <option value="English">🇬🇧 English</option>
                  </select>
                </div>

                {/* Video Quality */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0">
                      <Tv className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">
                        Video Quality
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Select default video quality for smoother playback.
                      </span>
                    </div>
                  </div>

                  <select
                    value={videoQuality}
                    onChange={(e) => setVideoQuality(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-[#131720] dark:text-white outline-none cursor-pointer"
                  >
                    <option value="Auto (Recommended)">Auto (Recommended)</option>
                    <option value="1080p (Full HD)">1080p (Full HD)</option>
                    <option value="720p (HD)">720p (HD)</option>
                    <option value="480p">480p</option>
                  </select>
                </div>

                {/* Playback Speed */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center shrink-0">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">
                        Playback Speed
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Set default playback speed for videos.
                      </span>
                    </div>
                  </div>

                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-[#131720] dark:text-white outline-none cursor-pointer"
                  >
                    <option value="Normal (1.0x)">Normal (1.0x)</option>
                    <option value="1.25x">1.25x</option>
                    <option value="1.5x">1.5x</option>
                    <option value="2.0x">2.0x</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Card 4: Notifications */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="pb-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                    Notifications
                  </h3>
                  <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Manage your notification preferences
                  </p>
                </div>

                <div className="flex flex-col gap-3.5 pt-3 text-xs font-inter">
                  
                  {/* Course Updates */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Course Updates</span>
                      <span className="text-[11px] text-slate-400">New lessons & course content</span>
                    </div>
                    <button 
                      onClick={() => toggleNotification('courseUpdates')}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${notifications.courseUpdates ? 'bg-[#4B6BB6]' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.courseUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Announcements */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Announcements</span>
                      <span className="text-[11px] text-slate-400">Important platform updates</span>
                    </div>
                    <button 
                      onClick={() => toggleNotification('announcements')}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${notifications.announcements ? 'bg-[#4B6BB6]' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.announcements ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Reminders */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Reminders</span>
                      <span className="text-[11px] text-slate-400">Study reminders & streak alerts</span>
                    </div>
                    <button 
                      onClick={() => toggleNotification('reminders')}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${notifications.reminders ? 'bg-[#4B6BB6]' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.reminders ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Promotions */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Promotions</span>
                      <span className="text-[11px] text-slate-400">Offers & learning tips</span>
                    </div>
                    <button 
                      onClick={() => toggleNotification('promotions')}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${notifications.promotions ? 'bg-[#4B6BB6]' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.promotions ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Community */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Community</span>
                      <span className="text-[11px] text-slate-400">Replies & community activity</span>
                    </div>
                    <button 
                      onClick={() => toggleNotification('community')}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${notifications.community ? 'bg-[#4B6BB6]' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.community ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                </div>
              </div>

              <button 
                onClick={handleSavePreferences}
                className="w-full py-3 rounded-2xl bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-xs shadow-md shadow-[#4B6BB6]/25 transition-all mt-3"
              >
                Save Preferences
              </button>
            </div>

          </div>

          {/* ── ROW 3: ACCOUNT & SECURITY & DOWNLOAD DATA ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Card 5: Account & Security */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col gap-3">
              <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-700">
                Account & Security
              </h3>

              <div className="flex flex-col gap-1 text-xs font-inter">
                {/* Change Password */}
                <button 
                  onClick={() => showNotification('Change password modal opened')}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Change Password</span>
                      <span className="text-[11px] text-slate-400">Update your account password</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Connected Accounts */}
                <button 
                  onClick={() => showNotification('Manage social connections')}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      <LinkIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Connected Accounts</span>
                      <span className="text-[11px] text-slate-400">Manage social media connections</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Privacy Settings */}
                <button 
                  onClick={() => showNotification('Privacy preferences opened')}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#131720] dark:text-white block">Privacy Settings</span>
                      <span className="text-[11px] text-slate-400">Manage your privacy and data</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Delete Account */}
                <button 
                  onClick={() => showNotification('Account deletion requires confirmation')}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-red-600 dark:text-red-400 block">Delete Account</span>
                      <span className="text-[11px] text-slate-400">Permanently delete your account</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            {/* Card 6: Download My Data */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border border-white/80 dark:border-slate-700 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="pb-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white">
                    Download My Data
                  </h3>
                  <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Download a copy of your data including
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 pt-4 text-xs font-inter text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={downloadOptions.progress} 
                      onChange={(e) => setDownloadOptions({ ...downloadOptions, progress: e.target.checked })}
                      className="w-4 h-4 accent-[#4B6BB6] rounded"
                    />
                    <span>Course progress</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={downloadOptions.certificates} 
                      onChange={(e) => setDownloadOptions({ ...downloadOptions, certificates: e.target.checked })}
                      className="w-4 h-4 accent-[#4B6BB6] rounded"
                    />
                    <span>Certificates</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={downloadOptions.account} 
                      onChange={(e) => setDownloadOptions({ ...downloadOptions, account: e.target.checked })}
                      className="w-4 h-4 accent-[#4B6BB6] rounded"
                    />
                    <span>Account information</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={downloadOptions.history} 
                      onChange={(e) => setDownloadOptions({ ...downloadOptions, history: e.target.checked })}
                      className="w-4 h-4 accent-[#4B6BB6] rounded"
                    />
                    <span>Learning history</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={() => showNotification('Data export request sent! Check your email soon.')}
                className="w-full py-3 rounded-2xl border border-slate-300 dark:border-slate-600 hover:border-[#4B6BB6] hover:text-[#4B6BB6] text-[#131720] dark:text-white font-poppins font-semibold text-xs transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Request Download</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
