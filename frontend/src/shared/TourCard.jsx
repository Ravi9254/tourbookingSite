import React from "react";
import { Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  
  if (!tour) return null;

  const {
    _id,
    name = "No Name",
    image = "",
    price = 0,
    description = "",
    avlb_seats = 0,
    package_type = "Not Specified"
  } = tour;

  const handleCardClick = (e) => {
    e.preventDefault();
    console.log('Navigating to tour:', _id); // Debug log
    navigate(`/tours/${_id}`);
  };

  return (
    <Card 
      className="tour__card" 
      onClick={handleCardClick} 
      style={{ cursor: 'pointer' }}
    >
      {image ? (
        <img src={image} alt={name} className="tour__img" />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <CardBody>
        <h5 className="tour__title">{name}</h5>
        <p className="tour__description">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        <div className="tour__details">
          <div className="tour__seats">Seats: {avlb_seats}</div>
          <div className="tour__package">Package: {package_type}</div>
          <div className="tour__price">Price: ₹ {price}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TourCard;
