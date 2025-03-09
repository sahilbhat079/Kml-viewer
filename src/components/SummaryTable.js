import React from "react";

const SummaryTable = ({ geojsonData }) => {
  if (!geojsonData) return null;

  const elementCount = {};
  geojsonData.features.forEach((feature) => {
    const type = feature.geometry.type;
    elementCount[type] = (elementCount[type] || 0) + 1;
  });

  return (
    <div>
      <h3>Summary</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(elementCount).map(([type, count]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
