import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/all.css";

const NavBar = ({ content }) => {
  return (
    <>
      <header className="navClass d-flex justify-content-center">
        <NavLink className="text-uppercase" to="/home">
          {content}
        </NavLink>
      </header>
    </>
  );
};

export default NavBar;
