import React from "react";
import { Row, Col } from "shards-react";
import dateFormat from "dateformat";

const Details = ({ data }) => {
  return (
    <div>
      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Código:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.HealthFacilityCode || "---")}
        </Col>
      </Row>

      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Nome:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.HealthFacilityName || "---")}
        </Col>
      </Row>

      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Província:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.Province || "---")}
        </Col>
      </Row>

      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Distrito:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.District || "---")}
        </Col>
      </Row>

      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Tipo:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.HealthFacilityType || "---")}
        </Col>
      </Row>

      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Classificação:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.HealthFacilityClassification || "---")}
        </Col>
      </Row>

      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Nível:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data && (data.HealthFacilityLevel || "---")}
        </Col>
      </Row>
      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Coordenadas <small style={{fontWeight: 700, fontSize: 12 }}>(Long, Lat)</small> :{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data &&
            (data.Geometry ? data.Geometry.coordinates.join(", ") : "---")}
        </Col>
      </Row>
      <Row className={""}>
        <Col
          lg="5"
          md="5"
          sm="5"
          className="mb-4 text-dark"
          style={{ fontWeight: 700 }}
        >
          Última actualização:{" "}
        </Col>
        <Col lg="7" md="7" sm="7" className="mb-4">
          {data &&
            (dateFormat(data.LastUpdated, "yyyy-mm-dd HH:mm:ss") || "---")}
        </Col>
      </Row>
    </div>
  );
};

export default Details;
