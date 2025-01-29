import React, { useEffect, useRef} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useHistory } from "react-router-dom";
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

const Map = ({ coordinates, container, zoom, legend }) => {
  let history = useHistory();

  mapboxgl.accessToken =
    "pk.eyJ1IjoieGVyaW5kYTE3IiwiYSI6ImNsMWdlMTBvbzAyOTYzb281dmE1eWhuNjQifQ.8U0O0SU8PabXzATSf6hGNA";

  const mapContainer = useRef(null);

  const setCenter = () => {
    if (coordinates.length === 1) {
      if (coordinates[0].Geometry) return coordinates[0].Geometry.coordinates;
      else return [34.760742, -19.311143];
    } else return [34.760742, -19.311143];
  };
  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: container,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: coordinates ? setCenter() : [34.760742, -19.311143],
      zoom: zoom,
      attributionControl: false,
      preserveDrawingBuffer: true,
    });

    // Add controls to the map
    if (coordinates && coordinates.length !== 1) {
      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          localGeocoder: coordinatesGeocoder,
          zoom: 4,
          placeholder: "Pesquisar...",
          mapboxgl: mapboxgl,
          reverseGeocode: true,
        })
      );
    }

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
        if (coord.Geometry) {
          new mapboxgl.Marker(el)
            .setLngLat(coord.Geometry.coordinates)
            .addTo(map);
        }

        el.addEventListener("click", () => {
          history.push(`/mfl-internal/mfl-details/${coord.id}`);
        });

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
  }, [coordinates, setCenter]);

  return (
    <div>
      <div id={container} className="" ref={mapContainer}></div>

      {coordinates && (
        <div class="legend-box shadow-sm" hidden={legend}>
          <div className="d-flex align-items-center">
            <img className="marker-legend" src={markerRural} alt="Rural" />{" "}
            <small>Centro Rural</small>
          </div>
          <div className="d-flex align-items-center">
            <img className="marker-legend" src={markerUrban} alt="Urbano" />{" "}
            <small>Centro Urbano</small>
          </div>
          <div className="d-flex align-items-center">
            <img className="marker-legend" src={markerPrivate} alt="Privado" />{" "}
            <small>Centro Privado</small>
          </div>
          <div className="d-flex align-items-center">
            <img
              className="marker-legend"
              src={markerDefault}
              alt="Predefinido"
            />{" "}
            <small>Não definido</small>
          </div>
        </div>
      )}
    </div>
  );
};
export default Map;
