import React from "react";
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

export default function VibeHero({
  searchPrompt,
  setSearchPrompt,
  activeTags,
  onTagToggle,
  onResetPrompt,
  selectedPriceMax,
  setSelectedPriceMax,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy
}) {
  const examplePrompts = [
    "A quiet wooden cabin on water with warm light and fast wifi",
    "Historic riad with quiet courtyard fountain and mint tea",
    "Overwater glass bungalow with private lagoon swimming",
    "Secluded alpine hut with mountain views and wood fireplace",
    "Affordable writer loft near water under $100",
    "Tropical jungle villa with plunge pool and sunset terrace"
  ];

  const stayTypes = [
    { label: "All Stays", value: "all" },
    { label: "Cabins & Huts", value: "Cabin" },
    { label: "Water & Coastal", value: "Water" },
    { label: "Historic Heritage", value: "Historic" },
    { label: "Villas & Chalets", value: "Villa" }
  ];

  return (
    <section className="relative pt-8 pb-12 overflow-hidden border-b border-ink-border bg-gradient-to-b from-ink-light/70 via-ink to-ink">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Vibe-Driven Stays
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper mb-4 leading-tight">
            Travel discovery by feeling.
          </h1>
          <p className="text-paper/75 text-base sm:text-lg font-light max-w-xl mx-auto">
            Describe the sanctuary you are longing for. We curate stays from around the world that match your mood, rhythm, and intention.
          </p>
        </div>

        {/* Vintage Search Ticket Box */}
        <div className="bg-paper text-ink rounded-2xl p-4 sm:p-6 shadow-paper-lg border border-paper-border transition-all">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="e.g. Quiet cabin by water with warm light and wood stove under $150..."
                className="w-full bg-paper-light border border-paper-border rounded-xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
              {searchPrompt && (
                <button
                  onClick={onResetPrompt}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1 rounded-full hover:bg-paper-dark"
                  title="Clear prompt"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => {}}
              className="bg-ink hover:bg-ink-light text-gold font-mono text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Tune Vibes
            </button>
          </div>

          {/* Quick Example Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted font-mono uppercase text-[10px] tracking-wider mr-1">Inspirations:</span>
            {examplePrompts.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setSearchPrompt(ex)}
                className="px-3 py-1 rounded-full bg-paper-dark hover:bg-gold/20 hover:text-ink text-ink/80 border border-paper-border transition-all text-left"
              >
                "{ex}"
              </button>
            ))}
          </div>

          {/* Extracted Active Vibe Tags */}
          {activeTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-paper-border/60 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-muted tracking-wider">Detected Vibes:</span>
              {activeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-ink text-gold border border-gold/40 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Secondary Filter & Sort Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Stay Type Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {stayTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedType === type.value
                    ? "bg-gold text-ink font-semibold"
                    : "bg-ink-light text-paper/70 hover:text-paper hover:bg-ink-card border border-ink-border"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Price & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Price Max Filter */}
            <div className="flex items-center gap-2 bg-ink-light border border-ink-border px-3 py-1.5 rounded-lg text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span className="text-muted">Max:</span>
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

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-ink-light border border-ink-border px-3 py-1.5 rounded-lg text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-paper font-semibold focus:outline-none cursor-pointer"
              >
                <option value="vibe" className="bg-ink">Highest Vibe Match</option>
                <option value="price-asc" className="bg-ink">Price: Low to High</option>
                <option value="price-desc" className="bg-ink">Price: High to Low</option>
                <option value="rating" className="bg-ink">Highest Rated (? 4.9+)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
