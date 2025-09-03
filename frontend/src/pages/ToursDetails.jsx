// import React, { useState, useEffect, useCallback } from "react";
// import "../styles/tour-details.css";
// import { Container, Row, Col, Button, Alert } from "reactstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import Booking from "../components/Booking/Booking";

// const TourDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   const fetchTourDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Fetching tour details for ID:', id);
      
//       // Try with token first, if no token, try without token
//       const token = localStorage.getItem('userToken');
      
//       const headers = {};
//       if (token) {
//         headers['token'] = token;
//       }

//       const response = await fetch(`http://localhost:5050/product/product/${id}`, {
//         headers: headers
//       });

//       console.log('Response status:', response.status);
//       const data = await response.json();
//       console.log('Response data:', data);
      
//       if (response.ok) {
//         setTour(data.product);
//       } else {
//         // If failed with token, try without token by fetching from products list
//         if (token && response.status === 401) {
//           // Fetch from all products
//           const allProductsResponse = await fetch('http://localhost:5050/product/products');
//           const allProductsData = await allProductsResponse.json();
          
//           if (allProductsResponse.ok && allProductsData.products) {
//             const foundTour = allProductsData.products.find(product => product._id === id);
//             if (foundTour) {
//               setTour(foundTour);
//             } else {
//               setError('Tour not found');
//             }
//           } else {
//             setError(data.message);
//           }
//         } else {
//           setError(data.message);
//         }
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Failed to fetch tour details');
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       fetchTourDetails();
//     }
//   }, [id, fetchTourDetails]);

//   const addToWishlist = async () => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const userId = localStorage.getItem('userId');
      
//       if (!token) {
//         showAlert('Please login to add to wishlist', 'warning');
//         setTimeout(() => navigate('/login'), 1500);
//         return;
//       }

//       const response = await fetch('http://localhost:5050/addwishlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'token': token
//         },
//         body: JSON.stringify({
//           userId: userId,
//           productId: id
//         })
//       });
// if (response.status === 409) {
//   showAlert('This item is already in your wishlist.', 'warning');
// } else if (response.ok) {
//   showAlert('Added to wishlist successfully!', 'success');
// } else {
//   showAlert(data.message || 'Failed to add to wishlist', 'danger');
// }

//       const data = await response.json();
      
//       if (response.ok) {
//         showAlert('Added to wishlist successfully!', 'success');
//       } else {
//         showAlert(data.message, 'danger');
//       }
//     } catch (error) {
//       showAlert('Failed to add to wishlist', 'danger');
//     }
//   };

//   const addToCart = async () => {
//     try {
//       const token = localStorage.getItem('userToken');
      
//       if (!token) {
//         showAlert('Please login to add to cart', 'warning');
//         setTimeout(() => navigate('/login'), 1500);
//         return;
//       }

//       const response = await fetch('http://localhost:5050/cart/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'token': token
//         },
//         body: JSON.stringify({
//           productId: id,
//           quantity: 1
//         })
//       });

//       const data = await response.json();
//       if (response.status === 409) {
//   showAlert('This item is already in your cart.', 'warning');
// } else if (response.ok) {
//   showAlert('Added to cart successfully!', 'success');
// } else {
//   showAlert(data.message || 'Failed to add to cart', 'danger');
// }

//       if (response.ok) {
//         showAlert('Added to cart successfully!', 'success');
//       } else {
//         showAlert(data.message, 'danger');
//       }
//     } catch (error) {
//       showAlert('Failed to add to cart', 'danger');
//     }
//   };

//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => {
//       setAlert({ show: false, message: '', type: '' });
//     }, 3000);
//   };
// const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { 
//       month: 'long', 
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };
//   if (loading) return <h4 className="text-center mt-5">Loading tour details...</h4>;
//   if (error) return <h4 className="text-center text-danger mt-5">Error: {error}</h4>;
//   if (!tour) return <h4 className="text-center mt-5">Tour not found</h4>;

//   return (

//     <section className="tour-details">
//   {alert.show && (
//     <Alert color={alert.type}>
//       {alert.message}
//     </Alert>
//   )}
//   <div className="tour-details__row">
//     <div className="tour-details__left">
//       <img src={tour.image} alt={tour.name} className="tour__image" />
//       <h2 className="tour__name">{tour.name}</h2>
//       <div className="tour__desc">
//         <p>{tour.description}</p>
//       </div>
//       <div className="tour__extra-details">
//         {/* <span><i className="ri-map-pin-line"></i> {tour.city || 'Unknown'}</span>
//         <span><i className="ri-road-map-line"></i> {tour.distance || 0} km</span> */}
//         <span><i className="ri-group-line"></i> {tour.maxGroupSize || tour.avlb_seats} people</span>
//       </div>
//       <div className="tour__price">
//         <h3>₹ {tour.price}</h3>
//         <Button className="tour-btn" color="outline-warning" onClick={addToWishlist}>
//           <i className="ri-heart-line"></i> Add to Wishlist
//         </Button>
//         <Button className="tour-btn" color="outline-primary "  onClick={addToCart}>
//           <i className="ri-shopping-cart-line"></i> Add to Cart
//         </Button>
//       </div>
//       <div className="tour__package"><strong>Package Type:</strong> {tour.package_type}</div>
//       <div className="tour__seats"><strong>Available Seats:</strong> {tour.avlb_seats}</div>
//       <div className="tour__actions">
//         {tour.tour_duration && (
//             <div className="tour__duration">
//               <strong><i className="ri-time-line"></i> Duration:</strong> {tour.tour_duration}
//             </div>
//           )}

