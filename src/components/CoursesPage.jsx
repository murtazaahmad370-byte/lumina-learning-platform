import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { allCoursesData, categories } from '../data/coursesData';
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  Eye, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  ArrowUpDown, 
  Tag, 
  Play, 
  CheckCircle2 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

export const CoursesPage = ({ onSelectCourse, onWatchCourse, onBackToLanding }) => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All Pricing');
  const [sortBy, setSortBy] = useState('popular');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Memoized filter logic
  const filteredCourses = useMemo(() => {
    return allCoursesData
      .filter((course) => {
        const matchesCategory = 
          activeCategory === 'All' || 
          activeCategory === 'All Courses' || 
          course.category.toLowerCase() === activeCategory.toLowerCase();

        const matchesDifficulty = 
          selectedDifficulty === 'All Levels' || 
          course.difficulty === selectedDifficulty;

        const matchesPricing = 
          selectedPrice === 'All Pricing' || 
          (selectedPrice === 'Free' ? course.isFree : !course.isFree);

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

  const handleResetFilters = () => {
    setActiveCategory('All Courses');
    setSelectedDifficulty('All Levels');
    setSelectedPrice('All Pricing');
    setSearchQuery('');
    setSortBy('popular');
  };

  const activeFiltersCount = 
    (activeCategory !== 'All' && activeCategory !== 'All Courses' ? 1 : 0) + 
    (selectedDifficulty !== 'All Levels' ? 1 : 0) + 
    (selectedPrice !== 'All Pricing' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#D4C79C] dark:bg-[#0E131F] text-[#131720] dark:text-white transition-colors duration-300 pb-20">
      
      {/* ── HEADER BANNER ── */}
      <div className="w-full bg-[#D4C79C] dark:bg-[#0E131F] border-b border-black/5 dark:border-slate-800 pt-8 pb-10 transition-colors">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div>
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-xs font-poppins font-bold text-[#131720] dark:text-white shadow-sm border border-white dark:border-slate-700 mb-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <h1 className="font-poppins font-bold text-3xl sm:text-5xl text-white dark:text-white tracking-tight drop-shadow-sm">
              All Courses Catalog
            </h1>
            <p className="font-poppins text-sm sm:text-base text-[#385396] dark:text-slate-300 mt-1 max-w-xl">
              Explore our full directory of certified courses in Software Engineering, AI & Data, and Cloud Systems.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="bg-white/80 dark:bg-slate-800/90 px-6 py-4 rounded-2xl border border-white dark:border-slate-700 shadow-md flex items-center gap-4 self-start md:self-auto">
            <div className="w-12 h-12 rounded-xl bg-[#4B6BB6]/15 text-[#4B6BB6] dark:text-[#6B8BD6] flex items-center justify-center font-bold text-lg">
              {filteredCourses.length}
            </div>
            <div>
              <span className="font-poppins font-bold text-base block text-[#131720] dark:text-white">
                Courses Found
              </span>
              <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
                Across leading tech disciplines
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-14 pt-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-white/80 dark:border-slate-700 shadow-md mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses by keyword, instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 text-sm font-inter text-[#131720] dark:text-white placeholder-slate-400 pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#4B6BB6]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-poppins font-semibold text-xs tracking-wide whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#4B6BB6] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? '✦ All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Sort & Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-poppins font-semibold text-[#131720] dark:text-white outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="dark:bg-slate-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-poppins text-xs font-semibold bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isSidebarOpen ? 'Hide Filters' : 'Filters'}</span>
            </button>
          </div>

        </div>

        {/* ── GRID + SIDEBAR ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filters */}
          {isSidebarOpen && (
            <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
              
              {/* Pricing Filter */}
              <div className="bg-white/95 dark:bg-slate-800/90 rounded-2xl p-5 border border-white/80 dark:border-slate-700 shadow-sm">
                <h3 className="font-poppins font-bold text-sm text-[#131720] dark:text-white mb-3">
                  Pricing Tier
                </h3>
                <div className="flex flex-col gap-2">
                  {priceOptions.map((tier) => (
                    <label key={tier} className="flex items-center justify-between text-xs font-inter text-slate-700 dark:text-slate-300 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="courses_price"
                          checked={selectedPrice === tier}
                          onChange={() => setSelectedPrice(tier)}
                          className="accent-[#4B6BB6]"
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

              {/* Difficulty Filter */}
              <div className="bg-white/95 dark:bg-slate-800/90 rounded-2xl p-5 border border-white/80 dark:border-slate-700 shadow-sm">
                <h3 className="font-poppins font-bold text-sm text-[#131720] dark:text-white mb-3">
                  Difficulty Level
                </h3>
                <div className="flex flex-col gap-2">
                  {difficultyLevels.map((lvl) => (
                    <label key={lvl} className="flex items-center justify-between text-xs font-inter text-slate-700 dark:text-slate-300 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="courses_difficulty"
                          checked={selectedDifficulty === lvl}
                          onChange={() => setSelectedDifficulty(lvl)}
                          className="accent-[#4B6BB6]"
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

              {/* Reset Button */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-poppins font-semibold text-xs border border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters ({activeFiltersCount})</span>
                </button>
              )}

            </aside>
          )}

          {/* 3 / 4-Column Grid */}
          <div className="flex-1 w-full min-w-0">
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
                    className="group bg-white dark:bg-slate-800/90 rounded-[26px] p-4 border border-white/80 dark:border-slate-700 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-900 mb-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 text-[#131720] text-[11px] font-poppins font-bold px-3 py-1 rounded-full shadow-sm">
                        {course.category}
                      </div>
                      <div className={`absolute bottom-3 right-3 text-xs font-inter font-bold px-3 py-1 rounded-full shadow-md ${
                        course.isFree ? 'bg-emerald-600 text-white' : 'bg-[#4B6BB6] text-white'
                      }`}>
                        {course.price}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-inter px-2.5 py-0.5 rounded-full">
                        {course.difficulty}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 justify-between px-1">
                      <div>
                        <h3 className="font-poppins font-bold text-base text-[#131720] dark:text-white group-hover:text-[#4B6BB6] transition-colors leading-snug line-clamp-2 mb-1.5">
                          {course.title}
                        </h3>
                        <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mb-2">
                          by <span className="font-semibold text-slate-800 dark:text-slate-200">{course.instructor}</span>
                        </p>
                        <p className="font-inter text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {course.description}
                        </p>
                      </div>

                      {/* Footer info */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-[#4B6BB6] text-[#4B6BB6]" />
                          <span className="font-bold text-[#131720] dark:text-white">{course.rating}</span>
                          <span className="text-slate-400 text-[11px]">({course.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onWatchCourse) onWatchCourse(course);
                              else if (onSelectCourse) onSelectCourse(course);
                            }}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#4B6BB6]/10 hover:bg-[#4B6BB6] text-[#4B6BB6] hover:text-white font-inter font-semibold text-[11px] transition-colors ml-1"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Watch</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-3xl p-12 text-center border border-white dark:border-slate-700 shadow-md">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-poppins font-bold text-lg text-[#131720] dark:text-white mb-2">
                  No courses found
                </h3>
                <p className="font-inter text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Try adjusting your search terms or filter selections.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 bg-[#4B6BB6] text-white text-xs font-semibold rounded-full"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
