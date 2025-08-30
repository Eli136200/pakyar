'use client';

import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Circle } from 'react-leaflet';

type LatLng = { lat: number; lng: number };
type Props = { value: LatLng; onChange: (p: LatLng) => void };

const DEFAULT_ZOOM = 16;

const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Recenter({ value }: { value: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([value.lat, value.lng]);
    // تضمین رندر صحیح
    setTimeout(() => map.invalidateSize(), 0);
  }, [value, map]);
  return null;
}

function ClickHandler({ onChange }: { onChange: (p: LatLng) => void }) {
  useMapEvents({
    click(e) { onChange({ lat: e.latlng.lat, lng: e.latlng.lng }); },
  });
  return null;
}

export default function MapClient({ value, onChange }: Props) {
  const [accuracy, setAccuracy] = useState<number | null>(null);

  return (
    <MapContainer
      center={[value.lat, value.lng]}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}   // والد این کامپوننت ارتفاع قطعی دارد
      scrollWheelZoom
      whenCreated={(map) => {
        setTimeout(() => map.invalidateSize(), 0);
        window.addEventListener('resize', () => map.invalidateSize());
      }}
    >
      {/* اگر TileLayer اختصاصی (مثل نشان) داری، همین‌جا جایگزین کن */}
      <TileLayer
        attribution="&copy; OSM contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Recenter value={value} />
      <ClickHandler onChange={onChange} />

      <Marker
        position={[value.lat, value.lng]}
        draggable
        icon={markerIcon}
        eventHandlers={{
          dragend: (e) => {
            const m = e.target as L.Marker;
            const ll = m.getLatLng();
            onChange({ lat: ll.lat, lng: ll.lng });
          },
        }}
      />

      {accuracy && (
        <Circle
          center={[value.lat, value.lng]}
          radius={Math.min(accuracy, 80)}
          pathOptions={{ color: '#22c55e', weight: 1, fillOpacity: 0.15 }}
        />
      )}
    </MapContainer>
  );
}
