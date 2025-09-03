import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
// import SearchResultList from "../components/SearchResultList"; // ✅ Import it
import SearchResultList from "./SearchresultList";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [searchResults, setSearchResults] = useState([]); 
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5050/product/products`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        console.log("API Response:", data);

        if (data.products && Array.isArray(data.products)) {
          setTours(data.products);
          setSearchResults(data.products); // ✅ initially show all tours
          setPageCount(Math.ceil(data.products.length / itemsPerPage));
        } else {
          setTours([]);
          setSearchResults([]);
          setPageCount(0);
        }
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <h4 className="text-center mt-5">Loading tours...</h4>;
  if (error) return <h4 className="text-center text-danger mt-5">Error: {error}</h4>;

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar
              onSearch={({ name, price }) => {
                let filtered = tours;
                if (name) {
                  filtered = filtered.filter(t =>
                    t.name.toLowerCase().includes(name.toLowerCase())
                  );
                }
                if (price) {
                  filtered = filtered.filter(t => t.price <= Number(price));
                }
                setSearchResults(filtered);
              }}
            />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {searchResults
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((tour) => (
                <Col lg="3" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

            {searchResults.length > 0 && (
              <Col lg="12">
                <div className="pagination d-flex justify-content-center mt-5 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

     
      <SearchResultList results={searchResults} />
    </>
  );
};

export default Tours;
