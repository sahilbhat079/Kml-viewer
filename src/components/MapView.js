import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet"; // Import Leaflet for utility functions
import "leaflet/dist/leaflet.css";

const MapView = React.memo(({ geojsonData }) => {
  const mapRef = useRef(null); // Ref to access the map instance

  // Validate geojsonData before rendering
  const isValidGeoJSON =
    geojsonData &&
    typeof geojsonData === "object" &&
    geojsonData.type === "FeatureCollection";

  // Zoom to the bounds of the GeoJSON data when it changes
  useEffect(() => {
    if (isValidGeoJSON && mapRef.current) {
      const geoJSONLayer = L.geoJSON(geojsonData); // Create a Leaflet GeoJSON layer
      const bounds = geoJSONLayer.getBounds(); // Get the bounds of the GeoJSON data
      mapRef.current.fitBounds(bounds); // Fit the map to the bounds
    }
  }, [geojsonData, isValidGeoJSON]);

  return (
    <MapContainer
      center={[30, 90]} // Centered on Asia (approx. coordinates)
      zoom={3} // Adjust zoom level as needed
      style={{
        height: "500px",
        width: "80%",
      }}
      preferCanvas={true}
      ref={mapRef} // Attach the ref to the map
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {isValidGeoJSON && <GeoJSON data={geojsonData} />}
    </MapContainer>
  );
});

export default MapView;
