import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/all.css";

const NavBar = ({ content }) => {
  return (
    <>
      <header className="navClass d-flex justify-content-center">
        <NavLink className="text-uppercase" to="/search">
          {content}
        </NavLink>
      </header>
    </>
  );
};

export default NavBar;
