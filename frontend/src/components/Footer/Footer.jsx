import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="6" md="12">
            <div className="logo">
              <h2>Travel<span className="text-orange">WORLD</span> ✈️</h2>
              <p>It's time to travel the world!</p>
            </div>
          </Col>

        </Row>
        <hr />
        <div className="text-center">
          <p>© {new Date().getFullYear()} TravelWorld. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
