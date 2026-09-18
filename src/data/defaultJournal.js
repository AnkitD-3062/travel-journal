export const VIBE_KEYWORDS = {
  water: ["water", "lake", "river", "fjord", "canal", "ocean", "sea", "lagoon", "beach", "coast", "coastal", "stream"],
  quiet: ["quiet", "silent", "peaceful", "calm", "serene", "solitude", "stillness", "zen", "tranquil"],
  secluded: ["secluded", "remote", "private", "isolated", "hideaway", "hidden", "off-grid", "untouched"],
  "warm light": ["warm light", "lamp", "glow", "cozy", "cosy", "amber", "fireplace", "candle", "lantern", "wood burner"],
  cabin: ["cabin", "cottage", "hut", "shed", "chalet", "lodge", "timber", "shack", "treehouse"],
  wifi: ["wifi", "wi-fi", "internet", "fiber", "remote work", "workstation", "fast internet"],
  cheap: ["cheap", "budget", "affordable", "under $100", "under 100", "low cost", "economical"],
  city: ["city", "walkable", "central", "urban", "downtown", "metropolis", "neighborhood"],
  food: ["michelin", "restaurant", "food", "culinary", "chef", "cooking", "bakery", "dining", "gastronomy"],
  overwater: ["overwater", "over water", "bungalow", "stilt", "lagoon villa"],
  mountain: ["mountain", "alpine", "peak", "slope", "glacier", "hike", "ridge", "snow"],
  historic: ["historic", "heritage", "ancient", "century", "stone", "traditional", "machiya", "riad", "castle"],
  nature: ["nature", "forest", "trees", "woods", "jungle", "wild", "garden", "redwoods"],
  luxury: ["luxury", "pool", "plunge", "spa", "exclusive", "suite", "villa", "pampered"],
  sunset: ["sunset", "golden hour", "horizon", "dusk", "sea view", "panoramic"]
};

export const PASSPORT_STAMPS = [
  {
    country: "United Kingdom",
    city: "Northumberland",
    symbol: "??",
    color: "#4c7a6e",
    dateIssued: "2026-08-14",
    tag: "Dark Sky Reserve"
  },
  {
    country: "Japan",
    city: "Kyoto",
    symbol: "??",
    color: "#a9503f",
    dateIssued: "2026-05-22",
    tag: "Bamboo & Hinoki"
  },
  {
    country: "Italy",
    city: "Amalfi Coast",
    symbol: "??",
    color: "#c9a227",
    dateIssued: "2026-06-19",
    tag: "Pergola & Azure"
  },
  {
    country: "French Polynesia",
    city: "Bora Bora",
    symbol: "??",
    color: "#2e6f7e",
    dateIssued: "2026-07-04",
    tag: "Glass Lagoon"
  },
  {
    country: "Morocco",
    city: "Marrakech",
    symbol: "??",
    color: "#a05b38",
    dateIssued: "2026-09-02",
    tag: "Medina Zellige"
  },
  {
    country: "Switzerland",
    city: "Zermatt",
    symbol: "???",
    color: "#3f5a7a",
    dateIssued: "2026-01-15",
    tag: "Glacier High Peak"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "trip-sample-01",
    stayId: "tarn-house",
    stayName: "Tarn Timber Sanctuary",
    location: "Kielder Water, Northumberland, UK",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    checkIn: "2026-10-12",
    checkOut: "2026-10-16",
    nights: 4,
    guests: { adults: 2, children: 0, pets: 1 },
    totalPrice: 532,
    vibeIntention: "Creative Writing & Forest Solitude",
    bookingCode: "TJ-KLD-9418",
    status: "Confirmed",
    weather: { temp: "14°C", condition: "Misty Rain", icon: "???" },
    packingList: [
      { item: "Warm Shetland wool sweater", checked: true },
      { item: "Moleskine journal & fountain pen", checked: true },
      { item: "Waterproof hiking boots", checked: false },
      { item: "Stargazing star map app", checked: false },
      { item: "Favorite ground coffee beans", checked: true }
    ],
    journalNotes: [
      {
        id: "note-1",
        date: "2026-09-15",
        time: "21:40",
        title: "The Packing Thoughts",
        text: "Ordered a tin of Earl Grey and packed three spare ink cartridges. Can't wait to hear the rain hitting the cedar shingles while the wood stove crackles.",
        mood: "Reflective"
      }
    ]
  }
];
