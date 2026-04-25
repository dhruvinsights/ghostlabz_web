import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg text-brand-text pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {/* Brand Section */}
        <div className="space-y-5 sm:space-y-6 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <FlaskConical className="text-brand-purple" size={26} />
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              GHOST<span className="text-brand-purple">LABZ</span>
            </span>
          </Link>
          <p className="text-sm text-brand-muted leading-relaxed max-w-md">
            Leading the field in high-purity research compound synthesis and laboratory logistics. 
            Engineered for precision. Built for innovation.
          </p>
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-muted">
              <Mail size={16} className="text-brand-purple shrink-0" />
              <span className="break-all">support@ghostlabzresearch.com</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-muted">
              <Phone size={16} className="text-brand-purple shrink-0" />
              <span>(602) 456-1477</span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-brand-muted">
              <MapPin size={16} className="text-brand-purple shrink-0 mt-0.5" />
              <span>4747 E Elliot Rd Suite 29 PMB 821, Phoenix, AZ 85044</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-muted">
              <Clock size={16} className="text-brand-purple shrink-0" />
              <span>Mon – Fri, 9 AM – 5 PM</span>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 font-serif">Policies</h4>
          <ul className="space-y-3 sm:space-y-4">
            {['Privacy Policy', 'Refund Policy', 'Shipping Policy', 'Terms of Service'].map(item => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs sm:text-sm text-brand-muted hover:text-brand-purple transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 font-serif">Contact</h4>
          <ul className="space-y-3 sm:space-y-4">
            <li>
              <Link to="/contact" className="text-xs sm:text-sm text-brand-muted hover:text-brand-purple transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="/wholesale" className="text-xs sm:text-sm text-brand-muted hover:text-brand-purple transition-colors">Wholesale</Link>
            </li>
            <li>
              <Link to="/catalog" className="text-xs sm:text-sm text-brand-muted hover:text-brand-purple transition-colors">Browse compounds</Link>
            </li>
          </ul>
        </div>

        {/* Compliance */}
        <div className="bg-brand-surface p-5 sm:p-6 rounded-2xl border border-brand-border sm:col-span-2 lg:col-span-1">
          <h4 className="text-[10px] uppercase tracking-widest text-brand-purple mb-3 sm:mb-4 font-mono font-bold">STATUS: COMPLIANT</h4>
          <p className="text-[11px] leading-relaxed text-brand-muted font-medium">
            GhostLabz products are supplied strictly for laboratory research only. 
            Not for human or veterinary use. Not for diagnostic or therapeutic applications.
          </p>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-brand-border space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">Research Use Only</h5>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              This material is sold for laboratory research use only. Terms of sale apply. Not for human consumption, nor medical, veterinary, or household uses. Please familiarize yourself with our Terms of Service prior to ordering.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">FDA Disclaimer</h5>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              The statements made within this website have not been evaluated by the US Food and Drug Administration. The statements and the products of this company are not intended to diagnose, treat, cure or prevent any disease.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[11px] text-brand-muted italic font-medium text-center sm:text-left">
          <span>© {new Date().getFullYear()} GHOSTLABZ. All Rights Reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse"></span>
            Verified Secure Checkout v4.2
          </span>
        </div>
      </div>
    </footer>
  );
}
