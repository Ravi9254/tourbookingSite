import React from "react";
import '../styles/home.css';
import {Container, Row, Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import Subtitle from "../shared/Subtitle";
import worldImg from '../assets/images/world.png';
// import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";

const Home = () => {
  return <>
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6">
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-items-center"><Subtitle subtitle={"Know before you go"} />
              <img src={worldImg} alt="Hero" className="img-fluid" />
              </div>
              <h1>Traveling opens the door to creating {""}
              <span className="highlight">memories</span></h1>
              <p>lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
              </p>
            </div>
          </Col>
            <Col lg="2">
                <div className="hero__img-box">
                <img src={heroImg} alt="Hero Img" />
                </div>
            </Col>
            <Col lg="2">
                <div className="hero__img-box mt-4">
                <video src={heroVideo} autoPlay loop muted className="hero__video"></video>
                </div>
            </Col>
             <Col lg="2">
                <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="Hero Img" />
                </div>
            </Col>
            {/* <SearchBar /> */}
        </Row>
      </Container>
    </section>
    <section className="services__section">
      <Container>
        <Row>
          <Col lg="3" className="">
            <h5 className="service__subtitle">What we Serve</h5>
            <h2 className="service__title">We offer our best services</h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='12' className= "md-5">
                    <Subtitle subtitle={"Explore"}/>
                    <h2 className="featured__tour-title">Our Featured Tours</h2>
                </Col>
                <FeaturedTourList />
            </Row>
        </Container>
        

    </section>

    
  </>
}

export default Home;