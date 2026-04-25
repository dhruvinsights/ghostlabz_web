import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, ArrowRight, FlaskConical, Sun, Moon, Eye, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../hooks/useCart';

type Theme = 'light' | 'dark' | 'eye-care';

export default function Navbar() {
  const { count } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'light');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Apply the theme class to body for Tailwind variant support
    document.body.className = theme;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'eye-care'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled || !isHome 
        ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-border text-brand-text shadow-sm' 
        : 'bg-transparent text-white'
    }`}>
      {/* Top Banner */}
      <div className="bg-brand-purple text-white overflow-hidden relative group cursor-pointer h-7 sm:h-8 flex items-center">
        <motion.div 
          className="whitespace-nowrap flex gap-6 sm:gap-12 items-center w-full justify-center px-4"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <span className="hidden sm:inline-flex text-[9px] sm:text-[10px] font-bold tracking-[0.2em] font-mono items-center gap-2">
            STRETCHED PROTOCOL: ACTIVATED <ArrowRight size={10} />
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] font-mono flex items-center gap-2 group-hover:scale-110 transition-transform">
            <span className="hidden sm:inline">SYSTEM TIME:</span>
            <span className="sm:hidden">TIME:</span>
            {formatTime(currentTime)} <span className="animate-pulse">●</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] font-mono flex items-center gap-2">
             <span className="hidden sm:inline">FREE SHIPPING ON ORDERS $200+</span>
             <span className="sm:hidden">FREE SHIPPING $200+</span>
             <ArrowRight size={10} />
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <FlaskConical className="text-brand-purple group-hover:rotate-12 transition-transform duration-500" size={24} />
          <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
            GHOST<span className="text-brand-purple group-hover:ml-1 transition-all duration-300">LABZ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {[
            { label: 'Home', path: '/' },
            { label: 'Catalog', path: '/catalog' },
            { label: 'Research', path: '/research' },
            { label: 'About', path: '/about-us' },
            { label: 'Contact', path: '/contact' },
          ].map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  isActive ? 'text-brand-purple' : 'hover:text-brand-purple'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-brand-purple transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-5">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden sm:flex hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-white/10 items-center justify-center"
            aria-label="Search"
          >
            {isSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          
          <button 
            onClick={toggleTheme}
            className="hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-white/10"
            title="Toggle Theme"
          >
            {theme === 'light' && <Moon size={18} />}
            {theme === 'dark' && <Eye size={18} />}
            {theme === 'eye-care' && <Sun size={18} />}
          </button>

          <Link to="/account" className="hidden lg:block hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-white/10" aria-label="Account">
            <User size={18} />
          </Link>

          <Link to="/cart" className="relative hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-white/10" aria-label="Cart">
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-brand-purple text-white text-[9px] sm:text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <Link 
            to="/catalog"
            className="hidden xl:flex items-center gap-2 bg-brand-purple text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest hover:brightness-110 transition-all group shadow-lg shadow-brand-purple/20"
          >
            BROWSE CATALOG
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Full-width Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-brand-bg text-brand-text border-b border-brand-border overflow-hidden"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <div className="relative group">
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-brand-muted" size={20} />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search compounds, research..."
                  className="w-full bg-brand-surface border-2 border-brand-border rounded-2xl py-4 sm:py-6 pl-12 sm:pl-16 pr-16 sm:pr-8 text-base sm:text-xl focus:outline-none focus:border-brand-purple transition-all"
                />
                <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 text-brand-muted">
                  <Command size={16} />
                  <span className="text-xs font-mono">F</span>
                </div>
              </div>
              <div className="mt-5 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 items-center">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-muted">Suggested:</span>
                {['GHK-Cu', 'Tesamorelin', 'Stability', 'Wholesale'].map(tag => (
                  <button key={tag} className="px-3 sm:px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border text-[10px] sm:text-xs hover:border-brand-purple hover:text-brand-purple transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg text-brand-text border-t border-brand-border overflow-hidden"
          >
             <div className="flex flex-col p-5 sm:p-6 gap-4 sm:gap-5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Catalog', path: '/catalog' },
                { label: 'Research', path: '/research' },
                { label: 'About Us', path: '/about-us' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-lg sm:text-xl font-serif border-b border-brand-border pb-2 transition-colors ${isActive ? 'text-brand-purple' : 'hover:text-brand-purple'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex justify-between items-center pt-2 sm:pt-4">
                <button onClick={toggleTheme} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-purple">
                  {theme === 'eye-care' ? 'SCIENTIFIC' : theme.toUpperCase()} MODE
                </button>
                <Link to="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-xs sm:text-sm font-bold">MY ACCOUNT</Link>
              </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
