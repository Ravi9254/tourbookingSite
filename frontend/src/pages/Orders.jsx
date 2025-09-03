import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5050/cart/user-orders', {
        headers: {
          'token': token
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) return <h4 className="text-center mt-5">Loading orders...</h4>;
  if (error) return <h4 className="text-center text-danger mt-5">Error: {error}</h4>;

  return (
    <section className="orders-section">
      <Container>
        <Row>
          <Col lg="12">
            <h2 className="orders-title">My Orders</h2>
          </Col>
        </Row>
        <Row>
          {orders.length === 0 ? (
            <Col lg="12">
              <div className="empty-orders text-center">
                <h4>No orders found</h4>
                <p>You haven't placed any orders yet!</p>
              </div>
            </Col>
          ) : (
            orders.map((order) => (
              <Col lg="12" key={order._id} className="mb-4">
                <Card className="order-card">
                  <CardBody>
                    <div className="order-header">
                      <div className="order-info">
                        <h5>Order #{order._id.slice(-8)}</h5>
                        {/* FIXED: Use createdAt instead of orderDate */}
                        <p className="order-date">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="order-status">
                        <Badge color={getStatusColor(order.status)} className="status-badge">
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="order-products">
                      <h6>Ordered Items:</h6>
                      {order.products?.map((item, index) => (
                        <div key={index} className="order-product-item">
                          <div className="product-info">
                            <img 
                              src={item.product?.image || "/default-image.png"} 
                              alt={item.product?.name || "Product"}
                              className="product-thumbnail"
                            />
                            <div className="product-details">
                              <h6>{item.product?.name || "Unknown Product"}</h6>
                              <p>{item.product?.package_type || "Standard Package"}</p>
                            </div>
                          </div>
                          <div className="product-pricing">
                            <span className="quantity">Qty: {item.quantity}</span>
                            <span className="price">₹ {item.price?.toLocaleString('en-IN') || 0}</span>
                          </div>
                        </div>
                      )) || []}
                    </div>
                    
                    <div className="order-total">
                      <h5>Total: ₹ {order.total?.toLocaleString('en-IN') || 0}</h5>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
