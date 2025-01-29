import React from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../../../components/commons/PageTitle";
import { modules } from "../../../modulesContent";
import { DashboardCard } from "../../components/card/DashboardCard";

const UMMHome = () => {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Total de Utilizadores por Módulo"
          className="text-sm-left mb-3"
        />
      </Row>

      <Row>
        {modules.map((module, idx) => (
          <Col className="col-lg mb-4" key={idx}>
            <DashboardCard
              shortName={module.shortName}
              bgColor={module.bgColor}
              icone={module.icon}
              label={module.displayName}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UMMHome;
