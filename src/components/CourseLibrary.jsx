import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allCoursesData, categories } from '../data/coursesData';
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  Eye, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ChevronDown, 
  Check, 
  ArrowUpDown,
  Tag,
  Play,
  Heart
} from 'lucide-react';
import { useBookmarks } from '../lib/useSupabaseHooks';

const difficultyLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const priceOptions = ['All Pricing', 'Free', 'Paid'];
const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'duration', label: 'Duration: High to Low' },
  { id: 'title', label: 'Alphabetical (A-Z)' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

export const CourseLibrary = ({ 
  searchQuery: externalSearch = '', 
  onSelectCourse,
  onWatchCourse,
  onViewAllCourses,
  activeCategory: propCategory,
  setActiveCategory: propSetCategory
}) => {
  const [internalSearch, setInternalSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All Pricing');
  const [sortBy, setSortBy] = useState('popular');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bookmarkToast, setBookmarkToast] = useState(null);

  // Supabase bookmarks
  const { bookmarkedIds, toggleBookmark, isLoggedIn } = useBookmarks();

  const handleBookmark = async (e, course) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setBookmarkToast('Please sign in to bookmark courses');
      setTimeout(() => setBookmarkToast(null), 2500);
      return;
    }
    const added = await toggleBookmark(course);
    setBookmarkToast(added ? '❤️ Bookmarked!' : 'Removed from bookmarks');
    setTimeout(() => setBookmarkToast(null), 2000);
  };


  // Synchronize category state
  const [localCategory, setLocalCategory] = useState('All');
  const activeCategory = propCategory !== undefined ? (propCategory === 'All Courses' ? 'All' : propCategory) : localCategory;
  const setActiveCategory = (cat) => {
    if (propSetCategory) {
      propSetCategory(cat === 'All' ? 'All Courses' : cat);
    }
    setLocalCategory(cat);
  };

  const searchQuery = externalSearch || internalSearch;

  // Memoized filtered & sorted courses
  const filteredCourses = useMemo(() => {
    return allCoursesData
      .filter((course) => {
        // Category filter
        const matchesCategory = 
          activeCategory === 'All' || 
          activeCategory === 'All Courses' || 
          course.category.toLowerCase() === activeCategory.toLowerCase();

        // Difficulty filter
        const matchesDifficulty = 
          selectedDifficulty === 'All Levels' || 
          course.difficulty === selectedDifficulty;

        // Pricing filter (Free vs Paid)
        const matchesPricing = 
          selectedPrice === 'All Pricing' || 
          (selectedPrice === 'Free' ? course.isFree : !course.isFree);

        // Search query (Title, Instructor, Description, Category)
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          q === '' ||
          course.title.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q) ||
          course.category.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q);

        return matchesCategory && matchesDifficulty && matchesPricing && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'popular') return parseInt(b.students.replace(/,/g, '')) - parseInt(a.students.replace(/,/g, ''));
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [activeCategory, selectedDifficulty, selectedPrice, searchQuery, sortBy]);

  // Clear all filters
  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedDifficulty('All Levels');
    setSelectedPrice('All Pricing');
    setInternalSearch('');
    setSortBy('popular');
  };

  const activeFiltersCount = 
    (activeCategory !== 'All' && activeCategory !== 'All Courses' ? 1 : 0) +
    (selectedDifficulty !== 'All Levels' ? 1 : 0) +
    (selectedPrice !== 'All Pricing' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <section id="courses-section" className="w-full px-4 sm:px-8 lg:px-14 py-16 transition-colors">
      <div className="max-w-[1440px] mx-auto">

        {/* Bookmark toast */}
        {bookmarkToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#131720] text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-poppins font-medium border border-white/20 animate-fadeIn">
            {bookmarkToast}
          </div>
        )}

        {/* ── HEADER & DISCOVERY INTRO ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/40 border border-white/60 shadow-sm mb-3">
              <Sparkles className="w-4 h-4 text-[#4B6BB6]" />
              <span className="font-poppins font-semibold text-xs text-[#131720] uppercase tracking-wider">
                Explore Curriculum
              </span>
            </div>

            <h2 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-[54px] text-white leading-[1.08] tracking-tight drop-shadow-sm">
              Course Library
            </h2>

            <p className="font-poppins font-normal text-base sm:text-lg text-[#385396] max-w-xl mt-2">
              Browse world-class tracks in <strong>Software Engineering</strong>, <strong>AI & Data</strong>, and <strong>Cloud Systems</strong>.
            </p>
          </div>

          {/* Quick Stats & View All Action Pill */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => onViewAllCourses && onViewAllCourses()}
              className="px-6 py-3.5 rounded-2xl bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-xs tracking-wider shadow-lg shadow-[#4B6BB6]/30 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <span>View All Courses ({allCoursesData.length})</span>
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── MODERN SAAS FILTER CONTROL BAR ── */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Instant Search Bar with Clear Button */}
          <div className="relative w-full lg:w-96">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by title, topic, or instructor..."
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              className="w-full bg-slate-50 text-sm font-inter text-[#131720] placeholder-slate-400 pl-11 pr-10 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B6BB6] focus:bg-white transition-all shadow-inner"
            />
            {internalSearch && (
              <button 
                onClick={() => setInternalSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Quick Pills matching Prompt (Art, Business, Engineering, All) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
            {categories.map((cat) => {
              const isSelected = activeCategory.toLowerCase() === cat.toLowerCase() || (cat === 'All' && activeCategory === 'All Courses');
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl font-poppins font-semibold text-xs tracking-wide whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#4B6BB6] text-white shadow-md shadow-[#4B6BB6]/30 scale-102'
                      : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {cat === 'All' ? '✦ All Categories' : cat}
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown & Sidebar Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-slate-100/80 px-3.5 py-2 rounded-xl border border-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-poppins font-semibold text-[#131720] outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Filters Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-poppins text-xs font-semibold border transition-all ${
                isSidebarOpen 
                  ? 'bg-[#4B6BB6]/15 text-[#4B6BB6] border-[#4B6BB6]/40' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#4B6BB6] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* ── MAIN CONTENT: SIDEBAR FILTERS + 3/4 COLUMN GRID ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ── SIDEBAR FILTERS PANEL ── */}
          {isSidebarOpen && (
            <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5 animate-fadeIn">
              
              {/* Filter Box: Categories */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-sm">
                <h3 className="font-poppins font-bold text-sm text-[#131720] mb-3 flex items-center justify-between">
                  <span>Categories</span>
                  <Tag className="w-3.5 h-3.5 text-[#4B6BB6]" />
                </h3>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-inter font-semibold transition-all text-left ${
                        (activeCategory.toLowerCase() === cat.toLowerCase() || (cat === 'All' && activeCategory === 'All Courses'))
                          ? 'bg-[#4B6BB6] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] opacity-70">
                        {cat === 'All' 
                          ? allCoursesData.length 
                          : allCoursesData.filter((c) => c.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Box: Pricing (Free / Paid) */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-sm">
                <h3 className="font-poppins font-bold text-sm text-[#131720] mb-3">
                  Pricing Tier
                </h3>
                <div className="flex flex-col gap-2">
                  {priceOptions.map((tier) => (
                    <label 
                      key={tier}
                      className="flex items-center justify-between text-xs font-inter text-slate-700 cursor-pointer hover:text-[#4B6BB6] select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="pricing"
                          checked={selectedPrice === tier}
                          onChange={() => setSelectedPrice(tier)}
                          className="w-3.5 h-3.5 text-[#4B6BB6] accent-[#4B6BB6]"
                        />
                        <span>{tier}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {tier === 'All Pricing' 
                          ? allCoursesData.length 
                          : tier === 'Free' 
                            ? allCoursesData.filter(c => c.isFree).length 
                            : allCoursesData.filter(c => !c.isFree).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Box: Difficulty Level */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-sm">
                <h3 className="font-poppins font-bold text-sm text-[#131720] mb-3">
                  Difficulty Level
                </h3>
                <div className="flex flex-col gap-2">
                  {difficultyLevels.map((lvl) => (
                    <label 
                      key={lvl}
                      className="flex items-center justify-between text-xs font-inter text-slate-700 cursor-pointer hover:text-[#4B6BB6] select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="difficulty"
                          checked={selectedDifficulty === lvl}
                          onChange={() => setSelectedDifficulty(lvl)}
                          className="w-3.5 h-3.5 text-[#4B6BB6] accent-[#4B6BB6]"
                        />
                        <span>{lvl}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {lvl === 'All Levels'
                          ? allCoursesData.length
                          : allCoursesData.filter(c => c.difficulty === lvl).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear All Filters Button */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-poppins font-semibold text-xs border border-red-200 transition-all shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset All Filters ({activeFiltersCount})</span>
                </button>
              )}

            </aside>
          )}

          {/* ── 3 / 4-COLUMN COURSE CARDS GRID ── */}
          <div className="flex-1 min-w-0 w-full">
            
            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <span className="text-xs font-inter text-white/80">Active Filters:</span>
                {activeCategory !== 'All' && activeCategory !== 'All Courses' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#131720] text-xs font-medium shadow-sm">
                    Category: <strong>{activeCategory}</strong>
                    <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => setActiveCategory('All')} />
                  </span>
                )}
                {selectedDifficulty !== 'All Levels' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#131720] text-xs font-medium shadow-sm">
                    Level: <strong>{selectedDifficulty}</strong>
                    <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => setSelectedDifficulty('All Levels')} />
                  </span>
                )}
                {selectedPrice !== 'All Pricing' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#131720] text-xs font-medium shadow-sm">
                    Price: <strong>{selectedPrice}</strong>
                    <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => setSelectedPrice('All Pricing')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#131720] text-xs font-medium shadow-sm">
                    Search: "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => setInternalSearch('')} />
                  </span>
                )}
              </div>
            )}

            {filteredCourses.length > 0 ? (
              <motion.div 
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? 'xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6`}
              >
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    layout
                    variants={cardVariants}
                    whileHover={{ y: -8, transition: { duration: 0.2, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="group relative bg-[#FCFBF8] hover:bg-white rounded-[26px] p-4 border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(75,107,182,0.18)] transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    
                    {/* Course Thumbnail with Badges */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-900 mb-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Pill Tag */}
                      <div className="absolute top-3 left-3 bg-[#F8FAFC]/95 backdrop-blur-md text-[#131720] text-[11px] font-poppins font-bold px-3 py-1 rounded-full shadow-sm">
                        {course.category}
                      </div>

                      {/* ❤ Bookmark Heart Button */}
                      <button
                        onClick={(e) => handleBookmark(e, course)}
                        className={`absolute top-3 right-14 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-200 hover:scale-110 ${
                          bookmarkedIds.has(String(course.id))
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 text-slate-400 hover:text-rose-500'
                        }`}
                        title={bookmarkedIds.has(String(course.id)) ? 'Remove bookmark' : 'Save course'}
                      >
                        <Heart className={`w-4 h-4 ${bookmarkedIds.has(String(course.id)) ? 'fill-white' : ''}`} />
                      </button>

                      {/* Price Badge */}
                      <div className={`absolute bottom-3 right-3 text-xs font-inter font-bold px-3 py-1 rounded-full shadow-md ${
                        course.isFree
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#4B6BB6] text-white'
                      }`}>
                        {course.price}
                      </div>

                      {/* Difficulty Tag */}
                      {course.difficulty && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-inter px-2.5 py-0.5 rounded-full">
                          {course.difficulty}
                        </div>
                      )}

                      {/* Hover Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onWatchCourse) onWatchCourse(course);
                            else if (onSelectCourse) onSelectCourse(course);
                          }}
                          className="w-full py-2.5 rounded-full bg-[#4B6BB6] hover:bg-[#385396] text-white font-poppins font-bold text-xs shadow-lg flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Watch Video</span>
                        </button>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#131720] font-poppins font-semibold text-[11px] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye className="w-3 h-3 text-[#4B6BB6]" />
                          Details
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-1 justify-between px-1">
                      <div>
                        {/* Title */}
                        <h3 className="font-poppins font-bold text-base sm:text-lg text-[#131720] group-hover:text-[#4B6BB6] transition-colors leading-snug line-clamp-2 mb-1.5">
                          {course.title}
                        </h3>

                        {/* Instructor */}
                        <p className="font-inter text-xs text-[#737B8C] mb-2.5">
                          by <span className="font-semibold text-[#131720]/90">{course.instructor}</span>
                        </p>

                        {/* Snippet */}
                        <p className="font-inter text-xs text-[#737B8C] line-clamp-2 leading-relaxed mb-4">
                          {course.description}
                        </p>
                      </div>

                      {/* Footer Metadata */}
                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs mt-auto">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-[#4B6BB6]/15 text-[#4B6BB6] flex items-center justify-center">
                            <Star className="w-3.5 h-3.5 fill-[#4B6BB6]" />
                          </div>
                          <span className="font-inter font-bold text-[#131720]">
                            {course.rating}
                          </span>
                          <span className="font-inter text-[#737B8C] text-[11px]">
                            ({course.reviews})
                          </span>
                        </div>

                        {/* Direct Watch Link Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onWatchCourse) onWatchCourse(course);
                            else if (onSelectCourse) onSelectCourse(course);
                          }}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#4B6BB6]/10 hover:bg-[#4B6BB6] text-[#4B6BB6] hover:text-white font-inter font-semibold text-[11px] transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Watch</span>
                        </button>
                      </div>

                    </div>

                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* No Courses Empty State */
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 text-center border border-white shadow-md max-w-lg mx-auto">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-poppins font-bold text-xl text-[#131720] mb-2">
                  No matching courses found
                </h3>
                <p className="font-inter text-sm text-slate-500 mb-6">
                  We couldn't find any courses matching your filter criteria. Try resetting your search or filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#4B6BB6] hover:bg-[#385396] text-white rounded-full font-poppins font-semibold text-xs shadow-md transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
