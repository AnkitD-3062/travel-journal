import React from "react";
import { Compass, Map, BookOpen, Sparkles, Heart } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, bookingsCount, favoritesCount, onOpenFavorites }) {
  return (
    <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur-md border-b border-ink-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab("explore")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-gold-dark p-0.5 shadow-glow-gold transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-ink rounded-[10px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-gold transition-transform group-hover:rotate-45" />
              </div>
            </div>
            <div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-paper group-hover:text-gold transition-colors">
                Travel Journal
              </span>
              <span className="block text-[10px] font-mono tracking-widest uppercase text-muted">
                Stay Booking & Discovery
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-ink-light/80 p-1.5 rounded-full border border-ink-border shadow-inner">
            <button
              onClick={() => setActiveTab("explore")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "explore"
                  ? "bg-gold text-ink font-semibold shadow-md"
                  : "text-paper/70 hover:text-paper hover:bg-ink-card"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Stays</span>
            </button>

            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "map"
                  ? "bg-gold text-ink font-semibold shadow-md"
                  : "text-paper/70 hover:text-paper hover:bg-ink-card"
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Global Map</span>
            </button>

            <button
              onClick={() => setActiveTab("journal")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all relative ${
                activeTab === "journal"
                  ? "bg-gold text-ink font-semibold shadow-md"
                  : "text-paper/70 hover:text-paper hover:bg-ink-card"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Journal</span>
              {bookingsCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === "journal" ? "bg-ink text-gold" : "bg-teal text-paper"
                }`}>
                  {bookingsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Stats / Action */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[11px] font-mono text-muted uppercase tracking-wider">Atmosphere</span>
              <span className="text-xs font-serif italic text-gold-light">Warm Timber & Starlight</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
