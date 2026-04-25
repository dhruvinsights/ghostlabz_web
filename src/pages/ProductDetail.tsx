import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findProduct, products } from '../data/products';
import { useCart } from '../hooks/useCart';
import {
  ShieldCheck,
  Zap,
  ArrowLeft,
  ShoppingCart,
  FlaskConical,
  Beaker,
  ClipboardCheck,
  Star,
  Truck,
  Lock,
  HeartHandshake,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const StarRating = ({ value, reviews }: { value: number; reviews: number }) => {
  const filled = Math.round(value);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-brand-purple">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={16}
            fill={i < filled ? 'currentColor' : 'none'}
            stroke="currentColor"
          />
        ))}
      </div>
      <span className="text-sm font-bold">{value.toFixed(1)}</span>
      <span className="text-xs text-brand-muted">({reviews} reviews)</span>
    </div>
  );
};

const SectionTitle = ({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) => (
  <div className="space-y-2">
    <span className="text-[10px] font-black tracking-[0.3em] text-brand-purple uppercase">
      {eyebrow}
    </span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold italic tracking-tight">
      {title}
    </h2>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-start gap-6 py-3 border-b border-brand-border last:border-b-0">
    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-muted">
      {label}
    </span>
    <span className="text-sm font-medium text-right break-words max-w-[60%]">
      {value}
    </span>
  </div>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-brand-border rounded-2xl bg-brand-surface overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-brand-bg/40 transition-colors"
      >
        <span className="font-bold text-sm md:text-base pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-brand-purple transition-transform shrink-0 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm text-brand-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = slug ? findProduct(slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="pt-40 text-center space-y-10 min-h-screen bg-brand-bg">
        <h1 className="text-4xl font-serif">Compound not found in database.</h1>
        <Link
          to="/catalog"
          className="text-brand-purple hover:underline font-bold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const {
    name,
    category,
    brand,
    dosage,
    pricing,
    rating,
    images,
    shortDescription,
    description,
    researchApplications,
    compoundProfile,
    coa,
    faq,
    shipping,
    features,
    relatedProducts,
    stock,
  } = product;

  const discountPct =
    pricing.originalPrice && pricing.originalPrice > pricing.salePrice
      ? Math.round(
          ((pricing.originalPrice - pricing.salePrice) / pricing.originalPrice) *
            100,
        )
      : 0;

  const relatedFull = relatedProducts
    .map((rp) => products.find((p) => p.slug === rp.slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-purple transition-colors text-[10px] font-bold tracking-widest uppercase group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />{' '}
          BACK TO CATALOG
        </Link>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative glass rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 aspect-square border-brand-border shadow-2xl overflow-hidden"
            >
              <img
                src={images[activeImage]?.url}
                alt={images[activeImage]?.alt ?? name}
                className="w-full h-full object-cover rounded-[1.5rem] sm:rounded-[2.5rem] shadow-inner"
              />
              <div className="absolute top-4 sm:top-8 right-4 sm:right-8 flex flex-col gap-2 sm:gap-3">
                <div className="bg-brand-bg/80 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-brand-purple/20 text-brand-purple shadow-xl">
                  <ShieldCheck size={20} />
                </div>
                <div className="bg-brand-bg/80 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-brand-purple/20 text-brand-purple shadow-xl">
                  <FlaskConical size={20} />
                </div>
              </div>
              {discountPct > 0 && (
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-brand-purple text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl">
                  -{discountPct}% OFF
                </div>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      idx === activeImage
                        ? 'border-brand-purple shadow-lg'
                        : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="bg-brand-purple/10 text-brand-purple px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-brand-purple/20">
                {category}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-muted">
                BY {brand}
              </span>
              <span
                className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${
                  stock
                    ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/10'
                    : 'border-red-400/30 text-red-500 bg-red-500/10'
                }`}
              >
                {stock ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight break-words">
              {name}
            </h1>

            <StarRating value={rating.value} reviews={rating.reviews} />

            <div className="flex items-end gap-3 sm:gap-4 flex-wrap">
              <p className="text-4xl sm:text-5xl font-mono font-bold text-brand-purple">
                ${pricing.salePrice.toFixed(2)}
              </p>
              {pricing.originalPrice > pricing.salePrice && (
                <p className="text-xl sm:text-2xl font-mono text-brand-muted line-through pb-1">
                  ${pricing.originalPrice.toFixed(2)}
                </p>
              )}
              <span className="text-brand-muted text-[10px] sm:text-xs font-bold tracking-widest uppercase pb-2">
                / {dosage} VIAL
              </span>
            </div>

            <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-medium border-l-4 border-brand-purple/30 pl-4 sm:pl-6 italic">
              {shortDescription}
            </p>

            {/* Key specs */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 border-y border-brand-border py-6 sm:py-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-surface flex items-center justify-center border border-brand-border shrink-0">
                  <Zap className="text-brand-purple" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">
                    Purity
                  </p>
                  <p className="text-xs sm:text-sm font-bold truncate">{coa.purity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-surface flex items-center justify-center border border-brand-border shrink-0">
                  <ClipboardCheck className="text-brand-purple" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">
                    Lot
                  </p>
                  <p className="text-xs sm:text-sm font-bold truncate">{coa.lotNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-surface flex items-center justify-center border border-brand-border shrink-0">
                  <Beaker className="text-brand-purple" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">
                    Form
                  </p>
                  <p className="text-xs sm:text-sm font-bold truncate">
                    {compoundProfile.molecularProfile.form}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-surface flex items-center justify-center border border-brand-border shrink-0">
                  <Tag className="text-brand-purple" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">
                    Dosage
                  </p>
                  <p className="text-xs sm:text-sm font-bold truncate">{dosage}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-brand-purple text-white font-bold tracking-[0.2em] py-4 sm:py-5 rounded-2xl hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-purple/20 uppercase text-xs"
                >
                  ADD TO PROTOCOL <ShoppingCart size={18} />
                </button>
                <button className="px-6 sm:px-8 py-4 sm:py-0 border border-brand-border rounded-2xl hover:bg-brand-surface transition-all text-[10px] font-bold tracking-widest uppercase">
                  Download COA
                </button>
              </div>
              <p className="text-[10px] text-center text-brand-muted italic uppercase tracking-widest font-medium">
                Strictly for laboratory research use only.
              </p>
            </div>

            {/* Quick feature row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-brand-muted"
                >
                  <ShieldCheck size={14} className="text-brand-purple shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OVERVIEW + MECHANISM */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 border-t border-brand-border pt-12 sm:pt-16 lg:pt-20">
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            <SectionTitle eyebrow="01 / Compound Brief" title="Overview" />
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-medium">
              {description.overview}
            </p>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold italic">
                Mechanism of Action
              </h3>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-medium">
                {description.mechanism}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold italic">
                Research Findings
              </h3>
              <ul className="space-y-3">
                {description.researchFindings.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-brand-muted font-medium"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-purple shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-xs sm:text-sm text-brand-muted italic">
              <strong className="text-brand-purple not-italic font-black tracking-widest uppercase text-[10px] sm:text-xs mr-2">
                Disclaimer:
              </strong>
              {description.disclaimer}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xs font-black tracking-[0.3em] uppercase text-brand-purple mb-5 sm:mb-6">
                Regulatory Snapshot
              </h3>
              <InfoRow label="FDA" value={compoundProfile.regulatory.fdaStatus} />
              <InfoRow
                label="Clinical"
                value={compoundProfile.regulatory.clinicalStatus}
              />
              <InfoRow
                label="WADA"
                value={compoundProfile.regulatory.wadaStatus}
              />
              <InfoRow
                label="RUO"
                value={
                  compoundProfile.regulatory.researchUseOnly ? 'Yes' : 'No'
                }
              />
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xs font-black tracking-[0.3em] uppercase text-brand-purple mb-5 sm:mb-6">
                Storage
              </h3>
              <InfoRow
                label="Pre-Reco"
                value={compoundProfile.storage.preReconstitution}
              />
              <InfoRow
                label="Post-Reco"
                value={compoundProfile.storage.postReconstitution}
              />
              <InfoRow
                label="Shelf Life"
                value={compoundProfile.storage.shelfLife}
              />
              <InfoRow
                label="Sensitivity"
                value={compoundProfile.storage.sensitivity}
              />
            </div>
          </aside>
        </section>

        {/* RESEARCH APPLICATIONS */}
        <section className="space-y-8 sm:space-y-12 border-t border-brand-border pt-12 sm:pt-16 lg:pt-20">
          <SectionTitle
            eyebrow="02 / Investigative Use Cases"
            title="Research Applications"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {researchApplications.map((ra, idx) => (
              <motion.div
                key={ra.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/5 transition-all"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-4 sm:mb-6">
                  <FlaskConical size={20} />
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                  {ra.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-medium">
                  {ra.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COMPOUND PROFILE / COA */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border-t border-brand-border pt-12 sm:pt-16 lg:pt-20">
          <div className="space-y-6 sm:space-y-8">
            <SectionTitle
              eyebrow="03 / Molecular Profile"
              title="Compound Specifications"
            />
            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
              <InfoRow
                label="Sequence"
                value={
                  <span className="font-mono break-all">
                    {compoundProfile.molecularProfile.sequence}
                  </span>
                }
              />
              <InfoRow
                label="Formula"
                value={
                  <span className="font-mono">
                    {compoundProfile.molecularProfile.molecularFormula}
                  </span>
                }
              />
              <InfoRow
                label="Mol. Weight"
                value={compoundProfile.molecularProfile.molecularWeight}
              />
              <InfoRow
                label="Appearance"
                value={compoundProfile.molecularProfile.appearance}
              />
              <InfoRow
                label="Form"
                value={compoundProfile.molecularProfile.form}
              />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <SectionTitle
              eyebrow="04 / Independent Verification"
              title="Certificate of Analysis"
            />
            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-purple/5 blur-2xl pointer-events-none" />
              <InfoRow label="Purity" value={coa.purity} />
              <InfoRow label="Lab" value={coa.lab} />
              <InfoRow label="Lot Number" value={coa.lotNumber} />
              <InfoRow label="Labelled" value={coa.labelledAmount} />
              <InfoRow label="Actual" value={coa.actualAmount} />
              <InfoRow label="Test Date" value={coa.testDate} />
              <button className="mt-5 sm:mt-6 w-full bg-brand-purple text-white py-3.5 sm:py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase hover:brightness-110 transition-all">
                Download Full COA PDF
              </button>
            </div>
          </div>
        </section>

        {/* SHIPPING & GUARANTEES */}
        <section className="border-t border-brand-border pt-12 sm:pt-16 lg:pt-20 space-y-8 sm:space-y-12">
          <SectionTitle eyebrow="05 / Logistics" title="Shipping & Guarantees" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <Truck className="text-brand-purple mb-3 sm:mb-4" size={26} />
              <h3 className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
                {shipping.methods.join(', ')}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted">
                Delivery in {shipping.deliveryWindow}.
              </p>
            </div>
            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <HeartHandshake className="text-brand-purple mb-3 sm:mb-4" size={26} />
              <h3 className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
                Free Shipping
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted">
                On research orders over ${shipping.freeShippingThreshold}.
              </p>
            </div>
            <div className="bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 sm:col-span-2 lg:col-span-1">
              <Lock className="text-brand-purple mb-3 sm:mb-4" size={26} />
              <h3 className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
                Secure Checkout
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted">
                SSL-encrypted payment & batch-level traceability.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-brand-border pt-12 sm:pt-16 lg:pt-20 space-y-8 sm:space-y-12">
          <SectionTitle eyebrow="06 / Knowledge Base" title="Frequently Asked Questions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {faq.map((q) => (
              <FAQItem key={q.question} question={q.question} answer={q.answer} />
            ))}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedFull.length > 0 && (
          <section className="border-t border-brand-border pt-12 sm:pt-16 lg:pt-20 space-y-8 sm:space-y-12">
            <SectionTitle eyebrow="07 / Lab Pairings" title="Related Compounds" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedFull.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/product/${rp.slug}`}
                  className="group bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/5 transition-all"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-brand-bg border border-brand-border mb-3 sm:mb-4">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-brand-purple">
                    {rp.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold mt-1 mb-2 group-hover:text-brand-purple transition-colors leading-tight line-clamp-2">
                    {rp.name}
                  </h3>
                  <p className="font-mono text-base font-bold text-brand-purple">
                    ${rp.pricing.salePrice.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT BLOCK */}
        <section className="border-t border-brand-border pt-12 sm:pt-16 lg:pt-20">
          <div className="bg-brand-surface border border-brand-border rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <SectionTitle
                eyebrow="08 / Talk to a Scientist"
                title="Need Protocol Support?"
              />
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Our chemists can discuss reconstitution, storage, lot history,
                and provide custom batch documentation for institutional
                accounts.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-purple shrink-0">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:support@ghostlabzresearch.com"
                  className="text-sm sm:text-base font-medium hover:text-brand-purple transition-colors break-all"
                >
                  support@ghostlabzresearch.com
                </a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-purple shrink-0">
                  <Phone size={18} />
                </div>
                <a
                  href="tel:+16024561477"
                  className="text-sm sm:text-base font-medium hover:text-brand-purple transition-colors"
                >
                  (602) 456-1477
                </a>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-purple shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  4747 E Elliot Rd Suite 29 PMB 821, Phoenix, AZ 85044
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-purple shrink-0">
                  <Clock size={18} />
                </div>
                <p className="text-sm sm:text-base font-medium">Mon–Fri, 9 AM – 5 PM</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
