import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { BUSINESS_PHONE } from '../../services/enquiryService';

interface NavbarProps {
  onOpenEnquiry: (source?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-ivory/95 backdrop-blur-md shadow-luxury border-b border-gold/20'
            : 'py-5 md:py-7 bg-gradient-to-b from-espresso/60 via-espresso/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo
            variant={isScrolled ? 'dark' : 'light'}
            onClick={() => handleLinkClick('#home')}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 relative py-1 group ${
                  isScrolled
                    ? 'text-espresso/80 hover:text-gold-dark'
                    : 'text-ivory/90 hover:text-gold-light'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions: Phone & Primary CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\s+/g, '')}`}
              className={`flex items-center gap-2 text-xs font-medium tracking-wider transition-colors py-2 px-3 rounded ${
                isScrolled
                  ? 'text-espresso/70 hover:text-espresso'
                  : 'text-ivory/80 hover:text-ivory'
              }`}
            >
              <Phone size={14} className="text-gold" />
              <span>{BUSINESS_PHONE}</span>
            </a>

            <Button
              variant="gold"
              size="sm"
              icon={<Calendar size={14} />}
              onClick={() => onOpenEnquiry('navbar_cta')}
            >
              Plan Your Wedding
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className={`lg:hidden p-2 rounded focus:outline-none transition-colors ${
              isScrolled ? 'text-espresso hover:bg-gold/10' : 'text-ivory hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-espresso/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-out Menu Panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-ivory p-6 shadow-2xl flex flex-col justify-between transition-transform duration-500 transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gold/20">
              <Logo variant="dark" onClick={() => handleLinkClick('#home')} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-espresso hover:text-gold"
                aria-label="Close Navigation"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-base uppercase tracking-[0.2em] font-serif font-bold text-espresso hover:text-gold transition-colors py-2 border-b border-gold/10"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-gold/20">
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 text-xs font-semibold text-espresso py-2 tracking-wider"
            >
              <Phone size={14} className="text-gold" />
              <span>{BUSINESS_PHONE}</span>
            </a>

            <Button
              variant="gold"
              fullWidth
              size="md"
              icon={<Calendar size={16} />}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry('mobile_menu_cta');
              }}
            >
              Plan Your Wedding
            </Button>
            
            <p className="text-[11px] text-center text-espresso/60 tracking-wider">
              Pattalam, Chennai, Tamil Nadu 600012
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

