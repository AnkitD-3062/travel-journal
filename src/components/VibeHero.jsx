import React from "react";
import { Sparkles, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

export default function VibeHero({
  searchPrompt,
  setSearchPrompt,
  activeTags,
  onResetPrompt,
  selectedPriceMax,
  setSelectedPriceMax,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy
}) {
  const examplePrompts = [
    { label: "quiet cabin, water, warm light", prompt: "a quiet cabin near water with fast wifi and warm light in the evenings" },
    { label: "secluded + cheap by a lake", prompt: "somewhere secluded and cheap by a lake, no rush" },
    { label: "overwater + Michelin, $30/night", prompt: "an overwater bungalow near a Michelin restaurant for under $100 a night" },
    { label: "historic riad, quiet fountain", prompt: "historic courtyard riad with quiet fountain and orange blossoms" },
    { label: "high-altitude alpine hut", prompt: "high altitude mountain hut with wood stove and glacier views" }
  ];

  const stayTypes = [
    { label: "All Stays", value: "all" },
    { label: "Cabins & Huts", value: "Cabin" },
    { label: "Water & Coastal", value: "Water" },
    { label: "Historic Heritage", value: "Historic" },
    { label: "Villas & Chalets", value: "Villa" }
  ];

  return (
    <section className="relative w-full">
      {/* ---------- Hero Photo Band (Flat-lay travel desk) ---------- */}
      <div
        className="relative w-full min-h-[44vw] max-h-[460px] bg-cover bg-center bg-no-repeat"
        role="img"
        aria-label="Travel journal with postcards, a compass, and travel keepsakes"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}travel-journal-hero.png')`,
          backgroundPosition: "center center"
        }}
      />

      {/* ---------- Floating Boarding Ticket (Overlapping by -mt-14) ---------- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-14 sm:-mt-16">
        <div className="bg-paper text-ink rounded-2xl p-5 sm:p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] border border-paper-border">
          {/* Ticket Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs uppercase tracking-wider text-[#8c733e] font-semibold flex items-center gap-1.5">
              <span>✈️</span> Boarding • one sentence is enough
            </p>
            {searchPrompt && (
              <button
                onClick={onResetPrompt}
                className="text-[11px] font-mono text-muted hover:text-ink flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          {/* Ticket Input Row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end">
            <div className="flex-1 relative">
              <textarea
                rows={2}
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="e.g. a quiet cabin near water with fast wifi and warm light in the evenings…"
                className="w-full bg-transparent border-0 border-b border-[#c7bda3] rounded-none py-2 text-base text-ink placeholder:text-[#8a8069] focus:outline-none focus:border-ink transition-colors resize-none font-sans"
              />
            </div>

            <button
              onClick={() => {}}
              className="bg-ink hover:bg-ink-light text-gold font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all shadow-md whitespace-nowrap flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Find the vibe</span>
              <span>✨</span>
            </button>
          </div>

          {/* Inspiration Chips */}
          <div className="mt-4 pt-3.5 border-t border-dashed border-[#d8cfb6] flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-[11px] text-[#7a6f58] uppercase mr-1">Try:</span>
            {examplePrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchPrompt(item.prompt)}
                className="px-3 py-1 rounded-full border border-[#c7bda3] hover:border-ink hover:bg-paper-dark text-[#5c533f] hover:text-ink transition-all text-xs font-sans"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Detected Vibes Badges */}
          {activeTags.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-[#d8cfb6]/60 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-[#7a6f58]">Detected Vibes:</span>
              {activeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-ink text-gold border border-gold/40 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Refined Quick Filter Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {stayTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedType === type.value
                    ? "bg-gold text-ink font-semibold shadow-sm"
                    : "bg-ink-light/80 text-paper/70 hover:text-paper hover:bg-ink-card border border-ink-border"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Price & Sort Dropdowns */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-ink-light/80 border border-ink-border px-3 py-1.5 rounded-lg text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <select
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="bg-transparent text-paper font-semibold focus:outline-none cursor-pointer"
              >
                <option value={1000} className="bg-ink">Any Price</option>
                <option value={100} className="bg-ink">Under $100</option>
                <option value={150} className="bg-ink">Under $150</option>
                <option value={200} className="bg-ink">Under $200</option>
                <option value={300} className="bg-ink">Under $300</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-ink-light/80 border border-ink-border px-3 py-1.5 rounded-lg text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-paper font-semibold focus:outline-none cursor-pointer"
              >
                <option value="vibe" className="bg-ink">Best Fit</option>
                <option value="price-asc" className="bg-ink">Price: Low to High</option>
                <option value="price-desc" className="bg-ink">Price: High to Low</option>
                <option value="rating" className="bg-ink">Top Rated ★</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
