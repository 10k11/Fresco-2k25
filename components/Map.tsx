import React from 'react';

interface MapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
  mapUrl?: string;
}

const Map: React.FC<MapProps> = ({ lat, lng, zoom = 15, title = "Venue Location", mapUrl }) => {
  // Prefer an explicitly provided mapUrl (e.g. https://maps.app.goo.gl/qZYfz9DLaQDsddmt5).
  // If none is provided, build an embeddable Google Maps URL from lat/lng.
  let mapSrc = '';
  if (mapUrl) {
    mapSrc = mapUrl;
  } else if (lat != null && lng != null) {
    mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
  } else {
    // Fallback to a generic Google Maps view if no mapUrl or coords provided.
    mapSrc = `https://www.google.com/maps?z=${zoom}&output=embed`;
  }

  return (
    <iframe
      src={mapSrc}
      width="100%"
      height="600"
      className="border-0 rounded-lg shadow-2xl"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
    ></iframe>
  );
};

export default Map;
