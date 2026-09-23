import React, { useState, useEffect, useMemo } from "react";
import VibeHero from "./components/VibeHero";
import StayCard from "./components/StayCard";
import StayDetailsModal from "./components/StayDetailsModal";
import BookingModal from "./components/BookingModal";
import InteractiveMap from "./components/InteractiveMap";
import JournalDashboard from "./components/JournalDashboard";
import { STAYS_DATA } from "./data/staysData";
import { VIBE_KEYWORDS, INITIAL_BOOKINGS } from "./data/defaultJournal";
import { Sparkles, Compass, MapPin } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("explore");
  const [searchPrompt, setSearchPrompt] = useState("quiet cabin by water with warm light");
  const [selectedPriceMax, setSelectedPriceMax] = useState(1000);
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("vibe");

  // Modals state
  const [selectedStayForDetails, setSelectedStayForDetails] = useState(null);
  const [stayToBook, setStayToBook] = useState(null);

  // Bookings with localStorage persistence
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("travel_journal_bookings");
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch (e) {
      return INITIAL_BOOKINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("travel_journal_bookings", JSON.stringify(bookings));
    } catch (e) {
      // safe fallback
    }
  }, [bookings]);

  // Listen for navigation event from Boarding Pass modal
  useEffect(() => {
    const handleOpenJournal = () => setActiveTab("journal");
    window.addEventListener("OPEN_JOURNAL", handleOpenJournal);
    return () => window.removeEventListener("OPEN_JOURNAL", handleOpenJournal);
  }, []);

  // Extract detected vibe tags from the natural language prompt
  const detectedTags = useMemo(() => {
    const lower = searchPrompt.toLowerCase();
    return Object.entries(VIBE_KEYWORDS)
      .filter(([, words]) => words.some((w) => lower.includes(w)))
      .map(([tag]) => tag);
  }, [searchPrompt]);

  // Score, filter, and sort stays
  const rankedStays = useMemo(() => {
    let list = STAYS_DATA.map((stay) => {
      let score = 0;
      if (detectedTags.length === 0) {
        score = 85; // baseline interest
      } else {
        const matches = detectedTags.filter((t) => stay.tags.includes(t)).length;
        score = Math.round((matches / detectedTags.length) * 100);
        // Minimum score floor if partially related
        if (score === 0 && stay.tags.some((t) => detectedTags.includes(t))) {
          score = 30;
        }
      }
      return { stay, score: Math.max(score, 10) };
    });

    // Filter by type
    if (selectedType !== "all") {
      list = list.filter(({ stay }) =>
        stay.type.toLowerCase().includes(selectedType.toLowerCase()) ||
        stay.tags.includes(selectedType.toLowerCase())
      );
    }

    // Filter by max price
    list = list.filter(({ stay }) => stay.price <= selectedPriceMax);

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "vibe") return b.score - a.score;
      if (sortBy === "price-asc") return a.stay.price - b.stay.price;
      if (sortBy === "price-desc") return b.stay.price - a.stay.price;
      if (sortBy === "rating") return b.stay.rating - a.stay.rating;
      return 0;
    });

    return list;
  }, [detectedTags, selectedType, selectedPriceMax, sortBy]);

  const handleBookingSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col font-sans">
      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === "explore" && (
          <div>
            {/* Hero & Search Header */}
            <VibeHero
              searchPrompt={searchPrompt}
              setSearchPrompt={setSearchPrompt}
              activeTags={detectedTags}
              onResetPrompt={() => setSearchPrompt("")}
              selectedPriceMax={selectedPriceMax}
              setSelectedPriceMax={setSelectedPriceMax}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Stay Results Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-ink-border">
                <div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-paper">
                    Your Curated Sanctuaries
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1 font-mono">
                    {rankedStays.length} stays matching your rhythm � Ranked by vibe harmony
                  </p>
                </div>
              </div>

              {rankedStays.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rankedStays.map(({ stay, score }) => (
                    <StayCard
                      key={stay.id}
                      stay={stay}
                      matchScore={score}
                      onSelectStay={(s) => setSelectedStayForDetails(s)}
                      onBookStay={(s) => setStayToBook(s)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-ink-light rounded-3xl border border-dashed border-ink-border p-8">
                  <Compass className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
                  <h3 className="font-editorial text-xl font-bold text-paper mb-2">
                    No sanctuaries match this exact combination
                  </h3>
                  <p className="text-sm text-muted max-w-md mx-auto mb-6">
                    Try raising your price ceiling or removing one specific keyword from your vibe prompt.
                  </p>
                  <button
                    onClick={() => {
                      setSearchPrompt("");
                      setSelectedPriceMax(1000);
                      setSelectedType("all");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gold text-ink font-mono text-xs uppercase font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Global Interactive Map Tab */}
        {activeTab === "map" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1">
                Spatial Exploration
              </span>
              <h1 className="font-editorial text-3xl font-bold text-paper">
                Worldwide Sanctuaries Map
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Explore listings by price and geography. Click any pin to inspect details or check in.
              </p>
            </div>

            <InteractiveMap
              stays={STAYS_DATA}
              onSelectStay={(s) => setSelectedStayForDetails(s)}
              onBookStay={(s) => setStayToBook(s)}
            />
          </section>
        )}

        {/* Living Travel Journal Tab */}
        {activeTab === "journal" && (
          <JournalDashboard
            bookings={bookings}
            setBookings={setBookings}
            onExploreMore={() => setActiveTab("explore")}
          />
        )}
      </main>

      {/* Stay Details Modal (Airbnb-style) */}
      <StayDetailsModal
        stay={selectedStayForDetails}
        isOpen={Boolean(selectedStayForDetails)}
        onClose={() => setSelectedStayForDetails(null)}
        onBookStay={(s) => setStayToBook(s)}
      />

      {/* "Check In to Book a Stay" Modal */}
      <BookingModal
        stay={stayToBook}
        isOpen={Boolean(stayToBook)}
        onClose={() => setStayToBook(null)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-ink-border bg-ink-light/50 py-10 mt-16 text-center text-xs text-muted">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-editorial text-base text-paper">
            <Compass className="w-4 h-4 text-gold" />
            <span>Travel Journal</span>
          </div>
          <p className="font-light">
            Stay discovery by feeling � Handcrafted with vintage editorial care & Airbnb-grade experience.
          </p>
          <p className="font-mono text-[11px] text-muted/60">
            � 2026 Travel Journal Platform � All sample stays, photos & coordinates curated for immersive discovery.
          </p>
        </div>
      </footer>
    </div>
  );
}
