import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Users,
  BookOpen,
  Activity,
  ChevronDown,
  FlaskConical,
} from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: 'Are your products for human use?',
    a: 'No. Every compound supplied by GhostLabz is strictly for laboratory research use only (RUO). They are not intended for human or veterinary diagnosis, treatment, cure, mitigation, or prevention of any disease.',
  },
  {
    q: 'Do you provide Certificates of Analysis?',
    a: 'Yes. Every batch ships with a third-party Certificate of Analysis (COA) including HPLC purity, mass-spec confirmation, and lot-specific traceability. COAs are accessible from the product detail page and via your account dashboard.',
  },
  {
    q: 'How do I verify a COA?',
    a: 'Each COA carries a unique lot number that you can cross-check against our public batch ledger or directly with our analytical partner, Freedom Diagnostics. Tamper-evident PDF metadata is also embedded in every certificate.',
  },
  {
    q: 'How are your peptides tested for purity?',
    a: 'All peptides are validated by reverse-phase HPLC at ≥98% purity, with mass spectrometry confirmation of molecular weight. Endotoxin and microbial limits are screened on a per-lot basis where applicable.',
  },
  {
    q: 'How should I store and handle your peptides?',
    a: 'Lyophilized vials should be stored below -20°C, dry, and protected from light. Once reconstituted with bacteriostatic water, refrigerate at 2–8°C and use within the timeframe noted on each product page. Avoid freeze-thaw cycles.',
  },
  {
    q: 'Do you ship internationally or only within the U.S.?',
    a: 'Standard service is FedEx 2-Day within the United States. International orders are evaluated case-by-case for institutional research accounts; please contact our support team with your shipping address and credentials.',
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-20 bg-brand-bg">
      {/* Hero */}
      <section className="min-h-[60vh] sm:min-h-[70vh] flex items-center py-16 sm:py-20 px-4 sm:px-6 border-b border-brand-border">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-5 sm:space-y-8 order-2 lg:order-1">
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-purple uppercase font-mono">
              EST. 2026
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter leading-[0.95] italic">
              Our Story <br /> & Mission
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-brand-muted leading-relaxed font-light max-w-xl">
              At GhostLabz, our mission is to provide reliable, transparent, and
              research-grade solutions for today's laboratories.
            </p>
          </div>
          <div className="relative aspect-square glass rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] p-3 sm:p-4 group overflow-hidden order-1 lg:order-2 max-w-md lg:max-w-none mx-auto w-full">
            <img
              src="/images/catalog/Cat06.jpg"
              alt="GhostLabz laboratory workspace"
              className="w-full h-full object-cover rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 sm:gap-y-20 lg:gap-y-32">
          <div className="space-y-5 sm:space-y-8">
            <div className="flex items-center gap-3 sm:gap-4 text-brand-purple">
              <Target size={28} />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">Our Mission</h2>
            </div>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              GhostLabz was created with one mission: to fuel innovation in the
              lab. We provide researchers with tools that make experiments more
              reliable, results more reproducible, and breakthroughs more
              achievable.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-8">
            <div className="flex items-center gap-3 sm:gap-4 text-brand-purple">
              <Users size={28} />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">Our Story</h2>
            </div>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              The name GhostLabz was born from a simple idea: the most important
              work in science often happens behind the scenes — quiet, precise,
              and unseen. We built a brand that represents both the mystery of
              discovery and the rigor of research. What started as a vision to
              provide better, more transparent peptide sourcing has grown into a
              movement.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-brand-surface/40 border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Activity,
                title: 'Purity Above All',
                desc: '99% purity peptides backed by Certificates of Analysis (where available).',
              },
              {
                icon: BookOpen,
                title: 'Transparency',
                desc: 'Straightforward documentation for traceability and reproducibility.',
              },
              {
                icon: Target,
                title: 'Innovation',
                desc: 'Expanding our catalog to meet fast-moving research needs.',
              },
              {
                icon: FlaskConical,
                title: 'Reliability',
                desc: 'Research-grade quality designed exclusively for laboratory use.',
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 sm:p-8 lg:p-10 bg-brand-bg border border-brand-border rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] space-y-4 sm:space-y-6 group hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/5 transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all">
                  <value.icon size={26} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">{value.title}</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-14 lg:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-brand-purple uppercase">
              Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tighter italic">
              Common Inquiries
            </h2>
            <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto leading-relaxed">
              Quick answers to the questions our research clients ask most. Need
              something specific?{' '}
              <a
                href="/contact"
                className="text-brand-purple font-bold hover:underline"
              >
                Reach out
              </a>
              .
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.q}
                  className={`bg-brand-surface border rounded-2xl sm:rounded-3xl overflow-hidden transition-all ${
                    isOpen
                      ? 'border-brand-purple/40 shadow-lg shadow-brand-purple/5'
                      : 'border-brand-border'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center gap-4 sm:gap-6 px-5 sm:px-8 py-5 sm:py-6 text-left hover:bg-brand-bg/40 transition-colors group"
                  >
                    <span className="text-sm sm:text-base md:text-lg font-serif font-bold pr-2 sm:pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`text-brand-purple shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2 text-sm sm:text-base text-brand-muted leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
