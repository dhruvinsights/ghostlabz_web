import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, Calendar, Share2, Bookmark, Eye, Maximize2, Minimize2 } from 'lucide-react';

export default function ResearchDetail() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  const [readingMode, setReadingMode] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledValue = (winScroll / height) * 100;
      setScrolled(scrolledValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="pt-40 text-center min-h-screen bg-brand-bg">
        <h1 className="text-4xl font-serif mb-8">Research Document Not Found</h1>
        <Link to="/research" className="text-brand-purple font-bold uppercase tracking-widest hover:underline">Return to Hub</Link>
      </div>
    );
  }

  return (
    <div className={`pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 transition-all duration-700 ${readingMode ? 'bg-[#ffffff] text-black selection:bg-brand-purple/10' : 'bg-brand-bg text-brand-text'}`}>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 sm:h-1.5 z-[60] bg-brand-border">
         <motion.div 
           className="h-full bg-brand-purple shadow-[0_0_10px_#9D7BFF]"
           style={{ width: `${scrolled}%` }}
         />
      </div>

      <div className={`max-w-7xl mx-auto ${readingMode ? 'max-w-3xl' : 'space-y-12 sm:space-y-16 lg:space-y-20'}`}>
        
        {/* Actions Bar */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 border-b border-brand-border pb-6 sm:pb-8 ${readingMode ? 'mb-10 sm:mb-12' : ''}`}>
           <Link to="/research" className={`flex items-center gap-2 sm:gap-3 transition-colors text-[10px] font-black tracking-widest uppercase group ${readingMode ? 'text-gray-600 hover:text-brand-purple' : 'text-brand-muted hover:text-brand-purple'}`}>
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO DATABASE
           </Link>

           <div className="flex items-center gap-3 sm:gap-6">
              <button 
                onClick={() => setReadingMode(!readingMode)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl border transition-all text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-sm ${
                  readingMode 
                  ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20' 
                  : 'bg-brand-surface border-brand-border text-brand-muted hover:border-brand-purple'
                }`}
              >
                {readingMode ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                <span className="hidden sm:inline">{readingMode ? 'EXIT FOCUS' : 'FOCUS MODE'}</span>
                <span className="sm:hidden">{readingMode ? 'EXIT' : 'FOCUS'}</span>
              </button>
              
              <div className="flex items-center gap-2 sm:gap-4 text-brand-muted">
                 <button className="hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-brand-surface"><Bookmark size={16} /></button>
                 <button className="hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-brand-surface"><Share2 size={16} /></button>
              </div>
           </div>
        </div>

        {/* Blog Header */}
        <header className={`${readingMode ? 'space-y-6 sm:space-y-8 mb-12 sm:mb-16' : 'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center'}`}>
           <div className="space-y-6 sm:space-y-8">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] text-brand-purple uppercase">
                 <span className="flex items-center gap-2 px-3 py-1 bg-brand-purple/10 rounded-full"><Calendar size={12} /> {blog.date}</span>
                 <span className="flex items-center gap-2"><Clock size={12} /> 8 MIN STUDY</span>
                 <span className="flex items-center gap-2"><Eye size={12} /> 1.2K ACCESSES</span>
              </div>
              <h1 className={`font-serif font-black italic tracking-tighter leading-[0.95] uppercase break-words ${readingMode ? 'text-3xl sm:text-4xl md:text-6xl text-gray-900' : 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl'}`}>
                {blog.title}
              </h1>
              <p className={`text-base sm:text-lg lg:text-xl leading-relaxed font-bold border-l-4 border-brand-purple pl-4 sm:pl-6 lg:pl-8 italic ${readingMode ? 'text-gray-700' : 'text-brand-muted'}`}>
                {blog.excerpt}
              </p>
              {!readingMode && (
                <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-purple shadow-sm shrink-0">
                     <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-brand-muted uppercase">PROTOCOL LEAD</p>
                    <p className="font-serif text-base sm:text-lg font-bold">{blog.author}</p>
                  </div>
                </div>
              )}
           </div>

            {!readingMode && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-brand-border shadow-2xl relative"
             >
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  loading="eager"
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-brand-purple/5" />
             </motion.div>
           )}
        </header>

        {/* Content Body */}
        <article className={`${readingMode ? '' : 'max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-20'} space-y-8 sm:space-y-12`}>
           <div className={`prose prose-sm sm:prose-base lg:prose-xl max-w-none prose-headings:font-serif prose-headings:italic prose-a:text-brand-purple ${readingMode ? 'prose-slate' : 'prose-invert'}`}>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-10 first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-black first-letter:mr-2 sm:first-letter:mr-3 first-letter:float-left first-letter:text-brand-purple font-medium">
                The investigation into {blog.slug.replace(/-/g, ' ')} reveals a complex interplay of biochemical stability and laboratory environmental factors. In high-purity synthesis environments like GhostLabz, maintaining peak structural integrity requires strict adherence to climate-controlled protocols.
              </p>

              <div className="my-10 sm:my-16 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-brand-border shadow-2xl bg-brand-surface relative">
                <img 
                  src={blog.inlineImages?.[0] ?? blog.image} 
                  alt="Detailed Lab Analysis" 
                  loading="lazy"
                  className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover" 
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mt-10 sm:mt-16 mb-4 sm:mb-8 border-b border-brand-border pb-3 sm:pb-4">Synthesis & Optimization</h2>
              <p className="mb-6 sm:mb-8 leading-relaxed font-medium text-sm sm:text-base">
                During the primary synthesis phase, the peptide chain is assembled via solid-phase automation. Any fluctuation in temperature or ambient humidity can trigger oxidation or premature hydrolysis. Our recent batch studies (GHOST-2026-B1) indicate that a reduction in atmospheric oxygen exposure by just 15% leads to a 3.4% increase in overall shelf-life stability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 my-10 sm:my-16">
                 <div className="bg-brand-surface p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border border-brand-border space-y-3 sm:space-y-4 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brand-purple italic">Purity Threshold</h3>
                    <p className="text-xs sm:text-sm font-medium">Lyophilized solid state maintained at -20°C resulted in 99.9% purity retention over 24 months in inert gas vacuum sealing.</p>
                 </div>
                 <div className="bg-brand-surface p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border border-brand-border space-y-3 sm:space-y-4 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brand-purple italic">Solubility Matrix</h3>
                    <p className="text-xs sm:text-sm font-medium">Secondary aqueous exposure at room temperature showed a degradation curve starting at the 48-hour mark without stabilization agents.</p>
                 </div>
              </div>

              <div className="my-10 sm:my-16 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-brand-border shadow-2xl bg-brand-surface relative">
                <img 
                  src={blog.inlineImages?.[1] ?? blog.inlineImages?.[0] ?? blog.image} 
                  alt="Microscopic Synthesis" 
                  loading="lazy"
                  className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover" 
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mt-10 sm:mt-16 mb-4 sm:mb-8 border-b border-brand-border pb-3 sm:pb-4">Verification Protocols</h2>
              <p className="mb-6 sm:mb-8 leading-relaxed font-medium text-sm sm:text-base">
                Peer-reviewed analysis suggests that for high-precision investigative outcomes, researchers must prioritize lot-specific traceability. By utilizing digital COAs and batch identification systems provided by GhostLabz, laboratories can ensure the reproducibility of their advanced scientific protocols.
              </p>
           </div>

           {/* Call to Action */}
           <div className="pt-12 sm:pt-16 lg:pt-20 border-t border-brand-border mt-16 sm:mt-24 lg:mt-32 text-center space-y-6 sm:space-y-10">
              <p className="text-brand-muted font-bold tracking-[0.2rem] uppercase text-xs sm:text-sm">Continue your scientific investigation</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 lg:gap-10">
                 <Link to="/catalog" className="px-6 sm:px-10 py-3.5 sm:py-5 bg-brand-purple text-white font-bold tracking-widest rounded-full hover:brightness-110 transition-all shadow-xl shadow-brand-purple/20 text-xs sm:text-sm text-center">ORDER COMPOUNDS</Link>
                 <Link to="/research" className="px-6 sm:px-10 py-3.5 sm:py-5 border border-brand-border font-bold tracking-widest rounded-full hover:bg-brand-surface transition-all text-xs sm:text-sm text-center">HUB ARCHIVES</Link>
              </div>
           </div>
        </article>

      </div>
    </div>
  );
}
