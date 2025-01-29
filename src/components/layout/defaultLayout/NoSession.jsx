import React from "react";
import { Container, Row } from "shards-react";

const NoSession = ({ children }) => (
  <Container fluid>
    <Row>{children}</Row>
  </Container>
);

export default NoSession;
