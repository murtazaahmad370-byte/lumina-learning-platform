import React, { useState, useRef } from 'react';
import { 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// 5 images uploaded by the user for the gallery
const galleryPics = [
  { id: 1, img: '/images/gallery-brown-shirt.jpg', title: 'Student in Library Bookshelf' },
  { id: 2, img: '/images/gallery-sitting-reading.jpg', title: 'Student Reading between Bookstacks' },
  { id: 3, img: '/images/gallery-library-table.jpg', title: 'Group Study at Library Hall' },
  { id: 4, img: '/images/gallery-lecture-hall.jpg', title: 'Students at Academic Workshop' },
  { id: 5, img: '/images/gallery-team-collaboration.jpg', title: 'Creative Collaborative Team' },
];

export const AuthPage = ({ initialMode = 'signup', onAuthSuccess, onBackToLanding }) => {
  const [mode, setMode] = useState(initialMode); // 'signup' | 'login' | 'forgot'
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Gallery side-scroll & drag state
  const galleryRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleSideScroll = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 550;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeftRef.current = galleryRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.6;
    galleryRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsError(false);

    if (!email) {
      setStatusMessage('Please enter your email address.');
      setIsError(true);
      return;
    }
    if (!password) {
      setStatusMessage('Please enter a password.');
      setIsError(true);
      return;
    }

    if (mode === 'signup') {
      if (!firstName.trim()) {
        setStatusMessage('First name is required.');
        setIsError(true);
        return;
      }
      if (password !== confirmPassword) {
        setStatusMessage('Passwords do not match.');
        setIsError(true);
        return;
      }
      if (password.length < 6) {
        setStatusMessage('Password should be at least 6 characters.');
        setIsError(true);
        return;
      }
      if (!agreeTerms) {
        setStatusMessage('Please agree to the Terms & Conditions.');
        setIsError(true);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
            },
          },
        });

        if (error) {
          setIsError(true);
          console.error("SignUp error:", error);
          if (error.message?.toLowerCase().includes('rate limit')) {
            setStatusMessage('Email rate limit exceeded. Niche diya gaya Auto-Confirm SQL script run karein!');
          } else if (error.message?.toLowerCase().includes('already registered')) {
            setStatusMessage('Ye email pehle se registered hai! "Login" par click karke sign in karein.');
          } else {
            setStatusMessage(error.message);
          }
          return;
        }

        if (data?.session) {
          setStatusMessage('Account created successfully!');
          onAuthSuccess({
            name: `${firstName.trim()} ${lastName.trim()}`.trim() || email.split('@')[0],
            email: email.trim(),
            id: data.user?.id,
          });
        } else if (data?.user) {
          setStatusMessage('Registration successful! Ab aap sign in kar sakte hain.');
          setMode('login');
        }
      } catch (err) {
        setIsError(true);
        console.error("SignUp catch error:", err);
        setStatusMessage(err.message || 'An error occurred during registration.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Login mode
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setIsError(true);
          console.error("Login error:", error);
          if (error.message?.toLowerCase().includes('invalid login credentials')) {
            setStatusMessage('Email ya password galat hai. Agar account nahi banaya to pehle "Sign Up" karein!');
          } else if (error.message?.toLowerCase().includes('email not confirmed')) {
            setStatusMessage('Email confirm nahi hua. Supabase mein Auto-Confirm SQL run karein ya inbox check karein.');
          } else {
            setStatusMessage(error.message);
          }
          return;
        }

        if (data?.user) {
          const userMeta = data.user.user_metadata || {};
          const displayName = userMeta.full_name || 
            (userMeta.first_name ? `${userMeta.first_name} ${userMeta.last_name || ''}`.trim() : null) || 
            data.user.email?.split('@')[0] || 'Learner';

          onAuthSuccess({
            name: displayName,
            email: data.user.email,
            id: data.user.id,
            user_metadata: userMeta,
          });
        }
      } catch (err) {
        setIsError(true);
        console.error("Login catch error:", err);
        setStatusMessage(err.message || 'An error occurred during sign in.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOAuthSignIn = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        setIsError(true);
        setStatusMessage(error.message);
      }
    } catch (err) {
      setIsError(true);
      setStatusMessage(`Unable to connect to ${provider}.`);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setIsError(true);
      setStatusMessage('Please enter your email address.');
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}?reset=true`,
    });
    setIsLoading(false);
    if (error) {
      setIsError(true);
      setStatusMessage(error.message);
    } else {
      setResetSent(true);
      setIsError(false);
      setStatusMessage('Password reset link sent! Check your email inbox.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#131720] flex flex-col font-sans selection:bg-[#4B6BB6] selection:text-white">
      
      {/* ── HEADER NAVIGATION (Figma: manu) ── */}
      <header className="w-full bg-white border-b border-black/5 py-3.5 px-4 sm:px-8 lg:px-14">
        <div className="max-w-[1424px] mx-auto flex items-center justify-between gap-4">
          
          {/* Official Lumina Logo matching Navbar */}
          <div onClick={onBackToLanding} className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0">
            <div className="relative">
              <img 
                src="/images/lumina-logo.png" 
                alt="lumina" 
                className="w-10 h-10 rounded-full object-cover shadow-md group-hover:shadow-[#4B6BB6]/40 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-poppins font-bold text-xl tracking-tight text-[#131720] group-hover:text-[#4B6BB6] transition-colors">
                lumina
              </span>
              <span className="font-inter text-[9px] tracking-widest text-[#4B6BB6] font-semibold uppercase -mt-0.5">
                Creative Lab
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            <button 
              onClick={onBackToLanding} 
              className="px-6 py-2 rounded-full text-white font-montserrat font-bold italic text-sm tracking-wide shadow-sm hover:opacity-95 transition-all"
              style={{ background: 'linear-gradient(96.41deg, #4B6BB6 2.43%, #D4C79C 92.59%)' }}
            >
              explore
            </button>
            <button onClick={onBackToLanding} className="px-4 py-2 rounded-full text-[#4B6BB6] font-montserrat font-bold italic text-sm hover:bg-slate-50 transition-colors">
              courses
            </button>
            <button onClick={onBackToLanding} className="px-4 py-2 rounded-full text-[#4B6BB6] font-montserrat font-bold italic text-sm hover:bg-slate-50 transition-colors">
              events
            </button>
            <button onClick={onBackToLanding} className="px-4 py-2 rounded-full text-[#4B6BB6] font-montserrat font-bold italic text-sm hover:bg-slate-50 transition-colors">
              about
            </button>
          </nav>

          {/* Search Bar (Figma: srach bar and login Frame 32) */}
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="search about courses" 
              className="w-56 sm:w-80 lg:w-96 bg-white text-sm font-montserrat text-[#000000] placeholder-slate-400 px-6 py-3 rounded-full border border-slate-200 shadow-[1px_4px_22px_3px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]" 
            />
            <Search className="absolute right-5 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </header>

      {/* ── HERO & AUTHENTICATION SECTION (Figma: hero) ── */}
      <section className="w-full bg-white py-10 lg:py-14 px-4 sm:px-8 lg:px-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: AUTH FORM ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="font-poppins font-bold text-3xl sm:text-[42px] text-[#4B6BB6] tracking-tight mb-2 leading-tight">
              {mode === 'signup' ? 'Create an account' : 'Sign in to account'}
            </h1>
            
            <p className="font-montserrat text-sm text-slate-600 mb-6">
              {mode === 'signup' ? 'Already have account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => { 
                  setMode(mode === 'signup' ? 'login' : 'signup'); 
                  setStatusMessage(''); 
                  setIsError(false); 
                }} 
                className="text-[#4B6BB6] font-semibold underline hover:text-[#385396]"
              >
                {mode === 'signup' ? 'Login.' : 'Sign Up.'}
              </button>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
              {mode === 'signup' && (
                <>
                  <input 
                    type="text" 
                    required 
                    placeholder="First name" 
                     value={firstName} 
                    onChange={e => setFirstName(e.target.value)} 
                    className="w-full bg-white text-sm sm:text-base font-montserrat text-[#000000] placeholder-slate-400 px-6 py-3.5 rounded-full border border-slate-200 shadow-[1.2px_4.8px_22px_3.6px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]" 
                  />
                  <input 
                    type="text" 
                    required 
                    placeholder="Last name" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)} 
                    className="w-full bg-white text-sm sm:text-base font-montserrat text-[#000000] placeholder-slate-400 px-6 py-3.5 rounded-full border border-slate-200 shadow-[1.2px_4.8px_22px_3.6px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]" 
                  />
                </>
              )}

              <input 
                type="email" 
                required 
                placeholder="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-white text-sm sm:text-base font-montserrat text-[#000000] placeholder-slate-400 px-6 py-3.5 rounded-full border border-slate-200 shadow-[1.2px_4.8px_22px_3.6px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]" 
              />
              
              {mode !== 'forgot' && (
                <input 
                  type="password" 
                  required 
                  placeholder={mode === 'signup' ? 'Create password' : 'Password'} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full bg-white text-sm sm:text-base font-montserrat text-[#000000] placeholder-slate-400 px-6 py-3.5 rounded-full border border-slate-200 shadow-[1.2px_4.8px_22px_3.6px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]" 
                />
              )}

              {mode === 'signup' && (
                <input 
                  type="password" 
                  required 
                  placeholder="Confirm password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  className="w-full bg-white text-sm sm:text-base font-montserrat text-[#000000] placeholder-slate-400 px-6 py-3.5 rounded-full border border-slate-200 shadow-[1.2px_4.8px_22px_3.6px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]" 
                />
              )}

              {/* Forgot password link — shown only in login mode */}
              {mode === 'login' && (
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setStatusMessage(''); setIsError(false); setResetSent(false); }}
                    className="text-xs font-montserrat text-[#4B6BB6] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Action Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                onClick={mode === 'forgot' ? handleForgotPassword : undefined}
                className="w-full sm:w-[384px] h-[54px] bg-[#4B6BB6] hover:bg-[#385396] disabled:opacity-75 disabled:cursor-not-allowed text-white font-montserrat font-normal text-xl rounded-xl shadow-[0px_4px_16px_rgba(75,107,182,0.4)] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoading
                  ? (mode === 'signup' ? 'Creating Account...' : mode === 'forgot' ? 'Sending...' : 'Signing In...')
                  : (mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send Reset Link' : 'Sign In')}
              </button>

              {/* Back to login from forgot password */}
              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => { setMode('login'); setStatusMessage(''); setIsError(false); setResetSent(false); }}
                  className="text-sm font-montserrat text-slate-500 hover:text-[#4B6BB6] underline text-center"
                >
                  ← Back to Sign In
                </button>
              )}

              {/* Terms Checkbox */}
              {mode === 'signup' && (
                <label className="flex items-center gap-2 cursor-pointer mt-1 select-none">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms} 
                    onChange={e => setAgreeTerms(e.target.checked)} 
                    className="w-4 h-4 rounded border-slate-300 text-[#4B6BB6] focus:ring-[#4B6BB6]"
                  />
                  <span className="text-xs sm:text-sm font-montserrat text-slate-700">
                    I Agree the <span className="text-[#4B6BB6] font-semibold underline">Tearm & Condition</span>
                  </span>
                </label>
              )}

              {/* Status Message */}
              {statusMessage && (
                <div className={`p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 ${isError ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-blue-50 text-[#385396] border border-blue-200'}`} aria-live="polite">
                  {isError ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Divider — hide on forgot password mode */}
              {mode !== 'forgot' && (
                <>
                  <div className="flex items-center gap-3 my-2 w-full max-w-[460px]">
                    <div className="flex-1 h-[1px] bg-slate-300" />
                    <span className="text-xs sm:text-sm font-montserrat text-[#4B6BB6] font-medium px-2">
                      or Register with
                    </span>
                    <div className="flex-1 h-[1px] bg-slate-300" />
                  </div>

                  {/* Social Login Buttons */}
                  <div className="flex items-center gap-4 flex-wrap w-full max-w-[460px]">
                    <button
                      type="button"
                      onClick={() => handleOAuthSignIn('google')}
                      className="flex-1 min-w-[170px] h-[54px] border border-black/80 hover:border-black rounded-[14.5px] bg-white hover:bg-slate-50 flex items-center justify-center gap-3 px-4 transition-colors"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                      <span className="font-montserrat text-xs sm:text-sm text-black font-medium">
                        Continue with
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOAuthSignIn('apple')}
                      className="flex-1 min-w-[170px] h-[54px] border border-black/80 hover:border-black rounded-[14.5px] bg-white hover:bg-slate-50 flex items-center justify-center gap-3 px-4 transition-colors"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.65-.79 1.1-1.89.98-3-.95.04-2.1.64-2.77 1.42-.59.68-1.11 1.78-.97 2.85 1.06.08 2.14-.54 2.76-1.27z"/>
                      </svg>
                      <span className="font-montserrat text-xs sm:text-sm text-black font-medium">
                        Continue with
                      </span>
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* ── RIGHT COLUMN: Vertical Library Bookshelf (Figma: Rectangle 54) ── */}
          <div className="lg:col-span-6 hidden lg:flex items-center justify-center">
            <div className="w-full max-w-[540px] h-[580px] rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.16)] border border-slate-100">
              <img
                src="/images/library-reading.jpg"
                alt="Library Bookshelf Study"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MEDIA GALLERY: SIDE SCROLL & 2 PROMINENT WHITE CURVED BORDERS (Figma: PICS AND BORDER) ── */}
      <section className="relative w-full bg-white overflow-hidden py-8 my-6 group select-none">
        
        {/* Top White Curved Border (Figma: Vector 3) */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none h-[95px] sm:h-[130px] md:h-[150px]">
          {/* Base SVG curve for solid white contrast */}
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0,0 L1440,0 L1440,40 Q720,150 0,40 Z" fill="#FFFFFF" />
          </svg>
          {/* Figma curved border overlay */}
          <img 
            src="/images/curved-border.png" 
            alt="Top Curved Arch Border" 
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        {/* Bottom White Curved Border (Figma: Vector 4) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none h-[95px] sm:h-[130px] md:h-[150px]">
          {/* Base SVG curve for solid white contrast */}
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0,150 L1440,150 L1440,110 Q720,0 0,110 Z" fill="#FFFFFF" />
          </svg>
          {/* Figma curved border overlay (flipped) */}
          <img 
            src="/images/curved-border.png" 
            alt="Bottom Curved Arch Border" 
            className="absolute inset-0 w-full h-full object-fill transform scale-y-[-1]"
          />
        </div>

        {/* Left Side-Scroll Navigation Button */}
        <button 
          type="button"
          onClick={() => handleSideScroll('left')}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 hover:bg-white shadow-[0_6px_24px_rgba(0,0,0,0.25)] flex items-center justify-center text-[#4B6BB6] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-slate-100"
          aria-label="Scroll gallery left"
        >
          <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Right Side-Scroll Navigation Button */}
        <button 
          type="button"
          onClick={() => handleSideScroll('right')}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 hover:bg-white shadow-[0_6px_24px_rgba(0,0,0,0.25)] flex items-center justify-center text-[#4B6BB6] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-slate-100"
          aria-label="Scroll gallery right"
        >
          <ChevronRight className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Horizontal Side-Scroll Gallery Track (Figma: all pics / overflow-x: scroll) */}
        <div 
          ref={galleryRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] overflow-x-auto no-scrollbar scroll-smooth flex items-center cursor-grab active:cursor-grabbing px-6"
        >
          {/* Continuous Marquee Wrapper */}
          <div className="flex gap-6 sm:gap-8 animate-marquee group-hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
            
            {/* First Set of 5 User Images */}
            {galleryPics.map((pic) => (
              <div 
                key={`set1-${pic.id}`} 
                className="flex-shrink-0 w-[340px] sm:w-[460px] md:w-[560px] lg:w-[650px] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[470px] rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.015]"
              >
                <img
                  src={pic.img}
                  alt={pic.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Duplicate Set for Seamless Continuous Loop */}
            {galleryPics.map((pic) => (
              <div 
                key={`set2-${pic.id}`} 
                className="flex-shrink-0 w-[340px] sm:w-[460px] md:w-[560px] lg:w-[650px] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[470px] rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.015]"
              >
                <img
                  src={pic.img}
                  alt={pic.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── 4. CONTENT CATEGORIES (Figma: fotter continer 1) ── */}
      <section className="w-full bg-white py-14 px-4 sm:px-8 lg:px-14 border-t border-slate-100">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Column 1: Art */}
          <div className="flex flex-col">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#000000] mb-6">
              Art
            </h2>
            <ul className="flex flex-col gap-3 font-sans text-xl sm:text-2xl text-[#000000]">
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Child Development</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Epidemics</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Fashion</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">History</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Human Anatomy</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Literature</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Psychology</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Public Speaking</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Shakespeare</li>
            </ul>
          </div>

          {/* Column 2: Business & Management */}
          <div className="flex flex-col">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#000000] mb-6">
              Business & Management
            </h2>
            <ul className="flex flex-col gap-3 font-sans text-xl sm:text-2xl text-[#000000] underline">
              <li className="cursor-pointer hover:text-[#4B6BB6]">Business Administration</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Business Analysis</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Corporate Finance</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Economics</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Entrepreneurship</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Finance</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Financial Literacy</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Leadership</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Project Management</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Statistics</li>
            </ul>
          </div>

          {/* Column 3: Engineering */}
          <div className="flex flex-col">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#000000] mb-6">
              Engineering
            </h2>
            <ul className="flex flex-col gap-3 font-sans text-xl sm:text-2xl text-[#000000]">
              <li className="cursor-pointer hover:text-[#4B6BB6]">Aerospace</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Engineering</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Biomedical</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Engineering</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Chemical</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Engineering</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Civil Engineering</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Computer Engineering</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Electrical engineering</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Industrial Engineering</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Mechanical engineering</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Software Engineering</li>
              <li className="font-bold underline cursor-pointer hover:text-[#4B6BB6]">Structural engineering</li>
              <li className="cursor-pointer hover:text-[#4B6BB6]">Humanities</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── 4. DEEP-BLUE FOOTER SECTION (Figma: continer #4B6BB6) ── */}
      <footer className="w-full bg-[#4B6BB6] text-white pt-16 pb-12 px-4 sm:px-8 lg:px-14 mt-auto">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-14">
          
          {/* Top Row: edX Logo & Social Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-white/20">
            {/* edX by 2u Badge */}
            <div className="bg-white text-black px-6 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <span className="font-serif italic font-bold text-4xl tracking-tight text-black">e</span>
              <span className="font-sans font-bold text-4xl tracking-tight text-black">D</span>
              <span className="font-serif italic font-bold text-4xl tracking-tight text-black">x</span>
              <span className="font-serif italic text-xl text-slate-500 ml-1">by</span>
              <span className="font-serif font-bold text-2xl text-black">2u</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-white">
              {/* Facebook */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 4 Main Columns (Figma: brpwes, earn, complete bechlor, step by step guide) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Column 1 */}
            <div>
              <h3 className="font-sans font-bold text-lg mb-4 text-white">Browse Courses</h3>
              <ul className="flex flex-col gap-2 text-sm text-white/90">
                <li className="hover:underline cursor-pointer">Learn AI</li>
                <li className="hover:underline cursor-pointer">Learn ChatGPT</li>
                <li className="hover:underline cursor-pointer">Learn Spanish</li>
                <li className="hover:underline cursor-pointer">Learn Python</li>
                <li className="hover:underline cursor-pointer">Learn Excel</li>
                <li className="hover:underline cursor-pointer">Learn Software Engineering</li>
                <li className="hover:underline cursor-pointer">Learn Blockchain</li>
                <li className="hover:underline cursor-pointer">Learn Computer Programming</li>
                <li className="hover:underline cursor-pointer">Learn Economics</li>
                <li className="hover:underline cursor-pointer">Learn Architecture</li>
                <li className="hover:underline cursor-pointer">Learn Project Management</li>
                <li className="hover:underline cursor-pointer">Learn Business Administration</li>
                <li className="font-semibold text-white hover:underline cursor-pointer pt-2">see more Courses</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-sans font-bold text-lg mb-4 text-white">Earn your online graduate degree</h3>
              <ul className="flex flex-col gap-2 text-sm text-white/90 underline">
                <li className="hover:text-white cursor-pointer">Master's in Business Administration</li>
                <li className="hover:text-white cursor-pointer">Master's in Public Health</li>
                <li className="hover:text-white cursor-pointer">Master's in Social Work</li>
                <li className="hover:text-white cursor-pointer">Master's in Nursing</li>
                <li className="hover:text-white cursor-pointer">Master's in Data Science</li>
                <li className="hover:text-white cursor-pointer">Master's in Engineering</li>
                <li className="hover:text-white cursor-pointer">Master's in Speech Pathology</li>
                <li className="hover:text-white cursor-pointer">Master's in Counseling/Psychology</li>
                <li className="hover:text-white cursor-pointer">Master's Degree in Healthcare</li>
                <li className="hover:text-white cursor-pointer">Master's Degree in Education</li>
                <li className="hover:text-white cursor-pointer">Master's Degree in AI</li>
                <li className="hover:text-white cursor-pointer">Master's Degree in Computer Science</li>
                <li className="font-semibold cursor-pointer pt-2">see more Graduate Degrees</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-sans font-bold text-lg mb-4 text-white">Complete your bachelor's online</h3>
              <ul className="flex flex-col gap-2 text-sm text-white/90">
                <li className="hover:underline cursor-pointer">Bachelor's in Business</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Computer Science / Data Science</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Health and Nursing</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Accounting</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Finance</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Psychology</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Public Health</li>
                <li className="hover:underline cursor-pointer">Bachelor's in Social Work</li>
                <li className="font-semibold text-white hover:underline cursor-pointer pt-2">see more Undergraduate Degree</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-sans font-bold text-lg mb-4 text-white">step-by-step guides</h3>
              <ul className="flex flex-col gap-2 text-sm text-white/90">
                <li className="hover:underline cursor-pointer">Become a Cybersecurity Analyst</li>
                <li className="hover:underline cursor-pointer">Become a Data Scientist</li>
                <li className="hover:underline cursor-pointer">Become a Social Media Manager</li>
                <li className="hover:underline cursor-pointer">Become a Software Developer</li>
                <li className="hover:underline cursor-pointer">Become a Software Engineer</li>
                <li className="font-semibold text-white hover:underline cursor-pointer pt-2">see more Guides</li>
              </ul>
            </div>
          </div>

          {/* Sub-footer Links: edX, Connect, Legal (Figma: footer container 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/20">
            {/* edX */}
            <div>
              <h4 className="font-serif font-bold text-xl mb-3 text-white">edX</h4>
              <ul className="flex flex-col gap-1.5 text-sm text-white/80">
                <li className="hover:underline cursor-pointer">Partner With Us</li>
                <li className="hover:underline cursor-pointer">About</li>
                <li className="hover:underline cursor-pointer">edX For Business</li>
                <li className="hover:underline cursor-pointer">Affiliates</li>
                <li className="hover:underline cursor-pointer">Open edX</li>
                <li className="hover:underline cursor-pointer">2U Advisory Council</li>
                <li className="hover:underline cursor-pointer">Careers</li>
                <li className="hover:underline cursor-pointer">News</li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-serif font-bold text-xl mb-3 text-white">Connect</h4>
              <ul className="flex flex-col gap-1.5 text-sm text-white/80">
                <li className="hover:underline cursor-pointer">Idea Hub</li>
                <li className="hover:underline cursor-pointer">Contact Us</li>
                <li className="hover:underline cursor-pointer">Help Center</li>
                <li className="hover:underline cursor-pointer">Security</li>
                <li className="hover:underline cursor-pointer">Media Kit</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-serif font-bold text-xl mb-3 text-white">Legal</h4>
              <ul className="flex flex-col gap-1.5 text-sm text-white/80">
                <li className="hover:underline cursor-pointer">Terms of Service & Honor Code</li>
                <li className="hover:underline cursor-pointer">Privacy Policy</li>
                <li className="hover:underline cursor-pointer">Cookie Policy</li>
                <li className="hover:underline cursor-pointer">Accessibility Policy</li>
                <li className="hover:underline cursor-pointer">Trademark Policy</li>
                <li className="hover:underline cursor-pointer">Modern Slavery Statement</li>
                <li className="hover:underline cursor-pointer">Sitemap</li>
                <li className="hover:underline cursor-pointer">Your Privacy Choices</li>
              </ul>
            </div>
          </div>

          {/* Centered: Choose your language (Figma: chose your language) */}
          <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10 gap-3">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-2xl sm:text-3xl font-serif font-bold text-white hover:opacity-90 underline transition-opacity"
            >
              choose your language
            </button>
            <div className="flex items-center gap-3 text-sm text-white/90">
              <span className="font-medium">English</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Spanish</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Urdu</span>
            </div>
            <p className="text-xs text-white/70 mt-2">
              © 2024 edX LLC. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
