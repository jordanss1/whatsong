import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/body.css";

const NavBar = () => {
  return (
    <>
      <div className="navClass d-flex justify-content-start">
        <NavLink className="text-uppercase" to="/home">
          ws
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
