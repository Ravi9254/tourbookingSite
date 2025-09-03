import React from "react";
import '../styles/login.css';
import { Container, Row, Col,Form,FormGroup,Button} from "reactstrap"; 
import { Link } from "react-router-dom";
import registerImg from "../assets/images/register.png";
import userrImg from "../assets/images/user.png";



const Register = () => {
  const [credentials, setCredentials] = React.useState({
    email: "undefined",
    username: "undefined",
    password: "undefined"
  });

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

 const handleClick = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5050/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: credentials.username,   // Map 'username' to 'name'
        email: credentials.email,
        password: credentials.password
      })
    });
    const data = await res.json();
    if (res.ok) {
      // Registration successful, maybe redirect or store token
      alert("User registered");
    } else {
      // Handle error (e.g., show message from data.message)
      alert(data.message || "Error");
    }
  } catch (err) {
    alert("Network error");
  }
};

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8'className="m-auto">
          <div className="login__container d-flex justify-content-between align-items-center">
            <div className="login__img">
              <img src={registerImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userrImg} alt="User" />
              </div>
               <h2>Register</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="text" placeholder="Username" id="username" onChange={handleChange} />

                </FormGroup>
                <FormGroup>
                  <input type="email" placeholder="Enter your email" id="email" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder="Enter your password" id="password" onChange={handleChange} />
                </FormGroup>
                <Button className="btn secondary__btn auth__btn w-100">Register</Button>
                </Form>
                <p>Already have an account <Link to="/login">Login</Link></p>
            </div>
          </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Register;