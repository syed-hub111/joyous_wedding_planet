import React from 'react';
import { Sparkles, Calendar, ChevronDown, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { getWhatsAppUrl } from '../../services/enquiryService';

interface HeroProps {
  onOpenEnquiry: (source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const whatsappUrl = getWhatsAppUrl();

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-espresso text-ivory"
    >
      {/* Background Image Composition with Cinematic Luxury Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Indian Wedding Mandap with Warm Illumination and Floral Arrangements"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-subtle filter brightness-90 contrast-[1.05]"
          loading="eager"
        />
        {/* Cinematic Vignettes and Golden Hue Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-espresso/40 to-espresso" />
        <div className="absolute inset-0 bg-[#C6A46A]/10 mix-blend-overlay" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center flex flex-col items-center">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-ivory/10 backdrop-blur-md border border-gold/40 text-gold-light mb-6 md:mb-8 animate-fade-in">
          <Sparkles size={13} className="text-gold" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase">
            Bespoke Wedding & Event Architects • Chennai
          </span>
          <Sparkles size={13} className="text-gold" />
        </div>

        {/* Editorial Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ivory max-w-4xl leading-[1.08] drop-shadow-md">
          Your Dream Wedding,{' '}
          <span className="italic font-normal font-serif text-gold-light block sm:inline">
            Beautifully
          </span>{' '}
          Brought to Life.
        </h1>

        {/* Golden Editorial Divider Line */}
        <div className="w-24 sm:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent my-6 sm:my-8 opacity-80" />

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-ivory/85 max-w-2xl font-light leading-relaxed tracking-wide px-2">
          Thoughtfully planned celebrations, unforgettable experiences and extraordinary moments — crafted around your love story.
        </p>

        {/* CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <Button
            variant="gold"
            size="lg"
            icon={<Calendar size={18} />}
            onClick={() => onOpenEnquiry('hero_primary_cta')}
            className="w-full sm:w-auto min-w-[210px]"
          >
            Plan Your Wedding
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={<ArrowUpRight size={18} />}
            onClick={() => scrollToSection('#work')}
            className="w-full sm:w-auto min-w-[190px] !text-ivory !border-gold/60 hover:!bg-gold/20"
          >
            Explore Our Work
          </Button>
        </div>

        {/* Sub-CTA: Quick WhatsApp Connect */}
        <div className="mt-8 flex items-center gap-2 text-xs text-ivory/70 hover:text-gold transition-colors">
          <MessageCircle size={14} className="text-[#25D366]" />
          <span>Prefer direct WhatsApp enquiry?</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-medium underline underline-offset-4 hover:text-gold-light"
          >
            Chat with our Chennai team
          </a>
        </div>
      </div>

      {/* Refined Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center text-ivory/60 hover:text-gold transition-colors cursor-pointer">
        <button
          onClick={() => scrollToSection('#about')}
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-1 group"
        >
          <span className="text-[10px] uppercase tracking-[0.24em] font-medium opacity-80 group-hover:opacity-100">
            Scroll to Discover
          </span>
          <ChevronDown size={16} className="animate-bounce text-gold" />
        </button>
      </div>
    </section>
  );
};

