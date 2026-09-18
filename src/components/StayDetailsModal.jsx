import React, { useState } from "react";
import { X, Star, MapPin, Award, Check, CalendarCheck, ShieldCheck, Heart, Share2, Sparkles, MessageCircle } from "lucide-react";

export default function StayDetailsModal({ stay, isOpen, onClose, onBookStay }) {
  if (!isOpen || !stay) return null;

  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-ink border border-ink-border rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        {/* Sticky Modal Top Bar */}
        <div className="px-6 py-4 border-b border-ink-border flex items-center justify-between bg-ink/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-lg font-bold text-paper truncate max-w-md">
              {stay.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ink-card text-muted hover:text-paper transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Header titles */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-teal-light">
                <MapPin className="w-4 h-4 text-teal" />
                {stay.location}, {stay.country}
              </span>
              <div className="flex items-center gap-1 text-sm font-bold text-gold">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span>{stay.rating}</span>
                <span className="text-muted font-normal font-mono">({stay.reviewsCount} verified reviews)</span>
              </div>
            </div>
            <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-paper mb-2">
              {stay.name}
            </h1>
            <p className="text-sm sm:text-base text-gold-light/90 font-serif italic">
              "{stay.tagline}"
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden h-[340px] sm:h-[420px]">
            {/* Main Featured Photo */}
            <div className="md:col-span-2 h-full relative group cursor-pointer" onClick={() => setActivePhoto(0)}>
              <img
                src={stay.images[0]}
                alt={stay.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Side Photos */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
              {stay.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(idx + 1)}
                  className="h-full relative group cursor-pointer overflow-hidden rounded-xl"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Layout: Details + Booking Action Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Content (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Capacity Specs */}
              <div className="flex flex-wrap items-center gap-4 py-4 border-y border-ink-border text-xs sm:text-sm text-paper/80 font-mono">
                <span>{stay.type}</span>
                <span>•</span>
                <span>{stay.guests} guests max</span>
                <span>•</span>
                <span>{stay.bedrooms} bedroom(s)</span>
                <span>•</span>
                <span>{stay.beds} bed(s)</span>
                <span>•</span>
                <span>{stay.baths} bath(s)</span>
              </div>

              {/* Host Badge & Profile */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-ink-light border border-ink-border">
                <img
                  src={stay.host.avatar}
                  alt={stay.host.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-editorial text-base font-bold text-paper">
                      Hosted by {stay.host.name}
                    </h4>
                    {stay.host.isSuperhost && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brick/20 text-brick-light text-[10px] font-bold border border-brick/40">
                        <Award className="w-3 h-3 text-brick" />
                        Superhost
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted font-sans mt-0.5">
                    Hosting since {stay.host.joinedYear} • {stay.host.responseRate} response rate
                  </p>
                  <p className="text-xs text-paper/70 mt-1 italic">
                    "{stay.host.bio}"
                  </p>
                </div>
              </div>

              {/* Long Description */}
              <div>
                <h3 className="font-editorial text-xl font-bold text-paper mb-3">About this sanctuary</h3>
                <p className="text-paper/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                  {stay.longDescription}
                </p>
              </div>

              {/* Verified Amenities */}
              <div>
                <h3 className="font-editorial text-xl font-bold text-paper mb-4">What this stay offers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stay.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-ink-card border border-ink-border text-xs sm:text-sm text-paper/90"
                    >
                      <Check className="w-4 h-4 text-teal flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Reviews Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-editorial text-xl font-bold text-paper">
                    Guest Reflections
                  </h3>
                  <span className="text-xs font-mono text-gold font-bold">? {stay.rating} Overall Rating</span>
                </div>

                <div className="space-y-3">
                  {stay.reviews.map((rev, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-ink-light border border-ink-border">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-paper">{rev.author}</span>
                        <span className="font-mono text-muted">{rev.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-paper/75 italic">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Booking Sticky Widget */}
            <div className="bg-ink-light border border-gold/40 rounded-2xl p-6 shadow-glow-gold space-y-6 sticky top-20">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-paper font-serif">${stay.price}</span>
                  <span className="text-xs text-muted"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gold font-bold">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>{stay.rating}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-ink-card border border-ink-border text-xs space-y-2 text-paper/80 font-mono">
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <strong className="text-paper">{stay.guests} Guests</strong>
                </div>
                <div className="flex justify-between">
                  <span>Instant Check-In:</span>
                  <strong className="text-teal-light">Available</strong>
                </div>
                <div className="flex justify-between">
                  <span>Cancellation:</span>
                  <strong className="text-paper">Flexible 48h</strong>
                </div>
              </div>

              {/* Main Check In to Book Button */}
              <button
                onClick={() => {
                  onClose();
                  onBookStay(stay);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-ink font-bold uppercase tracking-wider font-mono text-xs sm:text-sm transition-all shadow-glow-gold flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Check In to Book This Stay</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted text-center font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                <span>Zero hidden fees • Adds to Travel Journal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
