"use-client";

import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import { LatLngExpression, LatLngBounds } from "leaflet";

import { LatLng } from "@/types";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type DepartureAndArrivalProps = {
  geoDeparture: LatLng;
  geoArrival: LatLng;
};

const polylineOptions = { fillColor: "#00aff5" };
const circleOptions = { color: "#00aff5" };

export default function ReactLeafletMap({
  geoDeparture,
  geoArrival,
}: DepartureAndArrivalProps) {
  const polyline: LatLngExpression[] = [
    [geoDeparture.lat, geoDeparture.lng],
    [geoArrival.lat, geoArrival.lng],
  ];

  return (
    <MapContainer
      center={[
        (geoDeparture.lat + geoArrival.lat) / 2,
        (geoDeparture.lng + geoArrival.lng) / 2,
      ]}
      zoom={12}
      style={{ width: "500px", height: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CircleMarker
        center={[geoDeparture.lat, geoDeparture.lng]}
        pathOptions={circleOptions}
        radius={20}
      />

      <CircleMarker
        center={[geoArrival.lat, geoArrival.lng]}
        pathOptions={circleOptions}
        radius={20}
      />

      <Polyline pathOptions={polylineOptions} positions={polyline} />

      <Marker position={[geoArrival.lat, geoArrival.lng]} />

      <FitBounds geoDeparture={geoDeparture} geoArrival={geoArrival} />
    </MapContainer>
  );
}

/** Fit the map to the bounds of the departure and arrival points */
const FitBounds = ({ geoDeparture, geoArrival }: DepartureAndArrivalProps) => {
  const map = useMap();

  useEffect(() => {
    const bounds = new LatLngBounds(
      [geoDeparture.lat, geoDeparture.lng],
      [geoArrival.lat, geoArrival.lng],
    );
    map.fitBounds(bounds);
  }, [geoDeparture, geoArrival, map]);

  return null;
};
