import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowRight, Calendar, Bookmark, Share2, BookOpen } from 'lucide-react';
import { blogs } from '../data/blogs';
import { Link } from 'react-router-dom';

export default function Research() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Peptide Science', 'Lab Protocols', 'Regulatory', 'Stability News'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || blog.excerpt.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 lg:gap-10 border-b border-brand-border pb-10 sm:pb-16 lg:pb-20">
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 text-brand-purple">
               <BookOpen size={18} />
               <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">GHOSTLINK SCIENTIFIC DATABASE</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter leading-[0.95] italic uppercase">The Hub</h1>
            <p className="text-base sm:text-lg lg:text-xl text-brand-muted leading-relaxed font-medium max-w-lg">
              Peer-reviewed insights, synthetic breakthroughs, and advanced laboratory investigative protocols.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80 group">
              <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-purple transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH ARCHIVES..." 
                className="w-full bg-brand-surface border border-brand-border pl-11 sm:pl-14 pr-4 py-4 sm:py-5 rounded-2xl text-[10px] sm:text-xs font-bold tracking-widest focus:outline-none focus:border-brand-purple transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all border ${
                activeCategory === cat 
                ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20' 
                : 'bg-brand-surface text-brand-muted border-brand-border hover:border-brand-purple'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredBlogs.length > 0 && activeCategory === 'All' && searchQuery === '' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative"
          >
            <Link to={`/research/${filteredBlogs[0].slug}`} className="block relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-brand-border shadow-2xl bg-brand-bg">
               <img src={filteredBlogs[0].image} alt="featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent p-6 sm:p-10 lg:p-12 flex flex-col justify-end">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-4 sm:mb-8">
                    <span className="bg-brand-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest uppercase shadow-xl">EDITORIAL FEATURE</span>
                    <div className="flex items-center gap-2 sm:gap-3 text-brand-muted text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                      <Calendar size={14} /> {filteredBlogs[0].date}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-black group-hover:text-brand-purple transition-colors mb-4 sm:mb-8 leading-[1] sm:leading-[0.95] max-w-4xl italic uppercase">
                    {filteredBlogs[0].title}
                  </h2>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center">
                       <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Read Protocol Insight</span>
                  </div>
               </div>
            </Link>
          </motion.div>
        )}

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20">
          <AnimatePresence mode='popLayout'>
            {filteredBlogs.slice(activeCategory === 'All' && searchQuery === '' ? 1 : 0).map((blog, idx) => (
              <motion.div 
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col"
              >
                <Link to={`/research/${blog.slug}`} className="block aspect-[4/3] rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-brand-border relative shadow-lg bg-brand-bg mb-5 sm:mb-8">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80" />
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2">
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-bg/80 backdrop-blur-md border border-brand-border flex items-center justify-center hover:text-brand-purple transition-colors">
                        <Bookmark size={14} />
                     </button>
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-bg/80 backdrop-blur-md border border-brand-border flex items-center justify-center hover:text-brand-purple transition-colors">
                        <Share2 size={14} />
                     </button>
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col space-y-3 sm:space-y-4">
                   <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-brand-muted">
                      <span className="text-brand-purple">APR / 2026</span>
                      <span>•</span>
                      <span className="truncate">{blog.author === 'GhostLabz Research Team' ? 'SCIENTIFIC ANALYSIS' : blog.author.toUpperCase()}</span>
                   </div>
                   <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black group-hover:text-brand-purple transition-colors leading-[1.1] uppercase italic">
                     <Link to={`/research/${blog.slug}`}>{blog.title}</Link>
                   </h3>
                   <p className="text-brand-muted text-xs sm:text-sm line-clamp-3 leading-relaxed font-medium">
                     {blog.excerpt}
                   </p>
                   <div className="pt-4 sm:pt-6 mt-auto">
                      <Link to={`/research/${blog.slug}`} className="inline-flex items-center gap-3 sm:gap-4 text-[10px] font-black tracking-widest uppercase border-b-2 border-brand-border pb-2 sm:pb-3 group/link hover:border-brand-purple transition-all">
                        VIEW PROTOCOL <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-24 sm:py-40 border-2 border-dashed border-brand-border rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem]">
             <p className="text-brand-muted font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">No research matches your current protocol</p>
          </div>
        )}

        {/* Newsletter / SEO Section */}
        <section className="bg-brand-surface rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-10 lg:p-20 border border-brand-border">
           <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center text-center lg:text-left">
              <div className="flex-1 space-y-4 sm:space-y-6">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black italic tracking-tighter uppercase leading-[1.05]">Subscribe to <br /> <span className="text-brand-purple">Synthetic Insights</span></h2>
                 <p className="text-sm sm:text-base text-brand-muted font-medium">Get batch-release notifications, purity benchmarks, and peptide science breakthroughs directly to your secure inbox.</p>
              </div>
              <div className="w-full lg:w-96">
                 <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input type="email" placeholder="ENCRYPTED EMAIL" className="flex-1 bg-brand-bg border border-brand-border px-5 sm:px-6 py-3 sm:py-4 rounded-2xl focus:border-brand-purple outline-none text-sm" />
                    <button className="bg-brand-purple text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-[10px] sm:text-xs tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">SIGN UP</button>
                 </form>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
