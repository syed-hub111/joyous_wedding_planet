import React from 'react';
import { Sparkles, Shield, Heart, Clock, Compass, Award } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../../data/weddingData';

export const WhyChooseUs: React.FC = () => {
  const icons = [Clock, Heart, Sparkles, Compass, Shield];

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-ivory-50 text-espresso relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold-dark mb-3">
            <span className="h-[1px] w-6 bg-gold" />
            <span className="text-[11px] uppercase font-semibold tracking-[0.26em]">
              THE JOYOUS WEDDING PLANET DIFFERENCE
            </span>
            <span className="h-[1px] w-6 bg-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-espresso tracking-tight">
            Crafted with Intention & Care.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-espresso/75 leading-relaxed font-light">
            We believe wedding planning should be as peaceful and joyful as the wedding day itself. Here is what you can rely on when partnering with our Chennai team.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_DATA.map((item, idx) => {
            const IconComponent = icons[idx] || Award;
            return (
              <div
                key={item.number}
                className="relative bg-white p-8 rounded-sm border border-gold/30 shadow-luxury hover:shadow-luxury-lg hover:border-gold transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/15">
                    <span className="font-serif text-2xl font-bold text-gold-dark/60 group-hover:text-gold transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-beige/40 flex items-center justify-center text-gold-dark group-hover:bg-gold/20 transition-colors">
                      <IconComponent size={18} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-2xl font-bold text-espresso tracking-tight mb-3 group-hover:text-gold-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Subtle gold line indicator at bottom */}
                <div className="mt-6 pt-4">
                  <div className="h-[2px] w-8 bg-gold/30 group-hover:w-full group-hover:bg-gold transition-all duration-500" />
                </div>
              </div>
            );
          })}

          {/* 6th Card: Chennai Heritage Dedication */}
          <div className="relative bg-gradient-to-br from-espresso to-espresso-light text-ivory p-8 rounded-sm border border-gold/40 shadow-luxury flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/30">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-light">
                  CHENNAI HERITAGE
                </span>
                <Sparkles size={18} className="text-gold" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-ivory tracking-tight mb-3">
                Rooted in Tamil Nadu Traditions
              </h3>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
                Whether adhering to sacred traditional muhurtham timings or designing modern fusion celebrations, our deep familiarity with Chennai venues and rituals ensures true peace of mind.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-gold">
              <span>Pattalam, Chennai 600012</span>
              <span>Dedicated On-Site Lead</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

