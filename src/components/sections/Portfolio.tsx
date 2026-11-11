import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ArrowRight, Eye } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/weddingData';
import { PortfolioItem } from '../../types';

interface PortfolioProps {
  onOpenEnquiry: (source?: string, eventType?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenEnquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'mandap', label: 'Mandap & Stages' },
    { id: 'reception', label: 'Royal Receptions' },
    { id: 'decor', label: 'Floral Architecture' },
    { id: 'rituals', label: 'Sacred Rituals' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-24 sm:py-32 bg-ivory text-espresso relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-dark mb-3">
              <span className="h-[1px] w-6 bg-gold" />
              <span className="text-[11px] uppercase font-semibold tracking-[0.26em]">
                PORTFOLIO & SCENOGRAPHY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-espresso tracking-tight">
              Bespoke Wedding Architecture.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-espresso/70 max-w-md font-light leading-relaxed">
            A curated glimpse into the spatial grandeur, floral intimacy, and thematic atmospheres we orchestrate for couples across Tamil Nadu.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-gold/20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest rounded-sm transition-all duration-300 font-medium ${
                activeCategory === cat.id
                  ? 'bg-espresso text-ivory shadow'
                  : 'bg-beige/40 text-espresso/70 hover:text-espresso hover:bg-beige'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            // Asymmetric column distribution
            const colSpan =
              item.isWide || idx % 5 === 0
                ? 'md:col-span-8'
                : idx % 5 === 1 || idx % 5 === 2
                ? 'md:col-span-4'
                : 'md:col-span-6';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`${colSpan} group relative overflow-hidden rounded-sm cursor-pointer shadow-luxury border border-gold/30 bg-espresso min-h-[340px] sm:min-h-[420px] transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.95] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Rich Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-espresso/70 backdrop-blur-sm text-gold-light border border-gold/30 rounded-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Hover Quick View Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ivory/20 backdrop-blur-md flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-ivory/30">
                  <Maximize2 size={16} />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-2 transform transition-transform duration-300">
                  <p className="text-[11px] uppercase tracking-widest text-gold-light">
                    {item.location}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ivory/70 line-clamp-2 max-w-lg leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1 text-gold text-xs font-semibold tracking-wider uppercase group-hover:text-gold-light">
                    <span>View Inspiration Details</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Transparency Disclaimer (Prompt Requirement) */}
        <div className="mt-12 text-center border-t border-gold/20 pt-6">
          <p className="text-[11px] text-espresso/60 max-w-2xl mx-auto leading-relaxed">
            * Curation note: Imagery represents verified architectural styling, decor themes, and aesthetic benchmarks curated by Joyous Wedding Planet for planning inspiration. For custom venue walkthroughs and actual portfolios, schedule a consultation with our Chennai team.
          </p>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/90 backdrop-blur-lg animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-ivory rounded-sm overflow-hidden shadow-2xl border border-gold/40 flex flex-col md:flex-row text-espresso"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-espresso/70 text-ivory hover:bg-espresso transition-colors"
            >
              <X size={18} />
            </button>

            {/* Image on Left */}
            <div className="md:w-3/5 bg-black relative max-h-[60vh] md:max-h-[80vh] flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content on Right */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-gold-dark text-[10px] uppercase tracking-widest font-bold">
                  <Sparkles size={12} />
                  <span>{selectedItem.categoryLabel}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso leading-tight">
                  {selectedItem.title}
                </h3>

                <p className="text-xs text-gold-dark font-medium tracking-wide">
                  {selectedItem.location}
                </p>

                <p className="text-sm text-espresso/80 leading-relaxed font-light">
                  {selectedItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/20 space-y-3">
                <button
                  onClick={() => {
                    const title = selectedItem.title;
                    setSelectedItem(null);
                    onOpenEnquiry('portfolio_lightbox', `Inquiry for ${title}`);
                  }}
                  className="w-full bg-gold hover:bg-gold-dark text-espresso font-semibold py-3 px-4 rounded-sm text-xs tracking-widest uppercase shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={15} />
                  <span>Plan Similar Decor</span>
                </button>

                <p className="text-[10px] text-center text-espresso/60">
                  Customizable for indoor halls, outdoor lawns & traditional mandapams in Chennai.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

