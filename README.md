# 🧭 Travel Journal — Stay Discovery & Booking Platform

> *Travel discovery by feeling rather than a long list of filters.*

A full-fledged, high-vibe travel discovery and stay booking application blending Airbnb-grade listings with an interactive, personal **Travel Journal**.

---

## ✨ Key Features

### 1. 🔍 Vibe-Driven Natural Language Discovery
- **Natural Language Search**: Type natural expressions such as *"a quiet wooden cabin on water with warm light and fast wifi"* or *"historic riad with quiet courtyard fountain"*.
- **Intent & Keyword Matching**: Evaluates keywords, synonyms, and amenities to compute a real-time **vibe match percentage** for each stay.
- **Filters & Sorting**: Filter by stay type (*Cabins, Waterfront, Historic, Mountain, Villas*), price ceilings, and sort by vibe fit, price, or rating.

### 2. 🏡 Airbnb-Grade Worldwide Stay Inventory
- Curated sanctuaries spanning the **UK, Japan, Italy, French Polynesia, Netherlands, India, Switzerland, California, Mexico, and Morocco**.
- Rich listing profiles:
  - Multi-photo galleries
  - Verified Superhost profiles & host biographies
  - Detailed capacity specs (guests, beds, baths)
  - Comprehensive amenities checklist (Starlink WiFi, wood burners, private hot tubs, espresso bars)
  - Real verified guest reviews & ratings

### 3. 🎟️ "Check In to Book a Stay" Experience
- Interactive reservation modal with **Check-In & Check-Out date picker**.
- **Guest counter** (Adults, Children, Pets).
- **Transparent real-time price calculation** (nights × rate + cleaning fee + platform service fee).
- **Spirit & Intention Tagging**: Guests declare the intention of their stay (*Creative Writing Retreat, Solitude & Digital Detox, Romantic Escape, etc.*).
- **Digital Boarding Pass**: Instant booking confirmation with confetti celebration, booking reference, secret lockbox code, and WiFi password.

### 4. 🗺️ Global Interactive Map (Leaflet)
- Embedded interactive world map with custom Airbnb-style price pill markers.
- Click any price marker to view stay previews and trigger direct check-in.

### 5. 📖 The Living Travel Journal
- Automatically generates a personalized trip entry whenever a stay is booked.
- **Trip Countdown & Local Weather Forecast**.
- **Interactive Packing Checklist**: Check off essentials or add custom gear.
- **Secret Access Keys**: View your lockbox code and WiFi credentials anytime.
- **Trip Scrapbook & Notes**: Add daily reflections, thoughts, and mood tags (*Serene, Reflective, Creative, Awe-inspired*).
- **Collectible Passport Stamps**: Unlocks custom illustrated stamps as you reserve sanctuaries worldwide.
- **Data Persistence**: Stays and journal entries are automatically saved in `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/AnkitD-3062/travel-journal.git
cd travel-journal

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom editorial color palette (*Ink, Paper, Gold, Teal, Brick*)
- **Typography**: Playfair Display (editorial serif) & Plus Jakarta Sans
- **Icons**: Lucide React
- **Mapping**: Leaflet & React-Leaflet
- **Celebration Effects**: Canvas Confetti
