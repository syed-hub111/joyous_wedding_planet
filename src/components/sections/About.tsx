import React from 'react';
import { Sparkles, MapPin, Check, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { BRAND_INFO } from '../../data/weddingData';

interface AboutProps {
  onOpenEnquiry: (source?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-ivory text-espresso relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-beige/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Sophisticated Editorial Photography Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Main Image */}
              <div className="relative rounded-sm overflow-hidden shadow-luxury border border-gold/30">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80"
                  alt="Joyous couple celebrating wedding ceremony moments"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center filter contrast-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
              </div>

              {/* Overlapping Secondary Vignette Card */}
              <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 w-44 sm:w-56 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-sm border border-gold/40 shadow-luxury-lg hidden xs:block">
                <div className="flex items-center gap-2 mb-2 text-gold">
                  <Sparkles size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-espresso">
                    Chennai Studio
                  </span>
                </div>
                <p className="text-xs text-espresso/80 leading-relaxed font-serif italic">
                  "Every ritual honored, every aesthetic detail harmonized."
                </p>
                <div className="mt-3 pt-2 border-t border-gold/20 flex items-center gap-1.5 text-[11px] text-gold-dark font-medium">
                  <MapPin size={12} />
                  <span>Pattalam, Chennai</span>
                </div>
              </div>

              {/* Decorative gold hairline frame offset */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/30 rounded-sm -z-10 pointer-events-none hidden sm:block" />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-dark mb-3">
                <span className="h-[1px] w-6 bg-gold" />
                <span className="text-[11px] uppercase font-semibold tracking-[0.26em]">
                  ABOUT JOYOUS WEDDING PLANET
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-espresso leading-[1.15]">
                Celebrations That Become Memories.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-espresso/85 leading-relaxed font-normal">
              Based in Pattalam, Chennai, <strong className="text-espresso font-semibold">{BRAND_INFO.name}</strong> is a dedicated wedding and event-planning firm committed to shaping authentic, heartfelt, and aesthetically peerless celebrations.
            </p>

            <p className="text-sm sm:text-base text-espresso/80 leading-relaxed">
              We understand that an Indian wedding is more than a gathering — it is a symphony of sacred traditions, joyous reunions, and deep emotional milestones. Our role is to absorb the complexity of venue coordination, decor craft, catering management, and time schedules so you and your families can immerse fully in the celebration.
            </p>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Bespoke Conceptualization', desc: 'Customized themes true to your heritage.' },
                { title: 'Transparent Coordination', desc: 'Clear budgets, contracts, and schedules.' },
                { title: 'Curated Vendor Network', desc: 'Vetted Chennai artisans, florists & chefs.' },
                { title: 'Flawless Day-of Execution', desc: 'Calm on-ground direction from start to finish.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded bg-beige/30 border border-gold/20">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold-dark">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-espresso">
                      {item.title}
                    </h4>
                    <p className="text-xs text-espresso/70 mt-0.5 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="espresso"
                size="md"
                icon={<ArrowRight size={16} />}
                onClick={() => onOpenEnquiry('about_discover_story')}
              >
                Discover Our Story & Consult
              </Button>

              <a
                href="#services"
                className="text-xs uppercase tracking-[0.18em] font-semibold text-gold-dark hover:text-espresso py-3 px-4 text-center transition-colors"
              >
                Explore Services ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

