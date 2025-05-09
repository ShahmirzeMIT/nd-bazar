
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserLocation } from "@/types";
import { adminLocation } from "@/data/mockData";

interface LocationPickerProps {
  onSelectLocation: (location: UserLocation) => void;
  selectedLocation: UserLocation | null;
}

const LocationPicker = ({ onSelectLocation, selectedLocation }: LocationPickerProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const adminMarkerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);

  // Mock map implementation (in a real app, would use a mapping library)
  const mockMapInit = () => {
    if (!mapRef.current) return;
    
    // Simulate map creation
    mapInstance.current = {
      setCenter: (lat: number, lng: number) => {
        console.log(`Map centered at ${lat}, ${lng}`);
        if (markerRef.current) {
          markerRef.current.setPosition(lat, lng);
        } else {
          markerRef.current = { setPosition: () => {} };
        }
        
        // Update the visualization
        updateMapVisualization(lat, lng);
      },
      onClick: (callback: (lat: number, lng: number) => void) => {
        // Simulate click by adding click event to the map container
        mapRef.current?.addEventListener("click", (e) => {
          // For demo purposes, generate coordinates near the admin location
          const rect = mapRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Convert click position to simulated coordinates
          // This is just a simple simulation - in real app we'd use actual map coordinates
          const latOffset = ((y / rect.height) - 0.5) * 0.2;
          const lngOffset = ((x / rect.width) - 0.5) * 0.2;
          
          const lat = adminLocation.latitude + latOffset;
          const lng = adminLocation.longitude + lngOffset;
          
          callback(lat, lng);
        });
      }
    };
    
    // Add admin marker
    adminMarkerRef.current = {
      setPosition: () => {}
    };
    
    // Add user marker (initially hidden)
    markerRef.current = {
      setPosition: () => {}
    };
    
    // Add polyline (initially hidden)
    polylineRef.current = {
      setPath: () => {}
    };
    
    // Initialize map with admin location
    mapInstance.current.setCenter(adminLocation.latitude, adminLocation.longitude);
    
    // Set up click handling
    mapInstance.current.onClick((lat: number, lng: number) => {
      handleMapClick(lat, lng);
    });
    
    // If there's a selected location, show it
    if (selectedLocation) {
      mapInstance.current.setCenter(selectedLocation.latitude, selectedLocation.longitude);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    const location: UserLocation = {
      latitude: lat,
      longitude: lng,
      address: `Seçilmiş Məkan (${lat.toFixed(4)}, ${lng.toFixed(4)})`
    };
    
    onSelectLocation(location);
  };

  const updateMapVisualization = (userLat: number, userLng: number) => {
    // This would update the actual map in a real implementation
    if (!mapRef.current) return;
    
    // Visual feedback in our mock implementation
    const mapElement = mapRef.current;
    const adminPoint = document.createElement("div");
    adminPoint.className = "absolute w-4 h-4 bg-farm-green rounded-full";
    adminPoint.style.left = "50%";
    adminPoint.style.top = "50%";
    adminPoint.style.transform = "translate(-50%, -50%)";
    adminPoint.title = "Admin məkanı";
    
    // Clear previous points
    mapElement.querySelectorAll(".point").forEach(el => el.remove());
    adminPoint.classList.add("point");
    
    // Add admin point
    mapElement.appendChild(adminPoint);
    
    // Add user point if we have location
    const userPoint = document.createElement("div");
    userPoint.className = "absolute w-4 h-4 bg-blue-500 rounded-full point";
    
    // Calculate position based on lat/lng offsets from admin location
    const latDiff = userLat - adminLocation.latitude;
    const lngDiff = userLng - adminLocation.longitude;
    
    // Convert to percentages for positioning
    const top = 50 - (latDiff / 0.2) * 50;  // Reverses the calculation from handleMapClick
    const left = 50 + (lngDiff / 0.2) * 50;
    
    userPoint.style.top = `${top}%`;
    userPoint.style.left = `${left}%`;
    userPoint.title = "Sizin məkanınız";
    
    mapElement.appendChild(userPoint);
    
    // Add a line connecting the points
    const line = document.createElement("div");
    line.className = "absolute h-0.5 bg-blue-500 origin-left point";
    line.style.top = `${(top + 50) / 2}%`;
    line.style.left = `${Math.min(left, 50)}%`;
    
    // Calculate length and rotation
    const dx = left - 50;
    const dy = top - 50;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    line.style.width = `${length}%`;
    line.style.transform = `rotate(${angle}deg)`;
    
    mapElement.appendChild(line);
  };

  useEffect(() => {
    mockMapInit();
  }, []);

  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolokasiya brauzerdə dəstəklənmir");
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // In a real app, we would reverse geocode to get the address
        const location: UserLocation = {
          latitude,
          longitude,
          address: `Cari məkan (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        };
        
        onSelectLocation(location);
        
        // Update map
        if (mapInstance.current) {
          mapInstance.current.setCenter(latitude, longitude);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Məkanınızı təyin etmək mümkün olmadı. Zəhmət olmasa icazə verin və ya xəritədən seçin.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <div className="rounded-lg overflow-hidden border border-farm-brown-light">
      <div 
        ref={mapRef} 
        className="map-container relative bg-gray-200 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-opacity-50 bg-farm-accent pattern-cross pattern-farm-brown pattern-bg-white pattern-size-2 pattern-opacity-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {!selectedLocation && (
              <span className="bg-white/80 px-4 py-2 rounded-lg text-farm-green font-medium text-sm">
                Çatdırılma məkanını təyin etmək üçün xəritəyə klikləyin və ya aşağıdakı düyməni istifadə edin
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4">
        <Button
          onClick={handleGetCurrentLocation}
          className="w-full bg-farm-green hover:bg-farm-green/80"
          disabled={loading}
        >
          {loading ? "Məkan təyin edilir..." : "Məkanımı İstifadə Et"}
        </Button>
        
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        
        {selectedLocation && (
          <div className="mt-4">
            <h4 className="font-semibold text-farm-green">Seçilmiş məkan:</h4>
            <p className="text-gray-600">{selectedLocation.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
