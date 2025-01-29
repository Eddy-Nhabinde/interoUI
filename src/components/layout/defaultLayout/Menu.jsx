import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";

const SimpleLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
        sm="12"
        tag="main"
      >
        <MainNavbar isHomeLayout={true}/>
        {children}
      </Col>
    </Row>
  </Container>
);

SimpleLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

SimpleLayout.defaultProps = {
  noNavbar: true,
  noFooter: false
};

export default SimpleLayout;
