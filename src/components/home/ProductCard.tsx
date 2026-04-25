import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const multiplier = 5;
      const rotateX = ((y - height / 2) / height) * -multiplier;
      const rotateY = ((x - width / 2) / width) * multiplier;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          x: x - 50,
          y: y - 50,
          duration: 0.1
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="group relative bg-brand-surface border border-brand-border rounded-2xl sm:rounded-3xl overflow-hidden p-4 sm:p-5 lg:p-6 hover:border-brand-purple/50 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-brand-purple/5"
    >
      {/* Interactive Glow */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none w-24 h-24 bg-brand-purple/20 blur-3xl rounded-full opacity-0 z-0"
      />

      <div className="relative z-10">
        <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-brand-bg flex items-center justify-center border border-brand-border group-hover:border-brand-purple/30 transition-all shadow-inner">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-purple uppercase mb-1 block">
                {product.category}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold font-serif leading-tight group-hover:text-brand-purple transition-colors">
                {product.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono text-base sm:text-lg font-bold text-brand-purple">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-3 sm:py-4 border-t border-brand-border pt-3 sm:pt-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-brand-muted">
              <Zap size={12} className="text-brand-purple" />
              <span>{product.purity} Purity</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-brand-muted">
              <ShieldCheck size={12} className="text-brand-purple" />
              <span>Verified</span>
            </div>
          </div>

          <Link 
            to={`/product/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-brand-bg border border-brand-border hover:bg-brand-purple hover:text-white hover:border-brand-purple rounded-xl text-[10px] font-bold tracking-widest transition-all group/btn uppercase shadow-sm"
          >
            BIO-PROTOCOL DETAILS
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
