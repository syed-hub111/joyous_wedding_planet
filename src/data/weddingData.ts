import { ServiceItem, PortfolioItem } from '../types';

export const BRAND_INFO = {
  name: 'Joyous Wedding Planet',
  tagline: 'Your Dream Wedding, Beautifully Brought to Life.',
  subtagline:
    'Thoughtfully planned celebrations, unforgettable experiences and extraordinary moments — crafted around your love story.',
  phone: '+91 95516 12563',
  phoneRaw: '919551612563',
  address: 'Pattalam, Chennai, Tamil Nadu 600012',
  city: 'Chennai',
  state: 'Tamil Nadu',
  hours: 'Monday – Sunday: 9:00 AM – 9:00 PM',
  consultationNote: 'Private consultations available by appointment at our Chennai studio or at your convenience.',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'wedding-planning',
    title: 'Full Wedding Planning',
    tagline: 'End-to-end design, vendor curation & flawless coordination',
    description:
      'From your first conceptual mood board to the final vidai, we guide every detail with calmness, precision, and heartfelt care. Our Chennai planning team manages vendor sourcing, ritual timelines, guest arrangements, and on-ground logistics.',
    keyHighlights: [
      'Bespoke theme & mood board curation',
      'Vendor negotiation & contract management',
      'Minute-by-minute muhurtham timeline design',
      'Dedicated on-site coordination directors',
    ],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    altText: 'Traditional Indian wedding ceremony with elegant floral mandap and decor',
  },
  {
    id: 'engagement-celebrations',
    title: 'Engagement Celebrations',
    tagline: 'Intimate, romantic beginnings styled to perfection',
    description:
      'Mark the start of your journey with an exquisite engagement or ring ceremony. We design romantic stage backdrops, personalized photo opportunities, and cozy banquet settings that celebrate both families coming together.',
    keyHighlights: [
      'Personalized couple monogram & backdrop',
      'Thematic floral rings & stage concepts',
      'Sound & lighting choreography for ring exchange',
      'Family greeting & hospitality setups',
    ],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    altText: 'Elegant Indian couple engagement ceremony with floral arrangements',
  },
  {
    id: 'wedding-decorations',
    title: 'Wedding Decor & Scenography',
    tagline: 'Mandaps, floral architectures & bespoke ambient lighting',
    description:
      'Immerse your guests in timeless beauty. Whether you envision a traditional South Indian temple mandap adorned with fresh tuberose and marigolds, or a contemporary champagne-gold glass dome, our artisans build breathtaking atmospheres.',
    keyHighlights: [
      'Traditional South Indian & contemporary mandap decor',
      'Grand entrance arches & walkway floral runners',
      'Architectural lighting & stage illumination',
      'Bespoke dining & table centerpieces',
    ],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    altText: 'Grand floral mandap decoration with warm golden ambient lighting',
  },
  {
    id: 'catering-hospitality',
    title: 'Catering & Guest Hospitality',
    tagline: 'Authentic culinary feasts & attentive warm reception',
    description:
      'Food is the soul of Indian celebrations. We partner with celebrated South Indian and pan-Indian caterers to curate authentic traditional banana-leaf feasts, lavish live counters, and high-standard hygienic beverage service.',
    keyHighlights: [
      'Traditional South Indian banana-leaf wedding feasts',
      'Interactive live dessert & chaat counters',
      'Professional banquet service captains',
      'Guest welcome desks & room gifting kits',
    ],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80',
    altText: 'Exquisite culinary spread and banquet hospitality for Indian weddings',
  },
  {
    id: 'photography-videography',
    title: 'Cinematography & Photography',
    tagline: 'Timeless visual stories capturing every candid emotion',
    description:
      'Relive your wedding memories forever through magazine-grade visuals. We coordinate leading wedding cinematographers and candid photographers skilled at documenting unscripted tears, joyful laughs, and sacred rituals.',
    keyHighlights: [
      'Cinematic 4K wedding highlight trailers',
      'Candid & traditional portrait photography',
      'Drone aerial venue captures & muhurtham coverage',
      'Handcrafted luxury wedding albums',
    ],
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80',
    altText: 'Bride and groom portrait during wedding golden hour',
  },
  {
    id: 'corporate-special-events',
    title: 'Receptions & Special Events',
    tagline: 'High-energy Sangeet, milestone receptions & galas',
    description:
      'From vibrant Sangeet and Mehendi nights with upbeat acoustic staging to grand corporate milestone celebrations, we engineer every experiential element with sophistication and flawless show-running.',
    keyHighlights: [
      'Sangeet stage production & professional audio-visuals',
      'Mehendi lounge setups with colorful drape installations',
      'Reception photo booths & thematic entrances',
      'VIP guest flow & security management',
    ],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80',
    altText: 'Evening celebration with fairy lights and elegant outdoor staging',
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Royal Temple Mandap',
    category: 'mandap',
    categoryLabel: 'Mandap & Rituals',
    location: 'Chennai Heritage Venue',
    description: 'Fresh jasmine drapes, carved brass brassieres, and auspicious temple bells creating a serene sacred atmosphere.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    isWide: true,
  },
  {
    id: 'port-2',
    title: 'Sunset Champagne Reception',
    category: 'reception',
    categoryLabel: 'Receptions',
    location: 'ECR Coastal Lawn, Chennai',
    description: 'Understated elegance featuring warm fairy light canopies, ivory linen tables, and champagne gold floral arches.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'port-3',
    title: 'Bespoke Floral Walkway',
    category: 'decor',
    categoryLabel: 'Floral Architecture',
    location: 'Palace Ballroom',
    description: 'Cascading baby’s breath, white tuberoses, and amber pathway lanterns guiding the bridal entrance.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'port-4',
    title: 'Sacred Muhurtham Moments',
    category: 'rituals',
    categoryLabel: 'Sacred Rituals',
    location: 'Traditional Mandapam',
    description: 'Capturing authentic cultural heritage, sacred vows, and emotional blessings with gentle subtlety.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'port-5',
    title: 'Glass Pavilion Stage',
    category: 'reception',
    categoryLabel: 'Receptions',
    location: 'Chennai City Banquet',
    description: 'Contemporary geometric crystal backdrop with cascading blush florals and ambient mood uplighting.',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80',
    isWide: true,
  },
  {
    id: 'port-6',
    title: 'Intimate Sangeet Lounge',
    category: 'decor',
    categoryLabel: 'Sangeet & Lounge',
    location: 'Outdoor Courtyard',
    description: 'Warm brass lamps, custom velvet seating, and vibrant marigold accents celebrating joyous family song and dance.',
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9f1f8?auto=format&fit=crop&w=800&q=80',
  },
];

export const WHY_CHOOSE_US_DATA = [
  {
    number: '01',
    title: 'Thoughtful Planning',
    description:
      'We handle the complex timelines, vendor schedules, and family traditions so you can remain completely present in the joy of your celebration.',
  },
  {
    number: '02',
    title: 'Personalised Celebrations',
    description:
      'No two love stories are identical. We design decor concepts, ritual stages, and hospitality experiences tailored to your cultural background and taste.',
  },
  {
    number: '03',
    title: 'Attention to Detail',
    description:
      'From the freshness of the floral garlands to the precision of muhurtham cues and guest comfort, every nuance receives obsessive care.',
  },
  {
    number: '04',
    title: 'Seamless Coordination',
    description:
      'A dedicated planning lead acts as your single point of contact on-site, ensuring zero friction between decorators, caterers, and venues.',
  },
  {
    number: '05',
    title: 'Memorable Experiences',
    description:
      'We craft atmospheres that linger in the hearts of your families and guests for a lifetime — warm, gracious, and authentically joyous.',
  },
];

