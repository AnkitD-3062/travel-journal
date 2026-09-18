import React, { useState } from "react";
import { Star, MapPin, Sparkles, Award, ArrowRight, ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";

export default function StayCard({ stay, matchScore, onSelectStay, onBookStay }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % stay.images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + stay.images.length) % stay.images.length);
  };

  return (
    <article
      onClick={() => onSelectStay(stay)}
      className="group bg-ink-light border border-ink-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 shadow-md hover:shadow-paper flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Photo Showcase */}
      <div className="relative h-60 w-full overflow-hidden bg-ink-card">
        <img
          src={stay.images[currentImgIndex]}
          alt={stay.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30 pointer-events-none" />

        {/* Vibe Match Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink/80 backdrop-blur-md border border-gold/40 text-gold text-xs font-mono font-bold shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{matchScore}% fit</span>
        </div>

        {/* Superhost Indicator */}
        {stay.host.isSuperhost && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-md text-ink text-[11px] font-bold shadow-md">
            <Award className="w-3.5 h-3.5 text-brick" />
            <span>Superhost</span>
          </div>
        )}

        {/* Carousel controls if multi-image */}
        {stay.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImg}
              className="p-1 rounded-full bg-ink/70 text-paper hover:bg-gold hover:text-ink transition-colors"
              title="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="p-1 rounded-full bg-ink/70 text-paper hover:bg-gold hover:text-ink transition-colors"
              title="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Photo dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {stay.images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentImgIndex ? "w-4 bg-gold" : "w-1.5 bg-paper/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1 text-teal-light font-mono uppercase tracking-wider font-semibold">
              <MapPin className="w-3.5 h-3.5 text-teal" />
              {stay.location}
            </span>
            <div className="flex items-center gap-1 text-gold font-bold">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>{stay.rating}</span>
              <span className="text-muted font-normal font-mono text-[11px]">({stay.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-xl font-bold text-paper group-hover:text-gold transition-colors line-clamp-1 mb-2">
            {stay.name}
          </h3>

          {/* Blurb */}
          <p className="text-paper/70 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {stay.blurb}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stay.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-ink-card text-paper/80 border border-ink-border"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer & Check-in Button */}
        <div className="pt-4 border-t border-ink-border flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-paper font-serif">
              ${stay.price}
              <span className="text-xs font-sans text-muted font-normal"> / night</span>
            </div>
            <span className="text-[10px] font-mono text-muted uppercase">{stay.type}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookStay(stay);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-ink font-semibold px-4 py-2.5 rounded-xl text-xs uppercase font-mono tracking-wider transition-all shadow-glow-gold hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Check In to Book</span>
          </button>
        </div>
      </div>
    </article>
  );
}
