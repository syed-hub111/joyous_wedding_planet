import React from 'react';
import { ArrowUpRight, Sparkles, CheckCircle } from 'lucide-react';
import { SERVICES_DATA } from '../../data/weddingData';
import { ServiceItem } from '../../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-ivory-50 text-espresso relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold-dark mb-3">
            <span className="h-[1px] w-6 bg-gold" />
            <span className="text-[11px] uppercase font-semibold tracking-[0.26em]">
              OUR CURATED SERVICES
            </span>
            <span className="h-[1px] w-6 bg-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-espresso tracking-tight">
            Artistry in Every Celebration.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-espresso/75 leading-relaxed font-light">
            From intimate ceremonies to grand, multi-day celebrations, we offer comprehensive wedding planning and event orchestration crafted around your vision.
          </p>
        </div>

        {/* Editorial Service Grid (3x2 layout with rich photography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-sm overflow-hidden border border-gold/30 shadow-luxury hover:shadow-luxury-lg hover:border-gold transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Subtle Zoom on Hover */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-espresso">
                <img
                  src={service.image}
                  alt={service.altText}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Service Index Number Badge */}
                <span className="absolute top-4 left-4 font-serif text-sm font-semibold text-ivory/80 px-2.5 py-1 bg-espresso/60 backdrop-blur-sm border border-gold/30 rounded-sm">
                  0{idx + 1}
                </span>

                {/* Tagline overlay on bottom of image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-gold-light block">
                    {service.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ivory tracking-tight mt-0.5">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-espresso/80 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 pt-2 border-t border-gold/15">
                  {service.keyHighlights.slice(0, 3).map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-espresso/70">
                      <CheckCircle size={13} className="text-gold flex-shrink-0" />
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA Trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full py-2.5 px-4 bg-beige/40 hover:bg-gold text-espresso hover:text-espresso rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-between group-hover:bg-gold"
                  >
                    <span>Enquire For This</span>
                    <ArrowUpRight size={15} className="text-gold-dark group-hover:text-espresso transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Consult Banner */}
        <div className="mt-16 p-8 rounded-sm bg-gradient-to-r from-espresso via-espresso-light to-espresso text-ivory border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold">
              <Sparkles size={16} />
              <span className="text-xs font-semibold tracking-widest uppercase">
                Need a Custom Combination?
              </span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
              We design personalized, end-to-end wedding packages for Chennai families.
            </h4>
          </div>

          <button
            onClick={() => onSelectService(SERVICES_DATA[0])}
            className="flex-shrink-0 bg-gold hover:bg-gold-light text-espresso px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase shadow transition-all duration-300 hover:-translate-y-0.5"
          >
            Schedule Private Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

