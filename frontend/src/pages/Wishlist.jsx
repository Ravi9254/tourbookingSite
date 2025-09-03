
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/wishlist.css";
// import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add this function inside Wishlist component
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch(
        `http://localhost:5050/removewishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            token: token,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Removed from wishlist");
        // Refresh wishlist after removal
        fetchWishlist();
      } else {
        toast.error(data.message || "Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5050/wishlist", {
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setWishlist(data.wishList || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch("http://localhost:5050/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        toast.warning("This item is already in your cart.");
      } else if (response.ok) {
        toast.success("Added to cart successfully!");
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const viewTourDetails = (tourId) => {
    navigate(`/tours/${tourId}`);
  };

  if (loading) return <h4 className="text-center mt-5">Loading wishlist...</h4>;
  if (error)
    return <h4 className="text-center text-danger mt-5">Error: {error}</h4>;

  return (
    <section className="wishlist-section">
      <Container>
        <Row>
          <Col lg="12">
            <h2 className="wishlist-title">My Wishlist</h2>
          </Col>
        </Row>
        <Row>
          {wishlist.length === 0 ? (
            <Col lg="12">
              <div className="empty-wishlist text-center">
                <h4>Your wishlist is empty</h4>
                <p>Add some tours to your wishlist to see them here!</p>
                <Button color="primary" onClick={() => navigate("/tours")}>
                  Browse Tours
                </Button>
              </div>
            </Col>
          ) : (
            wishlist.map((item) => {
              // Add null check here
              if (!item?.productId) return null;

              return (
                <Col lg="4" md="6" sm="6" key={item._id} className="mb-4">
                  <Card className="wishlist-card">
                    <div className="wishlist-img">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        onClick={() => viewTourDetails(item.productId._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <CardBody>
                      <h5 className="wishlist-tour-title">
                        {item.productId.name}
                      </h5>
                      <p className="wishlist-tour-desc">
                        {item.productId.description.substring(0, 100)}...
                      </p>
                      <div className="wishlist-tour-details">
                        <span className="price">₹ {item.productId.price}</span>
                        <span className="package">
                          {item.productId.package_type}
                        </span>
                      </div>
                      <div className="wishlist-actions">
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => addToCart(item.productId._id)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          color="outline-primary"
                          size="sm"
                          onClick={() => viewTourDetails(item.productId._id)}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="wishlist-remove">
                        <Button
                          // color="danger"
                          // size="sm"
                          onClick={() => removeFromWishlist(item.productId._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Wishlist;
