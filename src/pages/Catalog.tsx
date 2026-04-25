import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/home/ProductCard';
import { Filter, Search } from 'lucide-react';

export default function Catalog() {
  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-10 border-b border-brand-border pb-8 sm:pb-12 md:pb-16">
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
             <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter leading-[0.95] italic uppercase">The Catalog</h1>
             <p className="text-base sm:text-lg lg:text-xl text-brand-muted leading-relaxed font-medium">
               High-purity research compounds synthesized for accuracy, reproducibility, and advanced investigative protocols.
             </p>
          </div>
          
          <div className="flex gap-3 sm:gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                <input type="text" placeholder="FILTER BY NAME..." className="w-full bg-brand-surface border border-brand-border pl-11 sm:pl-14 pr-4 py-3 sm:py-4 rounded-2xl text-[10px] sm:text-xs font-bold tracking-widest focus:border-brand-purple outline-none transition-all shadow-sm" />
             </div>
             <button className="flex items-center gap-2 sm:gap-3 bg-brand-surface border border-brand-border px-5 sm:px-8 py-3 sm:py-4 rounded-2xl text-[10px] sm:text-xs font-bold tracking-widest hover:border-brand-purple transition-all shadow-sm shrink-0">
                <Filter size={16} /> TYPE
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24 sm:py-40 border-2 border-dashed border-brand-border rounded-[2rem] sm:rounded-[3rem]">
            <p className="text-brand-muted font-bold tracking-widest uppercase text-xs sm:text-sm">No compounds matching protocol</p>
          </div>
        )}
      </div>
    </div>
  );
}
