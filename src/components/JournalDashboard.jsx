import React, { useState } from "react";
import { BookOpen, Calendar, MapPin, Key, Wifi, CloudSun, CheckSquare, Square, Plus, Trash2, Sparkles, Award, ArrowRight, Stamp } from "lucide-react";
import { PASSPORT_STAMPS } from "../data/defaultJournal";

export default function JournalDashboard({ bookings, setBookings, onExploreMore }) {
  const [activeTripId, setActiveTripId] = useState(bookings[0]?.id || null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteMood, setNewNoteMood] = useState("Serene");
  const [newPackingItem, setNewPackingItem] = useState("");

  const activeTrip = bookings.find((b) => b.id === activeTripId) || bookings[0];

  // Calculate total nights
  const totalNights = bookings.reduce((acc, b) => acc + (b.nights || 0), 0);

  // Toggle packing checklist item
  const togglePackingItem = (tripId, itemIndex) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== tripId) return b;
        const updatedList = [...b.packingList];
        updatedList[itemIndex].checked = !updatedList[itemIndex].checked;
        return { ...b, packingList: updatedList };
      })
    );
  };

  // Add packing item
  const addPackingItem = (tripId) => {
    if (!newPackingItem.trim()) return;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== tripId) return b;
        return {
          ...b,
          packingList: [...b.packingList, { item: newPackingItem.trim(), checked: false }]
        };
      })
    );
    setNewPackingItem("");
  };

  // Add journal note
  const addJournalNote = (tripId) => {
    if (!newNoteText.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: newNoteTitle.trim() || "Journal Reflection",
      text: newNoteText.trim(),
      mood: newNoteMood
    };

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== tripId) return b;
        return {
          ...b,
          journalNotes: [newNote, ...(b.journalNotes || [])]
        };
      })
    );

    setNewNoteTitle("");
    setNewNoteText("");
  };

  // Delete trip
  const removeBooking = (tripId) => {
    if (confirm("Are you sure you want to archive this stay from your active journal?")) {
      const remaining = bookings.filter((b) => b.id !== tripId);
      setBookings(remaining);
      if (activeTripId === tripId) {
        setActiveTripId(remaining[0]?.id || null);
      }
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-ink-light border border-gold/30 flex items-center justify-center text-gold shadow-glow-gold mb-6">
          <BookOpen className="w-10 h-10" />
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-paper mb-3">
          Your Travel Journal is Waiting
        </h2>
        <p className="text-paper/70 text-base max-w-lg mx-auto mb-8 font-light">
          When you check in and book a sanctuary, it will appear here as a living digital journal with trip countdowns, packing checklists, and secret check-in keys.
        </p>
        <button
          onClick={onExploreMore}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-ink font-bold font-mono text-xs uppercase tracking-wider shadow-glow-gold transition-transform hover:scale-105"
        >
          <span>Explore Sanctuaries & Book a Stay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Journal Overview Header Strip */}
      <div className="bg-gradient-to-r from-ink-light via-ink-card to-ink-light p-6 sm:p-8 rounded-3xl border border-ink-border shadow-paper flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-gold flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Traveler's Chronicles
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-paper">
            My Travel Journal
          </h1>
          <p className="text-xs sm:text-sm text-paper/70 mt-1 font-light">
            Documenting stays, feelings, and memories from the road.
          </p>
        </div>

        {/* Stats counters */}
        <div className="flex items-center gap-6 sm:gap-8 border-t md:border-t-0 md:border-l border-ink-border pt-4 md:pt-0 md:pl-8">
          <div>
            <div className="font-serif text-3xl font-bold text-gold">{bookings.length}</div>
            <span className="text-[10px] font-mono uppercase text-muted tracking-wider">Booked Stays</span>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-teal-light">{totalNights}</div>
            <span className="text-[10px] font-mono uppercase text-muted tracking-wider">Total Nights</span>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-brick-light">{PASSPORT_STAMPS.length}</div>
            <span className="text-[10px] font-mono uppercase text-muted tracking-wider">Stamps Earned</span>
          </div>
        </div>
      </div>

      {/* Collectible Passport Stamps Carousel */}
      <div className="bg-ink-light border border-ink-border rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gold" />
            <h3 className="font-editorial text-lg font-bold text-paper">
              Passport Stamps Collection
            </h3>
          </div>
          <span className="text-xs font-mono text-muted">
            Unlocked through confirmed stays
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PASSPORT_STAMPS.map((stamp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-ink-card border border-ink-border hover:border-gold/40 transition-all flex flex-col items-center text-center group"
            >
              <div
                className="w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center text-2xl mb-2 transition-transform group-hover:rotate-12"
                style={{ borderColor: stamp.color }}
              >
                {stamp.symbol}
              </div>
              <span className="font-editorial text-xs font-bold text-paper">{stamp.city}</span>
              <span className="text-[10px] font-mono text-muted truncate">{stamp.country}</span>
              <span className="mt-1 text-[9px] font-mono text-gold-light/80 italic">{stamp.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Trip Journal Split (Trip Selector + Active Journal Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Booked Journeys List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl font-bold text-paper">Your Journeys</h3>
            <span className="text-xs font-mono text-muted">{bookings.length} active</span>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                onClick={() => setActiveTripId(b.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                  activeTrip?.id === b.id
                    ? "bg-gold/10 border-gold shadow-glow-gold"
                    : "bg-ink-light border-ink-border hover:border-paper/40"
                }`}
              >
                <img
                  src={b.image}
                  alt={b.stayName}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-teal-light uppercase tracking-wider block">
                    {b.bookingCode}
                  </span>
                  <h4 className="font-editorial text-base font-bold text-paper truncate">
                    {b.stayName}
                  </h4>
                  <p className="text-xs text-muted truncate">{b.location}</p>

                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-mono text-gold font-semibold">
                      {b.nights} Nights • ${b.totalPrice}
                    </span>
                    <span className="text-[11px] font-mono text-paper/70">
                      {b.checkIn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Stay Journal Workspace (2 cols) */}
        {activeTrip && (
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Hero Banner with Countdown & Weather */}
            <div className="relative rounded-3xl overflow-hidden border border-ink-border bg-ink-light shadow-paper">
              <div className="h-44 w-full relative">
                <img
                  src={activeTrip.image}
                  alt={activeTrip.stayName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => removeBooking(activeTrip.id)}
                    className="px-3 py-1 rounded-full bg-ink/80 text-brick-light border border-brick/40 hover:bg-brick hover:text-paper text-xs font-mono transition-colors"
                  >
                    Archive Stay
                  </button>
                </div>
              </div>

              <div className="p-6 -mt-12 relative z-10 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-teal-light tracking-wider">
                      {activeTrip.location}
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-paper">
                      {activeTrip.stayName}
                    </h2>
                    <p className="text-xs sm:text-sm text-gold-light italic font-serif mt-0.5">
                      Vibe Intention: "{activeTrip.vibeIntention}"
                    </p>
                  </div>

                  {/* Weather & Booking Badge */}
                  <div className="flex items-center gap-3 bg-ink-card/90 border border-ink-border px-4 py-2 rounded-2xl">
                    <span className="text-2xl">{activeTrip.weather?.icon || "🌤️"}</span>
                    <div className="text-xs font-mono">
                      <div className="font-bold text-paper">{activeTrip.weather?.temp || "19°C"}</div>
                      <span className="text-muted">{activeTrip.weather?.condition || "Crisp & Clear"}</span>
                    </div>
                  </div>
                </div>

                {/* Key Access Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-ink-card border border-ink-border flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <div className="text-xs">
                      <span className="text-muted font-mono text-[10px] uppercase block">Dates</span>
                      <strong className="text-paper">{activeTrip.checkIn} → {activeTrip.checkOut}</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-ink-card border border-ink-border flex items-center gap-3">
                    <Key className="w-5 h-5 text-gold-dark" />
                    <div className="text-xs">
                      <span className="text-muted font-mono text-[10px] uppercase block">Lockbox Code</span>
                      <strong className="font-mono text-paper">{activeTrip.lockboxCode || "TL-8824"}</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-ink-card border border-ink-border flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-teal" />
                    <div className="text-xs">
                      <span className="text-muted font-mono text-[10px] uppercase block">WiFi Access</span>
                      <strong className="font-mono text-paper">{activeTrip.wifiDetails?.pass || "staychill2026"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Packing Checklist & Local Secrets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Packing Checklist */}
              <div className="bg-ink-light border border-ink-border rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-base font-bold text-paper flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-teal" />
                    Packing Checklist
                  </h4>
                  <span className="text-[11px] font-mono text-muted">
                    {activeTrip.packingList?.filter((i) => i.checked).length || 0}/
                    {activeTrip.packingList?.length || 0}
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeTrip.packingList?.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => togglePackingItem(activeTrip.id, idx)}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-ink-card hover:bg-ink-border/50 transition-colors cursor-pointer text-xs"
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-teal flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-muted flex-shrink-0" />
                      )}
                      <span className={item.checked ? "line-through text-muted" : "text-paper"}>
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Item Form */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newPackingItem}
                    onChange={(e) => setNewPackingItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addPackingItem(activeTrip.id)}
                    placeholder="Add essential item..."
                    className="flex-1 bg-ink-card border border-ink-border rounded-xl px-3 py-2 text-xs text-paper placeholder:text-muted focus:outline-none focus:border-gold"
                  />
                  <button
                    onClick={() => addPackingItem(activeTrip.id)}
                    className="p-2 rounded-xl bg-teal text-paper hover:bg-teal-light transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Local Secrets / Recommended Rhythms */}
              <div className="bg-ink-light border border-ink-border rounded-2xl p-5 space-y-3">
                <h4 className="font-editorial text-base font-bold text-paper flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Curated Local Rhythms
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-ink-card border border-ink-border">
                    <span className="font-bold text-gold block mb-0.5">🌅 Morning Golden Hour</span>
                    <p className="text-paper/75">
                      Walk down to the waterside deck with a hot cup between 6:30 and 7:15 AM when lake mist rises.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-ink-card border border-ink-border">
                    <span className="font-bold text-teal-light block mb-0.5">🥖 Village Baker & Market</span>
                    <p className="text-paper/75">
                      The local bakery bakes warm sourdough daily at 8:00 AM. Cash only, 10 min walk through the birch trees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Living Scrapbook & Journal Reflections */}
            <div className="bg-ink-light border border-ink-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-ink-border pb-4">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-paper">
                    Trip Scrapbook & Reflections
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    Capture your feelings, thoughts, and memories from this sanctuary.
                  </p>
                </div>
              </div>

              {/* Add New Reflection Box */}
              <div className="bg-ink-card border border-ink-border rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Entry title (e.g. Twilight by the Fireplace)..."
                    className="flex-1 bg-ink border border-ink-border rounded-xl px-3 py-2 text-xs text-paper placeholder:text-muted focus:outline-none focus:border-gold"
                  />
                  <select
                    value={newNoteMood}
                    onChange={(e) => setNewNoteMood(e.target.value)}
                    className="bg-ink border border-ink-border rounded-xl px-3 py-2 text-xs text-gold font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="Serene">Mood: Serene 😌</option>
                    <option value="Reflective">Mood: Reflective 💭</option>
                    <option value="Awe-inspired">Mood: Awe-inspired ✨</option>
                    <option value="Creative">Mood: Creative 🎨</option>
                    <option value="Restful">Mood: Restful 🌙</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="What does the air smell like? What thoughts came to mind today?"
                  className="w-full bg-ink border border-ink-border rounded-xl p-3 text-xs sm:text-sm text-paper placeholder:text-muted focus:outline-none focus:border-gold resize-y"
                />

                <div className="flex justify-end">
                  <button
                    onClick={() => addJournalNote(activeTrip.id)}
                    className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-ink font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Memory</span>
                  </button>
                </div>
              </div>

              {/* Notes Timeline */}
              <div className="space-y-4">
                {activeTrip.journalNotes && activeTrip.journalNotes.length > 0 ? (
                  activeTrip.journalNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-paper text-ink p-5 rounded-2xl shadow-paper border border-paper-border space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs border-b border-paper-border pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-editorial text-base font-bold text-ink">{note.title}</span>
                          <span className="px-2 py-0.5 rounded-full bg-paper-dark font-mono text-[10px] text-teal-dark font-bold">
                            {note.mood}
                          </span>
                        </div>
                        <span className="font-mono text-muted text-[11px]">
                          {note.date} • {note.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-ink/85 font-serif leading-relaxed whitespace-pre-line">
                        {note.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted text-center py-6 italic">
                    No reflections logged yet. Pour a cup of tea and write your first entry above.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
