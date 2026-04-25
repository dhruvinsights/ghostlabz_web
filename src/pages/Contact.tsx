import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Zap } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Side: Info & Animation */}
        <div className="lg:w-1/2 space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter italic leading-[0.95]">Get In <br /> <span className="text-brand-purple">Touch</span></h1>
            <p className="text-base sm:text-lg lg:text-xl text-brand-muted leading-relaxed font-medium max-w-md">
              Our research support team is available for documentation inquiries, wholesale requests, and technical assistance.
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {[
              { icon: Mail, label: "EMAIL PROTOCOL", value: "support@ghostlabzresearch.com" },
              { icon: Phone, label: "DIRECT LINE", value: "(602) 456-1477" },
              { icon: MapPin, label: "BASE OF OPERATIONS", value: "4747 E Elliot Rd, Phoenix, AZ" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="flex items-start gap-4 sm:gap-6 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-all shadow-sm shrink-0">
                  <item.icon size={22} />
                </div>
                <div className="min-w-0">
                   <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-purple mb-1">{item.label}</h4>
                   <p className="text-base sm:text-lg font-serif font-bold group-hover:text-brand-purple transition-colors break-all">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="p-6 sm:p-8 lg:p-10 glass border-brand-purple/10 rounded-[2rem] sm:rounded-[3rem] text-center space-y-3 sm:space-y-4 shadow-xl"
          >
            <p className="font-serif text-lg sm:text-xl lg:text-2xl italic text-brand-text/80">"Precision is the ghost that haunts the halls of innovation."</p>
            <div className="flex justify-center gap-2 text-brand-purple">
              <Zap size={14} fill="currentColor" />
              <Zap size={14} fill="currentColor" />
              <Zap size={14} fill="currentColor" />
            </div>
          </motion.div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:w-1/2">
          <motion.form 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-brand-surface p-6 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] border border-brand-border shadow-2xl space-y-6 sm:space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] font-bold tracking-widest text-brand-muted ml-4 uppercase">First Name</label>
                <input type="text" className="w-full bg-brand-bg border border-brand-border px-5 sm:px-6 py-3 sm:py-4 rounded-2xl focus:border-brand-purple outline-none transition-all shadow-inner text-sm" placeholder="John" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] font-bold tracking-widest text-brand-muted ml-4 uppercase">Last Name</label>
                <input type="text" className="w-full bg-brand-bg border border-brand-border px-5 sm:px-6 py-3 sm:py-4 rounded-2xl focus:border-brand-purple outline-none transition-all shadow-inner text-sm" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] font-bold tracking-widest text-brand-muted ml-4 uppercase">Email Address</label>
              <input type="email" className="w-full bg-brand-bg border border-brand-border px-5 sm:px-6 py-3 sm:py-4 rounded-2xl focus:border-brand-purple outline-none transition-all shadow-inner text-sm" placeholder="john@university.edu" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] font-bold tracking-widest text-brand-muted ml-4 uppercase">Inquiry Protocol</label>
              <select className="w-full bg-brand-bg border border-brand-border px-5 sm:px-6 py-3 sm:py-4 rounded-2xl focus:border-brand-purple outline-none transition-all cursor-pointer shadow-inner text-sm">
                <option>General Research Inquiry</option>
                <option>Batch Documentation Request</option>
                <option>Wholesale Opportunities</option>
                <option>Shipping & Logistics</option>
              </select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] font-bold tracking-widest text-brand-muted ml-4 uppercase">Message Body</label>
              <textarea rows={5} className="w-full bg-brand-bg border border-brand-border px-5 sm:px-6 py-3 sm:py-4 rounded-2xl focus:border-brand-purple outline-none transition-all resize-none shadow-inner text-sm" placeholder="How can our laboratory assist your innovation?"></textarea>
            </div>

            <button className="w-full bg-brand-purple text-white font-bold tracking-[0.2em] py-4 sm:py-5 rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-purple/20 text-xs sm:text-sm">
              TRANSMIT MESSAGE <Send size={18} />
            </button>

            <p className="text-[10px] text-center text-brand-muted uppercase tracking-widest italic font-medium">
              Encrypted Data Transmission Secured by GhostLink™
            </p>
          </motion.form>
        </div>

      </div>
    </div>
  );
}
