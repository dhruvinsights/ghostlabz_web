import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Truck, Search, LifeBuoy, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import { blogs } from '../data/blogs';
import ProductCard from '../components/home/ProductCard';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-brand-bg transition-colors duration-500 overflow-x-hidden">
      {/* 1. HERO SECTION WITH DARK FILTER */}
      <section className="relative min-h-[85vh] lg:min-h-screen w-full flex items-center pt-28 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            poster="/images/catalog/Cat01.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/Hero_bg_video.mp4" type="video/mp4" />
          </video>
          {/* Dark Cinematic overlay with gradient to aid readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-6 sm:space-y-8 lg:space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-brand-purple/20 border border-brand-purple/40 rounded-full backdrop-blur-xl">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-brand-purple rounded-full animate-pulse shadow-[0_0_15px_#9D7BFF]"></span>
              <span className="text-[9px] sm:text-[11px] font-black tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase font-mono">LABORATORY INVESTIGATIVE USE ONLY</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-black leading-[0.9] sm:leading-[0.85] tracking-tighter text-white uppercase">
                Verified <br />
                <span className="text-gradient italic block -mt-1 sm:-mt-2">Research</span>
                <span className="block -mt-2 sm:-mt-4">Peptides</span>
              </h1>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed font-medium border-l-2 border-brand-purple/30 pl-4 sm:pl-8">
              Engineer your scientific breakthroughs with batch-specific <span className="text-white font-bold">traceability</span>, 3rd party <span className="text-white font-bold">verification</span>, and uncompromising quality standards.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-6">
              <Link to="/catalog" className="px-8 sm:px-12 py-4 sm:py-6 bg-brand-purple text-white font-black tracking-[0.15em] rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(157,123,255,0.4)] transition-all flex items-center justify-center gap-3 sm:gap-4 group text-sm sm:text-base">
                EXPLORE COMPOUNDS
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/about-us" className="px-6 sm:px-10 py-3 sm:py-5 text-white/80 hover:text-white font-bold tracking-widest flex items-center justify-center sm:justify-start gap-2 group transition-colors text-xs sm:text-sm">
                PEPTIDE SCIENCE <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Bio-Digital Stat Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-purple/40 to-blue-500/40 rounded-[2.5rem] sm:rounded-[3.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative glass rounded-[2.5rem] sm:rounded-[3.5rem] border-white/20 p-2 sm:p-2.5 overflow-hidden bg-black/60 shadow-2xl backdrop-blur-3xl">
                <div className="relative aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
                  <img 
                    src="/lab_analyst.jpg" 
                    alt="Lab Analyst" 
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tech Data */}
                  <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-purple/40 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-[0_0_15px_rgba(157,123,255,0.4)]">
                        <Zap size={20} className="fill-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-base sm:text-lg leading-none mb-1">99.8% Purity</p>
                        <p className="text-white/70 text-[10px] uppercase tracking-widest font-mono">HPLC Verified</p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '99.8%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-brand-purple shadow-[0_0_15px_#9D7BFF]"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/60">
                      <span>LOT: GHOST-2026-XPL</span>
                      <span>CERTIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS SECTION */}
      <section className="bg-brand-bg py-16 sm:py-20 lg:py-24 px-4 sm:px-6 border-y border-brand-border relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                title: "99%+ Verified Purity",
                desc: "Batch-specific purity testing",
                icon: CheckCircle2,
                stat: "99.8%",
                color: "from-blue-500 to-cyan-400",
              },
              {
                title: "Third-Party Tested",
                desc: "Independent analytical verification",
                icon: ShieldCheck,
                stat: "ISO",
                color: "from-purple-500 to-indigo-500",
              },
              {
                title: "Batch-Specific COAs",
                desc: "Downloadable certificates",
                icon: FileText,
                stat: "PDF",
                color: "from-emerald-500 to-teal-400",
              },
              {
                title: "Research Use Only",
                desc: "Not for human consumption",
                icon: Lock,
                stat: "RUO",
                color: "from-rose-500 to-orange-400",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl bg-brand-surface border border-brand-border hover:border-brand-purple/40 hover:shadow-xl hover:shadow-brand-purple/10 transition-all duration-500 overflow-hidden"
              >
                <div
                  className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative flex items-start justify-between mb-8">
                  <div
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                  >
                    <item.icon size={36} strokeWidth={1.75} className="drop-shadow-md" />
                  </div>
                  <span className="text-[10px] font-mono font-black tracking-[0.2em] text-brand-muted bg-brand-bg border border-brand-border px-3 py-1.5 rounded-full">
                    {item.stat}
                  </span>
                </div>

                <h3 className="font-bold text-base uppercase tracking-wider mb-2 group-hover:text-brand-purple transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COMPOUNDS */}
      <section className="bg-brand-surface/30 py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 lg:space-y-16">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 md:gap-6 border-b border-brand-border pb-6 md:pb-10">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-purple uppercase font-mono">THE GHOST COLLECTION</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold">Featured Catalog</h2>
            </div>
            <Link to="/catalog" className="group flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase hover:text-brand-purple transition-colors md:pb-2">
              VIEW ALL COMPOUNDS <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUALITY COMMITMENT */}
      <section className="bg-brand-bg py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 sm:space-y-12">
             <div className="space-y-4 sm:space-y-6">
               <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">Precision Laboratory <br /> <span className="text-brand-purple">Synthesis</span></h2>
               <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                 Every batch is independently tested, documented, and tied to a specific lot number prior to release. Our commitment to accuracy is the bedrock of your research.
               </p>
             </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { icon: Truck, title: "Expedited Shipping", desc: "USPS & FedEx Priority handling for all research materials.", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
                  { icon: Search, title: "Lot Traceability", desc: "Digital COA access for every individual vial purchased.", color: "bg-purple-500/10 text-purple-600 border-purple-200" },
                  { icon: LifeBuoy, title: "Support Protocol", desc: "Dedicated chemists helping with technical documentation.", color: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
                  { icon: Lock, title: "Encrypted Data", desc: "Military-grade encryption for all institutional profiles.", color: "bg-amber-500/10 text-amber-600 border-amber-200" }
                ].map((feat, i) => (
                  <div key={i} className="space-y-3 sm:space-y-4 group p-5 sm:p-6 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-purple hover:shadow-lg hover:shadow-brand-purple/5 transition-all">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110 ${feat.color}`}>
                      <feat.icon size={22} />
                    </div>
                    <h4 className="font-bold text-sm tracking-wide uppercase">{feat.title}</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-medium">{feat.desc}</p>
                  </div>
                ))}
              </div>
          </div>

          <div className="relative">
             <div className="glass p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[3rem] border-brand-purple/10 space-y-6 sm:space-y-10 group overflow-hidden bg-brand-surface shadow-2xl">
                <div className="flex items-center gap-4 border-b border-brand-border pb-6 sm:pb-8">
                   <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand-purple to-indigo-500 border-2 border-brand-purple shadow-xl flex items-center justify-center text-white font-serif font-black text-lg sm:text-xl tracking-wider shrink-0">
                      AG
                   </div>
                   <div>
                      <div className="flex items-center gap-1 text-brand-purple mb-1">
                         {[1,2,3,4,5].map(s => <Zap key={s} size={12} fill="currentColor" />)}
                      </div>
                      <p className="text-xs sm:text-sm font-bold">Principal Investigator, BioTech</p>
                   </div>
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic leading-tight text-brand-text/90">
                  "Consistent purity is hard to find. GhostLabz has set a new standard for our dermatological research."
                </blockquote>
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-brand-purple">
                  <span className="animate-pulse w-1.5 h-1.5 bg-brand-purple rounded-full"></span>
                  VERIFIED RESEARCH VERDICT // 2026
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. RESEARCH HUB PREVIEW */}
      <section className="bg-brand-surface py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 lg:space-y-16">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 sm:gap-6 mb-6 sm:mb-12">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-purple uppercase font-mono">SCIENTIFIC INSIGHTS</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold italic">Research <span className="text-brand-purple">Hub</span></h2>
            </div>
            <Link to="/research" className="self-start md:self-end inline-flex items-center gap-3 sm:gap-4 bg-brand-purple text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-[11px] sm:text-xs tracking-widest hover:brightness-110 transition-all shadow-lg shadow-brand-purple/20">
              EXPLORE RESEARCH <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <Link to={`/research/${blogs[0].slug}`} className="lg:col-span-2 group relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-brand-border aspect-[16/10] sm:aspect-[16/9] shadow-xl bg-brand-bg">
              <img 
                src={blogs[0].image} 
                alt="blog" 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent p-6 sm:p-8 lg:p-12 flex flex-col justify-end">
                 <span className="text-[10px] font-bold tracking-widest text-brand-purple uppercase mb-3 sm:mb-4">{blogs[0].date}</span>
                 <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 sm:mb-6 group-hover:text-brand-purple transition-colors leading-[1.05]">{blogs[0].title}</h3>
                 <p className="text-brand-muted text-xs sm:text-sm max-w-xl group-hover:text-brand-text transition-colors line-clamp-2">{blogs[0].excerpt}</p>
              </div>
            </Link>

            <div className="space-y-4 sm:space-y-6">
              {blogs.slice(1, 4).map(blog => (
                <Link key={blog.id} to={`/research/${blog.slug}`} className="flex gap-4 sm:gap-6 group p-3 sm:p-4 rounded-2xl hover:bg-brand-bg transition-all border border-transparent hover:border-brand-border">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-brand-border shrink-0 bg-brand-surface relative">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="space-y-2 min-w-0">
                     <span className="text-[10px] font-bold text-brand-purple uppercase tracking-widest">{blog.date}</span>
                     <h4 className="font-serif text-base sm:text-lg leading-tight group-hover:text-brand-purple transition-colors line-clamp-3">{blog.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
