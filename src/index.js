import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./i18nextConf";
import "./index.css";
import App from "./app/App";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl-controls/lib/controls.css";

ReactDOM.render(
  <Suspense fallback="...">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
