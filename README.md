# Joyous Wedding Planet — Luxury Wedding & Event Planning Website

A world-class, editorial digital experience crafted specifically for **Joyous Wedding Planet**, a premier wedding planning and event orchestration firm based in **Pattalam, Chennai, Tamil Nadu**.

---

## 🌟 Brand & Creative Direction

- **Brand Name:** Joyous Wedding Planet
- **Location:** Pattalam, Chennai, Tamil Nadu 600012, India
- **Direct Phone:** +91 95516 12563
- **Official WhatsApp:** +91 95516 12563 (`https://wa.me/919551612563`)
- **Aesthetic:** Luxury editorial wedding aesthetic, contemporary Indian wedding elegance, balanced whitespace, cinematic imagery, and restrained champagne gold accents.

### Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Warm Ivory** | `#F8F5EF` | Primary atmospheric background |
| **Champagne Gold** | `#C6A46A` | Restrained metallic luxury accent |
| **Deep Espresso** | `#29231F` | Rich contrast, typography & night scenes |
| **Muted Beige** | `#E9DFD0` | Subtle cards, dividers & secondary borders |
| **Soft White** | `#FFFFFF` | Elevated card surfaces |
| **Charcoal** | `#252525` | Deep text contrast & structure |

---

## 🏛️ Website Structure & Features

1. **Refined Navigation Bar:**
   - Wordmark & monogram crest (`JWP`)
   - Smooth desktop navigation with gold underlines
   - Transitions into a compact sticky ivory bar with backdrop blur and shadow on scroll
   - Animated mobile slide-out drawer
   - Direct phone link & prominent *"Plan Your Wedding"* CTA button.

2. **Cinematic Hero Section:**
   - Full-viewport atmospheric photography with warm golden overlays
   - Editorial typography: *"Your Dream Wedding, Beautifully Brought to Life."*
   - Subtitle: *"Thoughtfully planned celebrations, unforgettable experiences and extraordinary moments — crafted around your love story."*
   - Dual CTAs: *"Plan Your Wedding"* and *"Explore Our Work"*
   - Quick WhatsApp link to the Chennai planning team.

3. **About Section ("Celebrations That Become Memories"):**
   - Split layout with editorial photography composition and studio vignette
   - Transparent, authentic narrative about the Chennai team
   - 4 core commitments: Bespoke Conceptualization, Transparent Coordination, Trusted Vendor Network, Flawless Day-of Execution
   - *"Discover Our Story & Consult"* CTA.

4. **Curated Services (6 Categories):**
   - Full Wedding Planning
   - Engagement Celebrations
   - Wedding Decor & Scenography
   - Catering & Guest Hospitality
   - Cinematography & Photography
   - Receptions & Special Events
   - Each card features curated photography, service description, bullet highlights, and a direct enquiry trigger that pre-selects the service in the modal.

5. **Wedding Scenography & Portfolio:**
   - Asymmetric editorial grid
   - Interactive category filter (*All Celebrations, Mandap & Stages, Royal Receptions, Floral Architecture, Sacred Rituals*)
   - Interactive Lightbox with image inspection and *"Plan Similar Decor"* CTA
   - Ethical transparency note respecting genuine client photography standards.

6. **Why Choose Us:**
   - 5 core pillars: *Thoughtful Planning, Personalised Celebrations, Attention to Detail, Seamless Coordination, Memorable Experiences*
   - Chennai heritage dedication card highlighting local venue familiarity and muhurtham coordination.

7. **Testimonials (Strict Transparency Standard):**
   - Elegant, clean placeholder card inviting couples to share their stories
   - Option for prospective couples to *"Request Client References"* upon consultation
   - No fabricated claims or fake reviews.

8. **Contact Section & Embedded Form:**
   - Direct business details: Phone (`+91 95516 12563`), Location (`Pattalam, Chennai 600012`), WhatsApp link
   - Full consultation form with validation for Indian mobile numbers (`+91` / 10 digits).

9. **Automatic Enquiry Pop-Up (Core Feature):**
   - Appears automatically after 1.5 seconds on first visit
   - Header: *"LET'S PLAN SOMETHING BEAUTIFUL"*
   - Title: *"Your Celebration Begins Here."*
   - Subtitle: *"Share your details with us. Our wedding planning experts will connect with you to understand your requirements and help bring your celebration to life."*
   - Fields: Full Name (validated), Mobile Number (validated), Event Type dropdown, plus expandable Date & Notes
   - Primary: *"REQUEST A CALLBACK"*, Secondary: *"Maybe Later"*
   - Dismissal memory: 24-hour cooldown stored in `localStorage`
   - Permanent suppression after submission
   - Reopenable from every *"Plan Your Wedding"* CTA.

10. **Backend Submission & WhatsApp Failover Architecture:**
    - Submits to Express API `/api/enquiries`
    - Validates on both client and server
    - Records lead to `server/data/enquiries.json` with timestamp, source page, and status
    - **Offline/Unconnected Safety:** If the backend is offline, it explicitly informs the user and provides a 1-tap WhatsApp dispatch prefilled with all their enquiry details so no real lead is ever lost!

11. **Floating WhatsApp Action:**
    - Fixed at bottom-right corner with subtle pulse glow and tooltip
    - Prefilled message to `+91 95516 12563`
    - Mobile-safe positioning.

---

## 🚀 Running the Application

### 1. Development Mode (Frontend + Backend)
Run both the Vite frontend and Express backend concurrently:
```bash
npm run dev:all
```
- Frontend: `http://localhost:5173/`
- Backend API: `http://localhost:5000/`

### 2. Run Only Frontend
```bash
npm run dev
```

### 3. Run Only Backend Server
```bash
npm run server
```

### 4. Build for Production
```bash
npm run build
```
Generates optimized, minified production assets in the `dist/` folder.

