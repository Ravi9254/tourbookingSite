// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, CardBody, Button, Alert } from "reactstrap";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cart, setCart] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch user's cart on mount
//   useEffect(() => {
//     fetchCart();
//     // eslint-disable-next-line
//   }, []);

//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken');
//       if (!token) {
//         showAlert("Please login to view your cart.", "warning");
//         setTimeout(() => navigate('/login'), 2000);
//         return;
//       }

//       const response = await fetch("http://localhost:5050/cart/userCart", {
//         headers: { token }
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setCart(data.cart);
//       } else {
//         showAlert(data.message || "Unable to fetch cart.", "danger");
//       }
//     } catch (err) {
//       showAlert("Error loading cart.", "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (productId) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await fetch("http://localhost:5050/cart/update", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           token
//         },
//         body: JSON.stringify({ productId, action: "remove" })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         showAlert("Item removed from cart.", "success");
//         setCart(data.cart); // Update local cart info
//       } else {
//         showAlert(data.message || "Failed to remove item.", "danger");
//       }
//     } catch (err) {
//       showAlert("Error removing item.", "danger");
//     }
//   };

//   // Change quantity (increase or decrease)
//   const changeQuantity = async (productId, action) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await fetch("http://localhost:5050/cart/update", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           token
//         },
//         body: JSON.stringify({ productId, action })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setCart(data.cart);
//       } else {
//         showAlert(data.message || "Cannot update quantity.", "danger");
//       }
//     } catch {
//       showAlert("Cart update error.", "danger");
//     }
//   };

//   // Go to checkout/payment
//   const handleCheckout = async () => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await fetch("http://localhost:5050/cart/payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", token }
//       });
//       const data = await response.json();
//       if (response.ok && data.url) {
//         window.location.href = data.url;
//       } else {
//         showAlert(data.message || "Unable to proceed to payment.", "danger");
//       }
//     } catch (err) {
//       showAlert("Payment error.", "danger");
//     }
//   };

//   // Alert handler
//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
//   };

//   // Render
//   if (loading) return <h4 className="text-center mt-5">Loading your cart...</h4>;

//   return (
//     <section className="cart-section">
//       <Container>
//         <Row>
//           <Col lg="12">
//             <h2 className="mb-4">My Cart</h2>
//             {alert.show && (
//               <Alert color={alert.type} className="mb-4">
//                 {alert.message}
//               </Alert>
//             )}
//           </Col>
//         </Row>

//         {!cart || !cart.products || cart.products.length === 0 ? (
//           <Row>
//             <Col lg="12" className="text-center">
//               <h5>Your cart is empty.</h5>
//               <Button color="primary" onClick={() => navigate('/tours')}>
//                 Browse Tours
//               </Button>
//             </Col>
//           </Row>
//         ) : (
//           <Row>
//             {cart.products.map((item, idx) => (
//               <Col lg="12" className="mb-3" key={item.product._id}>
//                 <Card className="cart-card">
//                   <CardBody className="d-flex align-items-center justify-content-between">
//                     <div className="d-flex align-items-center">
//                       <img
//                         src={item.product.image}
//                         alt={item.product.name}
//                         style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, marginRight: 20 }}
//                       />
//                       <div>
//                         <h5>{item.product.name}</h5>
//                         <p>Package: {item.product.package_type}</p>
//                         <p>Price per person: ₹ {item.product.price}</p>
//                       </div>
//                     </div>
//                     <div className="cart-controls d-flex align-items-center">
//                       <Button
//                         color="light"
//                         onClick={() => changeQuantity(item.product._id, "decrease")}
//                         disabled={item.quantity <= 1}
//                       >-</Button>
//                       <span style={{ padding: "0 12px", minWidth: 24, textAlign: "center" }}>
//                         {item.quantity}
//                       </span>
//                       <Button
//                         color="light"
//                         onClick={() => changeQuantity(item.product._id, "increase")}
//                       >+</Button>
//                     </div>
//                     <div>
//                       <strong>Subtotal: ₹ {item.product.price * item.quantity}</strong>
//                     </div>
//                     <Button
//                       color="danger"
//                       onClick={() => removeFromCart(item.product._id)}
//                       title="Remove from Cart"
//                     >
//                       Remove
//                     </Button>
//                   </CardBody>
//                 </Card>
//               </Col>
//             ))}
//             <Col lg="12" className="text-end">
//               <h4 className="mt-3 mb-3">Total: ₹ {cart.total || 0}</h4>
//               <Button color="success" onClick={handleCheckout}>
//                 Checkout & Book
//               </Button>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </section>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's cart on mount
  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.warning("Please login to view your cart.");
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await fetch("http://localhost:5050/cart/userCart", {
        headers: { token }
      });
      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
      } else {
        toast.error(data.message || "Unable to fetch cart.");
      }
    } catch (err) {
      toast.error("Error loading cart.");
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch("http://localhost:5050/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({ productId, action: "remove" })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Item removed from cart.");
        setCart(data.cart); // Update local cart info
      } else {
        toast.error(data.message || "Failed to remove item.");
      }
    } catch (err) {
      toast.error("Error removing item.");
    }
  };

  // Change quantity (increase or decrease)
  const changeQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch("http://localhost:5050/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({ productId, action })
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      } else {
        toast.error(data.message || "Cannot update quantity.");
      }
    } catch {
      toast.error("Cart update error.");
    }
  };

  // Go to checkout/payment
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch("http://localhost:5050/cart/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json", token }
      });
      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Unable to proceed to payment.");
      }
    } catch (err) {
      toast.error("Payment error.");
    }
  };

  // Render
  if (loading) return <h4 className="text-center mt-5">Loading your cart...</h4>;

  return (
    <section className="cart-section">
      <Container>
        <Row>
          <Col lg="12">
            <h2 className="mb-4">My Cart</h2>
          </Col>
        </Row>

        {!cart || !cart.products || cart.products.length === 0 ? (
          <Row>
            <Col lg="12" className="text-center">
              <h5>Your cart is empty.</h5>
              <Button color="primary" onClick={() => navigate('/tours')}>
                Browse Tours
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            {cart.products.map((item, idx) => {
              // Add null check here
              if (!item?.product) return null;
              
              return (
                <Col lg="12" className="mb-3" key={item.product._id}>
                  <Card className="cart-card">
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, marginRight: 20 }}
                        />
                        <div>
                          <h5>{item.product.name}</h5>
                          <p>Package: {item.product.package_type}</p>
                          <p>Price per person: ₹ {item.product.price}</p>
                        </div>
                      </div>
                      <div className="cart-controls d-flex align-items-center">
                        <Button
                          color="light"
                          onClick={() => changeQuantity(item.product._id, "decrease")}
                          disabled={item.quantity <= 1}
                        >-</Button>
                        <span style={{ padding: "0 12px", minWidth: 24, textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <Button
                          color="light"
                          onClick={() => changeQuantity(item.product._id, "increase")}
                        >+</Button>
                      </div>
                      <div>
                        <strong>Subtotal: ₹ {item.product.price * item.quantity}</strong>
                      </div>
                      <Button
                        color="danger"
                        onClick={() => removeFromCart(item.product._id)}
                        title="Remove from Cart"
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
            <Col lg="12" className="text-end">
              <h4 className="mt-3 mb-3">Total: ₹ {cart.total || 0}</h4>
              <Button color="success" onClick={handleCheckout}>
                Checkout & Book
              </Button>
            </Col>
          </Row>
        )}
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

export default Cart;
