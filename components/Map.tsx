import React from 'react';

interface MapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
  mapUrl?: string;
}

const DEFAULT_LAT = 17.438684298449086;
const DEFAULT_LNG = 78.39968951759191;

const Map: React.FC<MapProps> = ({ lat = DEFAULT_LAT, lng = DEFAULT_LNG, zoom = 15, title = "Venue Location", mapUrl }) => {
  // Show only a preview of the coordinates (centered, with marker)
  let mapSrc = '';
  if (mapUrl) {
    mapSrc = mapUrl;
  } else {
    // Google Maps embed with marker at the coordinates
    mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
  }

  // Directions URL for Google Maps
  const directionsUrl =
    lat != null && lng != null
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : mapUrl || 'https://www.google.com/maps';

  return (
    <div>
      <iframe
        src={mapSrc}
        width="100%"
        height="600"
        className="border-0 rounded-lg shadow-2xl"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        style={{ filter: 'invert(90%) hue-rotate(180deg)' }} // force dark mode if embed doesn't support
      ></iframe>
      <div className="mt-4 flex justify-center">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-emerald-400 text-black rounded-lg shadow hover:bg-emerald-500 transition"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default Map;
