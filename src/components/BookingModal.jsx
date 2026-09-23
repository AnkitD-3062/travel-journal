import React, { useState, useMemo } from "react";
import { X, Calendar, Users, Sparkles, CheckCircle2, ShieldCheck, Key, Wifi, ArrowRight, Compass } from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingModal({ stay, isOpen, onClose, onBookingSuccess }) {
  if (!isOpen || !stay) return null;

  // Defaults: Check-in in 5 days, stay for 3 nights
  const getFutureDate = (daysAhead) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split("T")[0];
  };

  const [checkIn, setCheckIn] = useState(getFutureDate(5));
  const [checkOut, setCheckOut] = useState(getFutureDate(8));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [vibeIntention, setVibeIntention] = useState("Quiet Solitude & Nature Recharge");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculate nights
  const nights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  // Pricing calculations
  const basePrice = stay.price * nights;
  const cleaningFee = Math.round(stay.price * 0.4);
  const serviceFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const intentions = [
    "Quiet Solitude & Nature Recharge",
    "Creative Writing & Deep Focus",
    "Romantic Escape & Stargazing",
    "Slow Living & Culinary Exploration",
    "Digital Nomad High-Speed Workcation"
  ];

  const handleConfirm = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    const bookingId = `TJ-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newBooking = {
      id: bookingId,
      stayId: stay.id,
      stayName: stay.name,
      location: stay.location,
      country: stay.country,
      image: stay.images[0],
      checkIn,
      checkOut,
      nights,
      guests: { adults, children, pets },
      totalPrice,
      vibeIntention,
      bookingCode: bookingId,
      status: "Confirmed",
      lockboxCode: stay.lockboxCode || "TL-5521",
      wifiDetails: stay.wifiDetails || { ssid: "StayGuest", pass: "traveljournal2026" },
      weather: { temp: "18°C", condition: "Crisp & Clear", icon: "🌤️" },
      packingList: [
        { item: "Travel notebook & camera", checked: true },
        { item: "Warm layered clothing", checked: false },
        { item: "Headphones & walking shoes", checked: true },
        { item: "Personal toiletries & book", checked: false }
      ],
      journalNotes: [
        {
          id: `note-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          title: "Check-In Reservation Made",
          text: `Booked for ${nights} nights at ${stay.name}. Intention: ${vibeIntention}. Counting down the days!`,
          mood: "Excited"
        }
      ]
    };

    setConfirmedBooking(newBooking);
    setIsConfirmed(true);
    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-ink border border-ink-border rounded-3xl max-w-2xl w-full overflow-hidden shadow-paper-lg relative my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-ink-border flex items-center justify-between bg-ink-light/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">
              {isConfirmed ? "Booking Confirmed" : "Check In to Book a Stay"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-ink-card text-muted hover:text-paper transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form or Boarding Pass */}
        {!isConfirmed ? (
          <div className="p-6 space-y-6">
            {/* Stay Summary Strip */}
            <div className="flex gap-4 p-4 rounded-2xl bg-ink-card border border-ink-border">
              <img
                src={stay.images[0]}
                alt={stay.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono text-teal-light uppercase tracking-wider block">
                  {stay.location}
                </span>
                <h3 className="font-editorial text-lg font-bold text-paper truncate">
                  {stay.name}
                </h3>
                <p className="text-xs text-muted font-sans mt-0.5">{stay.type}</p>
                <div className="mt-2 text-sm font-bold text-gold">
                  ${stay.price} <span className="text-xs text-muted font-normal font-sans">/ night</span>
                </div>
              </div>
            </div>

            {/* Dates Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-muted tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-gold" />
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={getFutureDate(0)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-ink-card border border-ink-border rounded-xl px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-gold" />
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-ink-card border border-ink-border rounded-xl px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Guests Counter */}
            <div className="p-4 rounded-xl bg-ink-card border border-ink-border space-y-3">
              <label className="block text-xs font-mono uppercase text-muted tracking-wider">
                <Users className="w-3.5 h-3.5 inline mr-1.5 text-gold" />
                Guests Allocation (Max {stay.guests})
              </label>

              <div className="flex items-center justify-between text-sm">
                <span>Adults (Age 13+)</span>
                <div className="flex items-center gap-3">
                  <button
                    disabled={adults <= 1}
                    onClick={() => setAdults((a) => Math.max(1, a - 1))}
                    className="w-8 h-8 rounded-lg bg-ink text-paper hover:bg-gold hover:text-ink disabled:opacity-30 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-mono font-bold">{adults}</span>
                  <button
                    disabled={adults + children >= stay.guests}
                    onClick={() => setAdults((a) => a + 1)}
                    className="w-8 h-8 rounded-lg bg-ink text-paper hover:bg-gold hover:text-ink disabled:opacity-30 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Children</span>
                <div className="flex items-center gap-3">
                  <button
                    disabled={children <= 0}
                    onClick={() => setChildren((c) => Math.max(0, c - 1))}
                    className="w-8 h-8 rounded-lg bg-ink text-paper hover:bg-gold hover:text-ink disabled:opacity-30 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-mono font-bold">{children}</span>
                  <button
                    disabled={adults + children >= stay.guests}
                    onClick={() => setChildren((c) => c + 1)}
                    className="w-8 h-8 rounded-lg bg-ink text-paper hover:bg-gold hover:text-ink disabled:opacity-30 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Vibe Intention Selection */}
            <div>
              <label className="block text-xs font-mono uppercase text-muted tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-gold" />
                What is the spirit / intention of this stay?
              </label>
              <div className="space-y-2">
                {intentions.map((intent) => (
                  <label
                    key={intent}
                    onClick={() => setVibeIntention(intent)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                      vibeIntention === intent
                        ? "bg-gold/10 border-gold text-paper font-semibold shadow-sm"
                        : "bg-ink-card border-ink-border text-paper/70 hover:border-paper/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intention"
                      checked={vibeIntention === intent}
                      onChange={() => setVibeIntention(intent)}
                      className="accent-gold"
                    />
                    <span>{intent}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-xl bg-ink-light border border-ink-border space-y-2 text-xs">
              <div className="flex justify-between text-paper/80">
                <span>${stay.price} × {nights} nights</span>
                <span className="font-mono">${basePrice}</span>
              </div>
              <div className="flex justify-between text-paper/80">
                <span>Cleaning & preparation fee</span>
                <span className="font-mono">${cleaningFee}</span>
              </div>
              <div className="flex justify-between text-paper/80">
                <span>Journal platform service fee</span>
                <span className="font-mono">${serviceFee}</span>
              </div>
              <div className="pt-2 border-t border-ink-border flex justify-between text-sm font-bold text-paper">
                <span>Total Due</span>
                <span className="font-mono text-gold text-base">${totalPrice}</span>
              </div>
            </div>

            {/* Check-In CTA */}
            <button
              onClick={handleConfirm}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-ink font-bold uppercase tracking-wider font-mono text-sm transition-all shadow-glow-gold flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <span>Check In to Book ({nights} Nights • ${totalPrice})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Confirmed Digital Boarding Pass */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-teal-light mb-2">
              <CheckCircle2 className="w-8 h-8 text-teal" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1">
                Boarding Pass & Access Key
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-paper">
                Your Stay is Reserved!
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1">
                We have added this journey into your personal <strong className="text-paper">Travel Journal</strong>.
              </p>
            </div>

            {/* Vintage Ticket Shell */}
            <div className="bg-paper text-ink rounded-2xl p-6 shadow-paper-lg border border-paper-border text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full pointer-events-none" />

              <div className="flex justify-between items-start border-b border-paper-border pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted">Destination</span>
                  <h4 className="font-editorial text-xl font-bold text-ink">{confirmedBooking.stayName}</h4>
                  <p className="text-xs text-teal font-mono">{confirmedBooking.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted">Booking Code</span>
                  <div className="font-mono text-sm font-bold text-brick">{confirmedBooking.bookingCode}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase">Check-In</span>
                  <div className="font-semibold">{confirmedBooking.checkIn}</div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase">Check-Out</span>
                  <div className="font-semibold">{confirmedBooking.checkOut}</div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase">Nights</span>
                  <div className="font-semibold">{confirmedBooking.nights} Nights</div>
                </div>
              </div>

              {/* Secret Lockbox & WiFi Credentials */}
              <div className="bg-paper-dark p-3.5 rounded-xl border border-paper-border grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-gold-dark" />
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">Lockbox Code</span>
                    <span className="font-mono font-bold text-ink">{confirmedBooking.lockboxCode}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-teal" />
                  <div>
                    <span className="text-[9px] font-mono text-muted uppercase block">WiFi Password</span>
                    <span className="font-mono font-bold text-ink">{confirmedBooking.wifiDetails.pass}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-paper-border flex justify-between items-center text-[11px] text-muted">
                <span>Vibe: <strong className="text-ink">{confirmedBooking.vibeIntention}</strong></span>
                <span className="font-mono font-bold text-ink">${confirmedBooking.totalPrice} Paid</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl bg-ink-card hover:bg-ink-light border border-ink-border text-paper font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("OPEN_JOURNAL"));
                }}
                className="flex-1 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-ink font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-glow-gold flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Open in My Journal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
