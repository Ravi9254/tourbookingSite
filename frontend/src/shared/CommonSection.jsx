import React from "react";
import './common-section.css';
import { Container,Row,Col} from "reactstrap";


const CommonSection = ({ title }) => {
  return (
    <div className="common-section">
      <Container>
        <Row>
          <Col>
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CommonSection;