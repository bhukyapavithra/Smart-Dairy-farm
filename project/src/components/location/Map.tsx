import React, { useRef, useEffect, useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapProps {
  locations: {
    id: string;
    name: string;
    coordinates: Coordinates;
  }[];
  center?: Coordinates;
  onLocationSelect?: (locationId: string) => void;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ 
  locations, 
  center = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  onLocationSelect, 
  zoom = 10 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // This is a mock implementation
    // In a real application, you would integrate with Google Maps or Mapbox
    // For this prototype, we're creating a simple visual representation
    
    if (mapRef.current) {
      // Set up the map container
      setIsLoaded(true);
    }
  }, []);

  // Simulate map markers by creating visual elements
  const renderMarkers = () => {
    return locations.map(location => (
      <div 
        key={location.id}
        className="absolute w-6 h-6 bg-farm-green-600 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
        style={{
          // This is a simple way to position "markers" on our mock map
          // It's not geographically accurate but works for the prototype
          left: `${(location.coordinates.lng + 180) / 360 * 100}%`,
          top: `${(90 - location.coordinates.lat) / 180 * 100}%`,
        }}
        onClick={() => onLocationSelect && onLocationSelect(location.id)}
        title={location.name}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
          {location.id.charAt(0)}
        </div>
        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 bg-white p-2 rounded shadow-md text-sm whitespace-nowrap">
          {location.name}
        </div>
      </div>
    ));
  };

  if (!isLoaded) {
    return (
      <div ref={mapRef} className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-farm-green-600"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.pexels.com/photos/139366/pexels-photo-139366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]" />
      
      {/* Map Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white bg-opacity-70 px-4 py-2 rounded text-gray-700">
          Interactive map would be integrated here
        </div>
      </div>
      
      {/* Markers */}
      {renderMarkers()}
      
      {/* Controls (simplified) */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
          +
        </button>
        <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
          -
        </button>
      </div>
    </div>
  );
};

export default Map;