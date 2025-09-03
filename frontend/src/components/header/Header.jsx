import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/tours", display: "Tours" },
  { path: "/wishlist", display: "Wishlist" },
  { path: "/user-orders", display: "Orders" },
  { path: "/cart", display: "Cart" },
  // { path: "/success", display: "Success" }

];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const stickyHeaderFunc = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);
    
    // Check login status
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName');
    
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || 'User');
    }

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path} 
                      className={navClass => navClass.isActive ? "active__link" : ""}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__right d-flex align-items-center gap-4">
              {isLoggedIn ? (
                <div className="nav__btns d-flex align-items-center gap-4">
                  <span className="user-name">Welcome, {userName}</span>
                  <Button className="btn secondary__btn" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="nav__btns d-flex align-items-center gap-4">
                  <Button className="btn secondary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container> 
    </header>
  );
}

export default Header;
