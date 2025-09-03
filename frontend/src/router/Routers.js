import React from "react";
import {Route, Routes , Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import ToursDetails from "../pages/ToursDetails";
import SearchResultList from "../pages/SearchresultList";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<ToursDetails />} />
      <Route path="/search" element={<SearchResultList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Routers;