import React, { useState } from 'react';
import { MessageSquareHeart, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface TestimonialsProps {
  onOpenEnquiry: (source?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenEnquiry }) => {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [coupleName, setCoupleName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName.trim() || !reviewText.trim()) return;

    // Store temporarily in localStorage for client record
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('jwp_client_feedback') || '[]');
      existing.push({
        coupleName,
        reviewText,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('jwp_client_feedback', JSON.stringify(existing));
    }

    setReviewSubmitted(true);
    setShowReviewInput(false);
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-ivory text-espresso relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-gold-dark mb-3">
            <span className="h-[1px] w-6 bg-gold" />
            <span className="text-[11px] uppercase font-semibold tracking-[0.26em]">
              VERIFIED EXPERIENCES
            </span>
            <span className="h-[1px] w-6 bg-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-espresso tracking-tight">
            Client Reflections & Stories.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-espresso/75 leading-relaxed font-light">
            In accordance with our strict transparency policy, we only showcase reviews verified with explicit couple consent.
          </p>
        </div>

        {/* Clean Editorial Placeholder Container */}
        <div className="bg-white rounded-sm border border-gold/30 p-8 sm:p-12 shadow-luxury text-center relative overflow-hidden">
          {/* Subtle gold watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
            <span className="font-serif text-9xl font-bold tracking-widest text-espresso">JWP</span>
          </div>

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-beige/40 border border-gold/40 flex items-center justify-center text-gold-dark">
              <MessageSquareHeart size={26} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.24em] text-gold-dark font-semibold">
                CURATING NEWEST CELEBRATIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">
                Celebrating Chennai's Most Meaningful Days
              </h3>
              <p className="text-sm text-espresso/80 leading-relaxed font-light">
                We are currently compiling our newest verified wedding albums and couple reflections for publication. In the meantime, our wedding planners can connect you directly with references relevant to your venue and ceremony type upon request.
              </p>
            </div>

            {/* Verification Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory border border-gold/30 text-xs text-espresso/80">
              <ShieldCheck size={14} className="text-gold-dark" />
              <span className="text-[11px] tracking-wide font-medium">
                100% Genuine Client Feedback • No Fabricated Testimonials
              </span>
            </div>

            {/* Review feedback acknowledgment */}
            {reviewSubmitted && (
              <div className="p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 animate-fade-in">
                <CheckCircle size={16} />
                <span>Thank you! Your wedding review has been submitted for verification.</span>
              </div>
            )}

            {/* Interactive Options: Request References or Submit Feedback */}
            {!showReviewInput && !reviewSubmitted && (
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => onOpenEnquiry('testimonials_request_reference')}
                >
                  Request Client References
                </Button>

                <button
                  onClick={() => setShowReviewInput(true)}
                  className="text-xs uppercase tracking-widest font-semibold text-gold-dark hover:text-espresso py-3 px-4 border border-gold/30 hover:border-gold rounded-sm transition-colors"
                >
                  Planned With Us? Share Your Story
                </button>
              </div>
            )}

            {/* Review Input Box for Genuine Clients */}
            {showReviewInput && (
              <form onSubmit={handleReviewSubmit} className="pt-4 space-y-4 text-left animate-fade-in border-t border-gold/20 mt-4">
                <h4 className="font-serif text-lg font-bold text-espresso text-center">
                  Share Your Joyous Wedding Planet Experience
                </h4>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                    Couple Names & Wedding Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya & Karthik — December 2024"
                    value={coupleName}
                    onChange={(e) => setCoupleName(e.target.value)}
                    className="w-full px-3 py-2 bg-ivory border border-gold/40 rounded text-sm text-espresso focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                    Your Words & Reflections
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the mandap decor, coordination, or on-ground experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3 py-2 bg-ivory border border-gold/40 rounded text-sm text-espresso focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex items-center gap-3 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setShowReviewInput(false)}
                    className="text-xs uppercase tracking-wider text-espresso/60 hover:text-espresso px-3 py-2"
                  >
                    Cancel
                  </button>
                  <Button variant="espresso" size="sm" type="submit">
                    Submit Reflection
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
