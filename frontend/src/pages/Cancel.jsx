import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <section className="cancel-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" className="text-center">
            <div className="cancel-content">
              <div className="cancel-icon">
                <i className="ri-close-circle-line" style={{fontSize: '4rem', color: '#dc3545'}}></i>
              </div>
              <h2 className="cancel-title">Booking Cancelled</h2>
              <p className="cancel-message">
                Your booking has been cancelled. No payment has been processed.
                You can try booking again anytime.
              </p>
              <div className="cancel-actions">
                <Button 
                  color="primary" 
                  className="me-3"
                  onClick={() => navigate('/tours')}
                >
                  Browse Tours
                </Button>
                <Button 
                  color="outline-primary"
                  onClick={() => navigate('/cart')}
                >
                  View Cart
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cancel;