//           {/* 🆕 NEW FIELDS: Tour Itinerary */}
//           {tour.tour_itinerary && (
//             <div className="tour__itinerary">
//               <h4><i className="ri-route-line"></i> Tour Itinerary</h4>
//               <div className="itinerary-content">
//                 {tour.tour_itinerary.split('\n').map((line, index) => (
//                   <p key={index} className="itinerary-line">{line}</p>
//                 ))}
//               </div>
//             </div>
//           )}
          
//           {/* 🆕 NEW FIELDS: Tour Dates */}
//           {tour.tour_dates && tour.tour_dates.length > 0 && (
//             <div className="tour__dates">
//               <h4><i className="ri-calendar-line"></i> Available Tour Dates</h4>
//               <div className="dates-list">
//                 {tour.tour_dates.map((dateRange, index) => (
//                   <div key={index} className="date-range">
//                     <span className="date-badge">
//                       <i className="ri-calendar-check-line"></i>
//                       {formatDate(dateRange.start_date)} - {formatDate(dateRange.end_date)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

        
//       </div>
      
//     </div>

//   </div>
//     <div className="tour-details__right">
//       <Booking tour={tour} />
//     </div>
// </section>

//   );
// };

// export default TourDetails;

import React, { useState, useEffect, useCallback } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Booking from "../components/Booking/Booking";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTourDetails = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching tour details for ID:', id);
      
      // Try with token first, if no token, try without token
      const token = localStorage.getItem('userToken');
      
      const headers = {};
      if (token) {
        headers['token'] = token;
      }

      const response = await fetch(`http://localhost:5050/product/product/${id}`, {
        headers: headers
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        setTour(data.product);
      } else {
        // If failed with token, try without token by fetching from products list
        if (token && response.status === 401) {
          // Fetch from all products
          const allProductsResponse = await fetch('http://localhost:5050/product/products');
          const allProductsData = await allProductsResponse.json();
          
          if (allProductsResponse.ok && allProductsData.products) {
            const foundTour = allProductsData.products.find(product => product._id === id);
            if (foundTour) {
              setTour(foundTour);
            } else {
              setError('Tour not found');
            }
          } else {
            setError(data.message);
          }
        } else {
          setError(data.message);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch tour details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTourDetails();
    }
  }, [id, fetchTourDetails]);

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      
      if (!token) {
        toast.warning('Please login to add to wishlist');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      const response = await fetch('http://localhost:5050/addwishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          userId: userId,
          productId: id
        })
      });

      const data = await response.json();
      
      if (response.status === 409) {
        toast.warning('This item is already in your wishlist.');
      } else if (response.ok) {
        toast.success('Added to wishlist successfully!');
      } else {
        toast.error(data.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        toast.warning('Please login to add to cart');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      const response = await fetch('http://localhost:5050/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1
        })
      });

      const data = await response.json();
      
      if (response.status === 409) {
        toast.warning('This item is already in your cart.');
      } else if (response.ok) {
        toast.success('Added to cart successfully!');
      } else {
        toast.error(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) return <h4 className="text-center mt-5">Loading tour details...</h4>;
  if (error) return <h4 className="text-center text-danger mt-5">Error: {error}</h4>;
  if (!tour) return <h4 className="text-center mt-5">Tour not found</h4>;

  return (
    <section className="tour-details">
      <div className="tour-details__row">
        <div className="tour-details__left">
          <img src={tour.image} alt={tour.name} className="tour__image" />
          <h2 className="tour__name">{tour.name}</h2>
          <div className="tour__desc">
            <p>{tour.description}</p>
          </div>
          <div className="tour__extra-details">
            <span><i className="ri-group-line"></i> {tour.maxGroupSize || tour.avlb_seats} people</span>
          </div>
          <div className="tour__price">
            <h3>₹ {tour.price}</h3>
            <Button className="tour-btn" color="outline-warning" onClick={addToWishlist}>
              <i className="ri-heart-line"></i> Add to Wishlist
            </Button>
            <Button className="tour-btn" color="outline-primary" onClick={addToCart}>
              <i className="ri-shopping-cart-line"></i> Add to Cart
            </Button>
          </div>
          <div className="tour__package"><strong>Package Type:</strong> {tour.package_type}</div>
          <div className="tour__seats"><strong>Available Seats:</strong> {tour.avlb_seats}</div>
          <div className="tour__actions">
            {tour.tour_duration && (
              <div className="tour__duration">
                <strong><i className="ri-time-line"></i> Duration:</strong> {tour.tour_duration}
              </div>
            )}

            {/* Tour Itinerary */}
            {tour.tour_itinerary && (
              <div className="tour__itinerary">
                <h4><i className="ri-route-line"></i> Tour Itinerary</h4>
                <div className="itinerary-content">
                  {tour.tour_itinerary.split('\n').map((line, index) => (
                    <p key={index} className="itinerary-line">{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tour Dates */}
            {tour.tour_dates && tour.tour_dates.length > 0 && (
              <div className="tour__dates">
                <h4><i className="ri-calendar-line"></i> Available Tour Dates</h4>
                <div className="dates-list">
                  {tour.tour_dates.map((dateRange, index) => (
                    <div key={index} className="date-range">
                      <span className="date-badge">
                        <i className="ri-calendar-check-line"></i>
                        {formatDate(dateRange.start_date)} - {formatDate(dateRange.end_date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tour-details__right">
        <Booking tour={tour} />
      </div>
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

export default TourDetails;
