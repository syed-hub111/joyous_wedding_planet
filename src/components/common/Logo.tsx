import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', onClick }) => {
  const isLight = variant === 'light';

  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ${className}`}
    >
      {/* Monogram Crest */}
      <div className="relative w-10 h-10 rounded-full flex items-center justify-center border border-gold/40 bg-gold/10 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
        <span className={`font-serif text-lg font-semibold tracking-wider ${isLight ? 'text-ivory' : 'text-espresso'}`}>
          J
        </span>
        <span className="text-gold font-serif text-xs font-semibold -ml-0.5">
          W
        </span>
        <span className={`font-serif text-lg font-semibold tracking-wider -ml-0.5 ${isLight ? 'text-ivory' : 'text-espresso'}`}>
          P
        </span>
        {/* Subtle decorative ring dot */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold opacity-80" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-lg md:text-xl font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${
            isLight ? 'text-ivory group-hover:text-gold-light' : 'text-espresso group-hover:text-gold-dark'
          }`}
        >
          Joyous Wedding Planet
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="h-[1px] w-4 bg-gold/50" />
          <span className="text-[10px] uppercase tracking-[0.26em] text-gold font-medium">
            Wedding & Event Architects • Chennai
          </span>
          <span className="h-[1px] w-4 bg-gold/50" />
        </div>
      </div>
    </div>
  );
};

