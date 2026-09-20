import React, { useState } from 'react';
import { 
  Globe, 
  BookOpen, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram, 
  ChevronDown, 
  Sparkles,
  ArrowUpRight,
  Send,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterLoading(true);
    await supabase.from('contact_messages').insert({
      name: 'Newsletter Subscriber',
      email: newsletterEmail.trim(),
      subject: 'Newsletter Signup',
      message: 'User subscribed to newsletter from footer.',
    });
    setNewsletterLoading(false);
    setNewsletterSent(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSent(false), 4000);
  };

  const languages = [
    'English',
    'Español (Spanish)',
    'Français (French)',
    'Deutsch (German)',
    '日本語 (Japanese)',
    'Português (Portuguese)',
    '中文 (Chinese)',
    'العربية (Arabic)'
  ];

  return (
    <footer className="w-full bg-[#4B6BB6] text-white pt-16 pb-12 border-t border-white/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-14">
        
        {/* Top Brand & Partner Ecosystem Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/20">
          
          {/* Lumina Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/lumina-logo.png" 
              alt="lumina" 
              className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-white/20"
            />
            <div>
              <span className="font-poppins font-bold text-3xl tracking-tight text-white block">
                lumina
              </span>
              <span className="font-montserrat text-xs text-white/80 tracking-wider uppercase font-semibold">
                Creative Education Network
              </span>
            </div>
          </div>

          {/* Social Links matching Figma */}
          <div className="flex items-center gap-3">
            <a
              href="#twitter"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#4B6BB6] flex items-center justify-center transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#linkedin"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#4B6BB6] flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#youtube"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#4B6BB6] flex items-center justify-center transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="#instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#4B6BB6] flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Newsletter Subscription Bar */}
        <div className="py-8 border-b border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-poppins font-bold text-white text-lg">Stay in the loop 📩</p>
            <p className="font-inter text-xs text-white/70 mt-0.5">Get new courses, tips & updates straight to your inbox.</p>
          </div>
          {newsletterSent ? (
            <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-300 font-poppins text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>You're subscribed! 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="flex-1 sm:w-72 px-5 py-3 rounded-2xl bg-white/10 border border-white/25 text-white placeholder-white/50 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="px-5 py-3 rounded-2xl bg-white text-[#4B6BB6] font-poppins font-bold text-sm hover:bg-white/90 transition-colors flex items-center gap-2 shadow-md disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {newsletterLoading ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

        {/* Multi-Column Directory matching Figma specs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12 border-b border-white/20 text-xs sm:text-sm font-opensans">
          
          {/* Col 1: Art & Creative */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#D4C79C] uppercase tracking-wider mb-2">
              Art & Design
            </h4>
            {['Art History', 'Visual Design', 'Fashion History', 'Human Anatomy', 'Literature', 'Psychology', 'Public Speaking', 'Creative Writing', 'Graphic Arts'].map((item) => (
              <a key={item} href="#course" className="text-white/85 hover:text-white hover:underline transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Col 2: Business & Management */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#D4C79C] uppercase tracking-wider mb-2">
              Business & Mgmt
            </h4>
            {['Business Admin', 'Business Analysis', 'Corporate Finance', 'Economics', 'Entrepreneurship', 'Financial Literacy', 'Leadership', 'Project Management', 'Statistics'].map((item) => (
              <a key={item} href="#course" className="text-white/85 hover:text-white hover:underline transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Col 3: Engineering & Tech */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#D4C79C] uppercase tracking-wider mb-2">
              Tech & Engineering
            </h4>
            {['Computer Science', 'Software Engineering', 'Biomedical Tech', 'Electrical Eng', 'Industrial Design', 'Mechanical Systems', 'Humanities', 'Data Science'].map((item) => (
              <a key={item} href="#course" className="text-white/85 hover:text-white hover:underline transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Col 4: Browse Courses */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#D4C79C] uppercase tracking-wider mb-2">
              Popular Topics
            </h4>
            {['Learn AI & GenAI', 'Learn ChatGPT', 'Learn Figma UI/UX', 'Learn Python', 'Learn DaVinci Resolve', 'Learn Motion Design', 'Learn Blockchain', 'Learn Architecture'].map((item) => (
              <a key={item} href="#course" className="text-white/85 hover:text-white hover:underline transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Col 5: Degrees & Certificates */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#D4C79C] uppercase tracking-wider mb-2">
              Online Degrees
            </h4>
            {["Master's in Design", "Master's in AI", "Master's in Computer Science", "Bachelor's in Business", "Bachelor's in Computing", "MicroMasters Programs", "Executive Certificates"].map((item) => (
              <a key={item} href="#degree" className="text-white/85 hover:text-white hover:underline transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Col 6: Career Guides & Lumina */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#D4C79C] uppercase tracking-wider mb-2">
              Career Guides
            </h4>
            {['Become a UI Designer', 'Become a Data Scientist', 'Become a Filmmaker', 'Become a 3D Artist', 'Partner With Us', 'Affiliates Program', 'About Lumina', 'Careers & Hiring'].map((item) => (
              <a key={item} href="#guide" className="text-white/85 hover:text-white hover:underline transition-colors">
                {item}
              </a>
            ))}
          </div>

        </div>

        {/* Language Selector & Legal Bar matching Figma Frame 57 & 'chose your language' */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/80">
          
          {/* Interactive Language Selector matching Figma 'chose your language' */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium border border-white/30 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Language: <strong>{selectedLanguage}</strong></span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isLangOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-56 bg-white text-[#131720] rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Choose Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-100 flex items-center justify-between ${
                      selectedLanguage === lang ? 'font-bold text-[#4B6BB6] bg-blue-50' : ''
                    }`}
                  >
                    <span>{lang}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <a href="#terms" className="hover:underline">Terms of Service & Honor Code</a>
            <span>•</span>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#cookie" className="hover:underline">Cookie Policy</a>
            <span>•</span>
            <a href="#accessibility" className="hover:underline">Accessibility Policy</a>
            <span>•</span>
            <a href="#sitemap" className="hover:underline">Sitemap</a>
          </div>

          {/* Copyright Notice */}
          <div className="text-white/90 font-medium">
            © 2026 Lumina Learning LLC. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
};
