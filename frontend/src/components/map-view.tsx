"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  pickup?: string;
  destination?: string;
  currentLocation?: [number, number];
  showRoute?: boolean;
  className?: string;
}

export default function MapView({
  pickup,
  destination,
  currentLocation = [40.7128, -74.006], // Default to NYC
  showRoute = true,
  className = "h-[300px] w-full rounded-lg overflow-hidden",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  // Mock coordinates based on location strings
  const getCoordinates = (location?: string): [number, number] => {
    if (!location) return currentLocation;

    // In a real app, you would use geocoding here
    // For demo purposes, we'll use random offsets from the current location
    const lat = currentLocation[0] + (Math.random() * 0.02 - 0.01);
    const lng = currentLocation[1] + (Math.random() * 0.02 - 0.01);
    return [lat, lng];
  };

  const pickupCoords = getCoordinates(pickup);
  const destinationCoords = getCoordinates(destination);

  useEffect(() => {
    // Skip if no map ref or if map is already initialized
    if (!mapRef.current || leafletMap.current) return;

    // Fix Leaflet icon issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    // Initialize map
    const map = L.map(mapRef.current).setView(currentLocation, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    leafletMap.current = map;

    // Clean up on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [currentLocation]);

  useEffect(() => {
    if (!leafletMap.current) return;

    // Clear existing markers and routes
    leafletMap.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        leafletMap.current?.removeLayer(layer);
      }
    });

    // Add tile layer back if it was removed
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap.current);

    // Add pickup marker
    if (pickup) {
      L.marker(pickupCoords)
        .addTo(leafletMap.current)
        .bindPopup("Pickup Location");
    }

    // Add destination marker
    if (destination) {
      L.marker(destinationCoords)
        .addTo(leafletMap.current)
        .bindPopup("Destination");
    }

    // Add current location marker
    L.marker(currentLocation, {
      icon: L.divIcon({
        className: "current-location-marker",
        html: `<div class="w-4 h-4 bg-primary rounded-full border-2 border-white"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    }).addTo(leafletMap.current);

    // Draw route between pickup and destination
    if (showRoute && pickup && destination) {
      const routePoints = [pickupCoords, destinationCoords];
      L.polyline(routePoints, { color: "#3b82f6", weight: 4 }).addTo(
        leafletMap.current
      );

      // Fit map to show both markers
      leafletMap.current.fitBounds(L.latLngBounds(routePoints), {
        padding: [50, 50],
      });
    }
  }, [
    pickup,
    destination,
    currentLocation,
    showRoute,
    pickupCoords,
    destinationCoords,
  ]);

  return <div ref={mapRef} className={className} />;
}
