import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const MapView = ({ geojsonData }) => {
  return (
    <MapContainer
      center={[20, 77]}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonData && <GeoJSON data={geojsonData} />}
    </MapContainer>
  );
};

export default MapView;
