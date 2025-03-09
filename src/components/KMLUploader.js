import React, { useState } from "react";
import { DOMParser } from "xmldom";
import * as toGeoJSON from "togeojson";

const KMLUploader = ({ onKMLParsed }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const xmlString = e.target.result;
      const kml = new DOMParser().parseFromString(xmlString, "text/xml");
      const geojson = toGeoJSON.kml(kml);
      console.log(geojson);
      onKMLParsed(geojson);
    };
    reader.readAsText(file);
  };

  return (
    <div className="kml-uploader">
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload KML File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".kml"
        onChange={handleFileUpload}
        className="file-input"
      />
      {fileName && <p className="file-name">Uploaded: {fileName}</p>}
    </div>
  );
};

export default KMLUploader;
