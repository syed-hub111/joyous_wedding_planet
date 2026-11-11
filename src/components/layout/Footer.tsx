import React from 'react';
import { Phone, MapPin, MessageCircle, ArrowUp, Heart, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';
import { SERVICES_DATA } from '../../data/weddingData';
import { getWhatsAppUrl, BUSINESS_PHONE, BUSINESS_ADDRESS } from '../../services/enquiryService';

interface FooterProps {
  onOpenEnquiry: (source?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  const whatsappUrl = getWhatsAppUrl();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Wedding Portfolio', href: '#work' },
    { label: 'The JWP Difference', href: '#why-us' },
    { label: 'Verified Reviews', href: '#testimonials' },
    { label: 'Contact Planning Desk', href: '#contact' },
  ];

  return (
    <footer className="bg-espresso text-ivory pt-20 pb-12 border-t border-gold/30 relative overflow-hidden">
      {/* Background ambient gold gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 bg-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-ivory/10">
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo variant="light" onClick={scrollToTop} />

            <p className="text-sm text-ivory/70 max-w-sm leading-relaxed font-light">
              Joyous Wedding Planet is a premier wedding planning and event management firm headquartered in Pattalam, Chennai. We orchestrate timeless celebrations rooted in cultural grace and visual magnificence.
            </p>

            <div className="space-y-3 pt-2 text-xs text-ivory/80">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\s+/g, '')}`}
                  className="hover:text-gold transition-colors font-medium"
                >
                  {BUSINESS_PHONE}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-2 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Desk</span>
              </a>

              <button
                onClick={() => onOpenEnquiry('footer_plan_btn')}
                className="inline-flex items-center gap-1.5 border border-gold/60 hover:bg-gold hover:text-espresso text-gold-light py-2 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-all"
              >
                <Sparkles size={13} />
                <span>Plan Your Wedding</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-ivory tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/75">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-ivory tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/75">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    className="hover:text-gold transition-colors flex items-center justify-between group"
                  >
                    <span>{srv.title}</span>
                    <span className="text-gold/60 group-hover:text-gold text-[10px]">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-ivory/10 text-xs text-ivory/60 space-y-1">
              <p className="font-medium text-gold-light">Studio Consultations:</p>
              <p>Monday to Sunday: 9:00 AM – 9:00 PM</p>
              <p>Serving Chennai, ECR, Mahabalipuram & across Tamil Nadu.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <p>
            © {new Date().getFullYear()} Joyous Wedding Planet. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-ivory/50">
            <span>Crafted with</span>
            <Heart size={12} className="text-gold fill-gold" />
            <span>for weddings in Chennai</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 hover:text-gold transition-colors uppercase tracking-widest text-[11px]"
          >
            <span>Top</span>
            <ArrowUp size={14} className="text-gold" />
          </button>
        </div>
      </div>
    </footer>
  );
};
