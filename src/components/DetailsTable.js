import React from "react";

const calculateLength = (coordinates) => {
  let length = 0;
  for (let i = 1; i < coordinates.length; i++) {
    const [lon1, lat1] = coordinates[i - 1];
    const [lon2, lat2] = coordinates[i];

    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    length += R * c;
  }
  return length.toFixed(2); // Round to 2 decimal places
};

const DetailsTable = ({ geojsonData }) => {
  if (!geojsonData) return null;

  const details = [];
  geojsonData.features.forEach((feature) => {
    if (feature.geometry.type === "LineString") {
      details.push({
        type: "LineString",
        length: calculateLength(feature.geometry.coordinates),
      });
    }
  });

  return (
    <div>
      <h3>Details</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Total Length (km)</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, index) => (
            <tr key={index}>
              <td>{item.type}</td>
              <td>{item.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
