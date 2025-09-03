import React, { useRef } from "react";
import "../shared/searchbar.css";
import { Col, Form, FormGroup } from "reactstrap";

const SearchBar = ({ onSearch }) => {
  const nameRef = useRef("");
  const priceRef = useRef("");

  const searchHandler = (e) => {
    e.preventDefault(); // Prevent form reload

    const name = nameRef.current.value.trim();
    const price = priceRef.current.value.trim();

    if (name === "" && price === "") {
      return alert("Enter at least one search criteria");
    }

    // Pass criteria to parent component (like Tours.jsx)
    if (onSearch) {
      onSearch({ name, price });
    }
  };

  return (
    <Col lg="12">
      <div className="search_bar">
        <Form className="d-flex align-items-center gap-4" onSubmit={searchHandler}>
          {/* Name Search */}
          <FormGroup className="d-flex gap-3 form__group">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Name</h6>
              <input type="text" placeholder="Search tour name" ref={nameRef} />
            </div>
          </FormGroup>

          {/* Price Search */}
          <FormGroup className="d-flex gap-3 form__group">
            <span><i className="ri-price-tag-3-line"></i></span>
            <div>
              <h6>Max Price</h6>
              <input type="number" placeholder="Enter max price" ref={priceRef} />
            </div>
          </FormGroup>

          {/* Search Button */}
          <span className="search__icon" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
