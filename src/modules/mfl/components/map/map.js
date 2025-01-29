import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useHistory, useLocation } from "react-router-dom";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { coordinatesGeocoder } from "../../utils/coordinatesGeocoder";
import { StylesControl } from "mapbox-gl-controls";
import mapboxStyles from "../../assets/styles/mapboxStyles.json";
import { marker } from "../../utils/markers";
import { capitalize } from "../../../../utils/commons/toCapitalize";
import markerRural from "../../assets/images/marker1.png";
import markerUrban from "../../assets/images/marker4.png";
import markerPrivate from "../../assets/images/marker10.png";
import markerDefault from "../../assets/images/marker.png";
import { useTranslation } from "react-i18next";
import * as turf from "@turf/turf";

const Map = ({ coordinates, container, zoom, legend }) => {
  const { t } = useTranslation();
  let history = useHistory();
  let location = useLocation();

  mapboxgl.accessToken =
    "pk.eyJ1IjoieGVyaW5kYTE3IiwiYSI6ImNsMWdlMTBvbzAyOTYzb281dmE1eWhuNjQifQ.8U0O0SU8PabXzATSf6hGNA";

  const mapContainer = useRef(null);

  console.log("coordinates", coordinates);
  const setCenter = () => {
    if (coordinates.length === 1) {
      if (coordinates[0].Geometry) return coordinates[0].Geometry.coordinates;
      else return [34.760742, -19.311143];
    } else return [34.760742, -19.311143];
  };

  const getCenterPoint = (coordinates) => {
    coordinates.forEach((element) => {
      for (let i = 0; i < element.length; i++) {
        element[i] = Number(element[i]);
      }
    });
    if (coordinates) {
      var features = turf.points(coordinates);
      var center = turf.center(features);
    }
    return center.geometry.coordinates;
  };

  const allCoordinates = [];
  if (coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      if (!coordinates[i].hasOwnProperty("Geometry")) {
        continue;
      }
      if (coordinates[i].Geometry) {
        if (coordinates[i].Geometry.type === "Point") {
          allCoordinates.push(coordinates[i].Geometry.coordinates);
        }
      }
    }
  }

  if (coordinates && coordinates.length > 2) {
    allCoordinates.push(allCoordinates[0]);
    var poly = turf.polygon([allCoordinates]);
    var scaledPoly = turf.transformScale(poly, 1.4);
  }
  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: container,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center:
        coordinates && allCoordinates.length > 0
          ? getCenterPoint(allCoordinates)
          : [34.760742, -19.311143],
      zoom: 7,
      attributionControl: false,
      preserveDrawingBuffer: true,
    });

    // Add controls to the map
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.addControl(
      new StylesControl({
        styles: mapboxStyles,
      }),
      "top-left"
    );

    //Add popups and markers
    const popup = new mapboxgl.Popup();

    if (coordinates) {
      for (const coord of coordinates) {
        const el = document.createElement("div");
        el.className = marker(coord.HealthFacilityType);
        if (
          location.pathname.toString().includes("details") ||
          coordinates.length < 10
        ) {
          el.className = `${marker(coord.HealthFacilityType)} increase-marker`;
        }

        if (coord.Geometry) {
          if (coord.Geometry.type === "Point") {
            new mapboxgl.Marker(el)
              .setLngLat(coord.Geometry.coordinates)
              .addTo(map);
          }
        }

        if (!location.pathname.toString().includes("details")) {
          el.addEventListener("click", () => {
            history.push(`/mfl/mfl-details/${coord.id}`);
          });
        }

        el.addEventListener("mouseover", () => {
          popup
            .setLngLat(coord.Geometry.coordinates)
            .setHTML(
              `<h6>${
                coord.HealthFacilityName
              }</h6>- ${coord.HealthFacilityType ||
                "Unidade Sanitária"} <br />- ${capitalize(
                coord.Province
              )}, ${capitalize(coord.District)}`
            )
            .addTo(map);
        });
        el.addEventListener("mouseleave", () => {
          popup.remove();
        });
      }
    }
    if (coordinates && coordinates.length > 2)
      map.fitBounds(turf.bbox(scaledPoly));
  }, [coordinates]);

  return (
    <div>
      <div id={container} className="" ref={mapContainer}></div>

      {coordinates && (
        <div class="legend-box shadow-sm" hidden={legend}>
          <div className="d-flex align-items-center">
            <img className="marker-legend" src={markerRural} alt="Rural" />{" "}
            <small>{t("centro-rural")}</small>
          </div>
          <div className="d-flex align-items-center">
            <img className="marker-legend" src={markerUrban} alt="Urbano" />{" "}
            <small>{t("centro-urbano")}</small>
          </div>
          <div className="d-flex align-items-center">
            <img className="marker-legend" src={markerPrivate} alt="Privado" />{" "}
            <small>{t("centro-privado")}</small>
          </div>
          <div className="d-flex align-items-center">
            <img
              className="marker-legend"
              src={markerDefault}
              alt="Predefinido"
            />{" "}
            <small>{t("nao-definido")}</small>
          </div>
        </div>
      )}
    </div>
  );
};
export default Map;
