import React from "react";
import { Sparkles, Map, BookOpen } from "lucide-react";

const TABS = [
  { id: "explore", label: "Explore", Icon: Sparkles },
  { id: "map", label: "Map", Icon: Map },
  { id: "journal", label: "Journal", Icon: BookOpen }
];

// Floating tab switcher: bottom pill on small screens, slim right-edge rail on lg+. Keeps the Explore hero image-only (no header bar)
// while the Map and Journal tabs stay reachable.
export default function TabDock({ activeTab, setActiveTab, bookingsCount = 0 }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed z-40 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-full bg-ink/90 backdrop-blur-md border border-ink-border shadow-paper-lg lg:bottom-auto lg:left-auto lg:translate-x-0 lg:right-5 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col"
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            aria-current={active ? "page" : undefined}
            aria-label={label}
            title={label}
            className={`relative flex items-center gap-2 px-4 py-2 lg:p-3 rounded-full text-xs sm:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              active
                ? "bg-gold text-ink font-semibold"
                : "text-paper/70 hover:text-paper hover:bg-ink-card"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="lg:sr-only">{label}</span>
            {id === "journal" && bookingsCount > 0 && (
              <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-brick text-paper text-[10px] font-mono flex items-center justify-center lg:absolute lg:-top-1 lg:-right-1">
                {bookingsCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
