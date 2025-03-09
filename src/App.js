import "./styles.css";

import React, { useState } from "react";
import KMLUploader from "./components/KMLUploader";
import MapView from "./components/MapView";
import SummaryTable from "./components/SummaryTable";
import DetailsTable from "./components/DetailsTable";
// import "./App.css";

function App() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="App">
      <h1>KML Viewer</h1>
      <KMLUploader onKMLParsed={setGeojsonData} />
      <MapView geojsonData={geojsonData} />

      <div className="buttons">
        <button onClick={() => setShowSummary(!showSummary)}>Summary</button>
        <button onClick={() => setShowDetails(!showDetails)}>Details</button>
      </div>

      {showSummary && <SummaryTable geojsonData={geojsonData} />}
      {showDetails && <DetailsTable geojsonData={geojsonData} />}
    </div>
  );
}

export default App;
