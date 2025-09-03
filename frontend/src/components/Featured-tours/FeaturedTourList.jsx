import React, { useState, useEffect } from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";

const FeaturedTourList = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
      
        const res = await fetch("http://localhost:5050/product/products");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("FeaturedTours API Response:", data);

        if (data.products && Array.isArray(data.products)) {
         
          setFeaturedTours(data.products.slice(0, 4));
        } else {
          setFeaturedTours([]);
        }
      } catch (err) {
        console.error("Error fetching featured tours:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <h5 className="text-center mt-3">Loading featured tours...</h5>;
  }

  if (error) {
    return <h5 className="text-danger text-center mt-3">{error}</h5>;
  }

  return (
    <>
      {featuredTours.map((tour) => (
        <Col lg="3" md="4" sm="6" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
