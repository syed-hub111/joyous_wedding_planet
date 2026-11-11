import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, BUSINESS_PHONE } from '../../services/enquiryService';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 select-none">
      {/* Editorial Tooltip Pill (Dismissible) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-espresso text-ivory text-xs px-3.5 py-2 rounded-full shadow-luxury border border-gold/40 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">
            Chat with Chennai Wedding Planners
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss chat tip"
            className="text-ivory/60 hover:text-ivory ml-1 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Joyous Wedding Planet on WhatsApp at ${BUSINESS_PHONE}`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Subtle glowing ring pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10 opacity-75 pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-white stroke-none" />

        {/* Small gold crown or badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-espresso border border-ivory">
          ★
        </span>
      </a>
    </div>
  );
};

