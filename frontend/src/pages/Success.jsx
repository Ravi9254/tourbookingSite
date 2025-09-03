import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // You can fetch order details using orderId if needed
  }, [orderId]);

  return (
    <section className="success-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" className="text-center">
            <div className="success-content">
              <div className="success-icon">
                <i className="ri-checkbox-circle-line" style={{fontSize: '4rem', color: '#28a745'}}></i>
              </div>
              <h2 className="success-title">Booking Successful!</h2>
              <p className="success-message">
                Thank you for your booking. Your payment has been processed successfully.
                You will receive a confirmation email shortly.
              </p>
              {orderId && (
                <p className="order-id">Order ID: #{orderId.slice(-8)}</p>
              )}
              <div className="success-actions">
                <Button 
                  color="primary" 
                  className="me-3"
                  onClick={() => navigate('/user-orders')}
                >
                  View Orders
                </Button>
                <Button 
                  color="outline-primary"
                  onClick={() => navigate('/tours')}
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Success;
