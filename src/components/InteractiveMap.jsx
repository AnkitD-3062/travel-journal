import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Star, MapPin, CalendarCheck, Sparkles } from "lucide-react";

// Fix default leaflet icons if used
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create custom Airbnb-style price pill icon
const createPriceIcon = (price, isSelected) => {
  return L.divIcon({
    className: "custom-price-marker",
    html: `
      <div style="
        background: ${isSelected ? '#c9a227' : '#1b2337'};
        color: ${isSelected ? '#12182b' : '#f4efe3'};
        border: 1px solid ${isSelected ? '#e0c775' : '#2e3b59'};
        padding: 4px 8px;
        border-radius: 9999px;
        font-weight: 700;
        font-family: ui-monospace, monospace;
        font-size: 11px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        white-space: nowrap;
        transform: translate(-50%, -50%);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 3px;
      ">
        <span>$${price}</span>
      </div>
    `,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });
};

export default function InteractiveMap({ stays, onSelectStay, onBookStay }) {
  // Center roughly in Europe / Atlantic to show global spread
  const defaultCenter = [30.0, 10.0];

  return (
    <div className="w-full h-[calc(100vh-140px)] min-h-[500px] relative rounded-2xl overflow-hidden border border-ink-border shadow-2xl">
      {/* Map Overlay Badge */}
      <div className="absolute top-4 left-4 z-[1000] bg-ink/90 backdrop-blur-md border border-ink-border px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs">
        <Sparkles className="w-4 h-4 text-gold" />
        <span className="font-mono text-paper font-semibold">
          {stays.length} Sanctuaries on Map
        </span>
        <span className="text-muted font-light">• Click any price marker to inspect</span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={3}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {stays.map((stay) => (
          <Marker
            key={stay.id}
            position={stay.coordinates}
            icon={createPriceIcon(stay.price, false)}
          >
            <Popup className="stay-map-popup" minWidth={260} maxWidth={280}>
              <div className="p-1 space-y-2 text-paper">
                <img
                  src={stay.images[0]}
                  alt={stay.name}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-teal-light mb-1">
                    <span className="truncate max-w-[170px]">{stay.location}</span>
                    <span className="text-gold font-bold">? {stay.rating}</span>
                  </div>
                  <h4 className="font-editorial text-sm font-bold text-paper truncate">
                    {stay.name}
                  </h4>
                  <p className="text-[11px] text-muted line-clamp-1 mt-0.5">{stay.blurb}</p>
                </div>

                <div className="pt-2 border-t border-ink-border flex items-center justify-between">
                  <div className="font-mono text-sm font-bold text-gold">
                    ${stay.price} <span className="text-[10px] text-muted font-normal">/ night</span>
                  </div>
                  <button
                    onClick={() => onBookStay(stay)}
                    className="px-2.5 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-ink font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                  >
                    <CalendarCheck className="w-3 h-3" />
                    Check In
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
