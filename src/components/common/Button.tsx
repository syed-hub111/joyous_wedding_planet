import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'espresso' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none group';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 rounded-sm gap-2',
    md: 'text-xs md:text-sm px-6 py-3 rounded-sm gap-2.5',
    lg: 'text-sm md:text-base px-8 py-4 rounded-sm gap-3',
  };

  const variantStyles = {
    gold: 'bg-gold hover:bg-gold-dark text-espresso font-semibold shadow-luxury hover:shadow-gold-glow hover:-translate-y-0.5 border border-gold',
    outline:
      'bg-transparent hover:bg-gold/10 text-espresso hover:text-gold-dark border border-gold/60 hover:border-gold backdrop-blur-sm',
    espresso:
      'bg-espresso hover:bg-espresso-light text-ivory border border-espresso/80 shadow-luxury hover:-translate-y-0.5',
    subtle:
      'bg-beige/40 hover:bg-beige text-espresso border border-beige-dark/30 hover:border-gold/40',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

