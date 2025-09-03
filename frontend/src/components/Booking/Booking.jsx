import React, { useState } from 'react';
import { Card, CardBody, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Booking = ({ tour }) => {
  const [guestSize, setGuestSize] = useState(1);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const serviceFee = 10;
  const totalAmount = Number(tour.price) * Number(guestSize) + Number(serviceFee);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      console.log('Token:', token); // Debug log
      console.log('UserId:', userId); // Debug log
      
      if (!token || !userId) {
        showAlert('Please login to book this tour', 'warning');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      // First add to cart
      const cartResponse = await fetch('http://localhost:5050/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          productId: tour._id,
          quantity: parseInt(guestSize)
        })
      });

      const cartData = await cartResponse.json();
      console.log('Cart Response:', cartData); // Debug log

      if (cartResponse.ok) {
        // Then proceed to payment
        const paymentResponse = await fetch('http://localhost:5050/cart/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        });

        const paymentData = await paymentResponse.json();
        console.log('Payment Response:', paymentData); // Debug log
        
        if (paymentResponse.ok) {
          // Redirect to Stripe checkout
          window.location.href = paymentData.url;
        } else {
          showAlert(paymentData.message, 'danger');
        }
      } else {
        showAlert(cartData.message, 'danger');
      }
    } catch (error) {
      console.error('Booking error:', error); // Debug log
      showAlert('Booking failed. Please try again.', 'danger');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <div className="booking">
      <Card className="booking-card">
        <CardBody>
          <h4 className="booking-title">₹ {tour.price} <span>/per person</span></h4>
          
          {alert.show && (
            <Alert color={alert.type} className="mb-3">
              {alert.message}
            </Alert>
          )}
          
          <Form className="booking-form">
            <FormGroup>
              <Input 
                type="number"
                placeholder="Number of guests"
                value={guestSize}
                onChange={(e) => setGuestSize(e.target.value)}
                min="1"
                max={tour.avlb_seats}
              />
            </FormGroup>
          </Form>

          <div className="booking-bottom">
            <ul className="booking-list">
              <li className="booking-list-item">
                <h5>₹ {tour.price} x {guestSize} person(s)</h5>
                <span>₹ {tour.price * guestSize}</span>
              </li>
              <li className="booking-list-item">
                <h5>Service charges</h5>
                <span>₹ {serviceFee}</span>
              </li>
              <li className="booking-list-item total">
                <h5>Total</h5>
                <span>₹ {totalAmount}</span>
              </li>
            </ul>

            <Button 
              className="btn booking-btn" 
              color="warning"
              onClick={handleBooking}
              disabled={guestSize > tour.avlb_seats}
            >
              Book Now
            </Button>
            
            {guestSize > tour.avlb_seats && (
              <small className="text-danger">
                Only {tour.avlb_seats} seats available
              </small>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Booking;
