import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { BackendStatusBadge } from './components/common/BackendStatusBadge';
import { ServiceItem } from './types';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('automatic_popup');
  const [modalEventType, setModalEventType] = useState('Wedding');

  // Automatic 1-2 second popup logic with 24-hour dismissal memory & submitted suppression
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user has already submitted an enquiry
    const hasSubmitted = localStorage.getItem('jwp_enquiry_submitted');
    if (hasSubmitted === 'true') {
      return;
    }

    // Check 24-hour cooldown for "Maybe Later" dismissals
    const dismissedAt = localStorage.getItem('jwp_enquiry_dismissed_at');
    if (dismissedAt) {
      const parsedTime = parseInt(dismissedAt, 10);
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
      if (!isNaN(parsedTime) && Date.now() - parsedTime < TWENTY_FOUR_HOURS) {
        return;
      }
    }

    // Trigger popup after 1.5 seconds (1–2 seconds requirement)
    const timer = setTimeout(() => {
      setModalSource('automatic_homepage_popup');
      setModalEventType('Wedding');
      setIsModalOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handler to open modal from anywhere on the page
  const handleOpenEnquiry = (source = 'direct_cta', eventType = 'Wedding') => {
    setModalSource(source);
    setModalEventType(eventType);
    setIsModalOpen(true);
  };

  // Handler when clicking a specific service card
  const handleSelectService = (service: ServiceItem) => {
    setModalSource(`service_card_${service.id}`);
    setModalEventType(service.title.includes('Engagement') ? 'Engagement' : service.title.includes('Corporate') ? 'Corporate Event' : 'Wedding');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso selection:bg-gold/30 selection:text-espresso font-sans">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Sections */}
      <main>
        {/* Cinematic Hero */}
        <Hero onOpenEnquiry={handleOpenEnquiry} />

        {/* Introduction / About */}
        <About onOpenEnquiry={handleOpenEnquiry} />

        {/* Curated Services */}
        <Services onSelectService={handleSelectService} />

        {/* Wedding Scenography & Portfolio */}
        <Portfolio onOpenEnquiry={handleOpenEnquiry} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Client Reflections & Stories */}
        <Testimonials onOpenEnquiry={handleOpenEnquiry} />

        {/* Contact Section & Embedded Form */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Automatic & CTA-Driven Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceTrigger={modalSource}
        initialEventType={modalEventType}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* System & Backend Architecture Status Badge */}
      <BackendStatusBadge />
    </div>
  );
}

export default App;

