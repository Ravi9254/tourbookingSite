import React from "react";
import { Row, Col } from "reactstrap";
import TourCard from "../shared/TourCard";

const SearchResultList = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center mt-4">
        <h6>No results found</h6>
      </div>
    );
  }

  return (
    <Row className="mt-4">
      {results.map((tour) => (
        <Col lg="3" md="4" sm="6" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </Row>
  );
};

export default SearchResultList;
