import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchContext from "../contexts/SearchStore";
import "../styles/all.css";

const NavBar = ({ content }) => {
  const { setTerm } = useContext(SearchContext);

  return (
    <>
      <header className="navClass d-flex justify-content-center">
        <NavLink
          onClick={() => setTerm("")}
          className="text-uppercase"
          to="/search"
        >
          {content}
        </NavLink>
      </header>
    </>
  );
};

export default NavBar;
