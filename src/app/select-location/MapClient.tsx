'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

type LatLng = { lat: number; lng: number };

const pinSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
  <g fill="none">
    <path d="M23 2c9.4 0 17 7.6 17 17 0 11.3-14.5 25-17 25S6 30.3 6 19C6 9.6 13.6 2 23 2z" fill="#16A34A"/>
    <circle cx="23" cy="19" r="6" fill="#fff"/>
  </g>
</svg>
`);
const greenPin = new L.Icon({
  iconUrl: `data:image/svg+xml;utf8,${pinSvg}`,
  iconSize: [46, 46],
  iconAnchor: [23, 40],
});

function ClickHandler({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng);
    },
  });
  return null;
}

export default function MapClient({
  value,
  onChange,
}: {
  value: LatLng;
  onChange: (v: LatLng) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="w-full h-[72vh]">
      <MapContainer
        center={[value.lat, value.lng]}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[value.lat, value.lng]} icon={greenPin} />
        <ClickHandler onPick={onChange} />
      </MapContainer>
    </div>
  );
}
