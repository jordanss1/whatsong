import React from "react";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";

const Header = () => {
  return (
    <section id="headerContainer" className="d-grid">
      <h2 className="ui header d-flex align-items-center justify-content-center mb-0 headerLogo">
        <div onClick={() => window.location.reload()} className="content headerFont fs-3 ps-0">WhatSong.</div>
        <i className="play circle icon fs-5"></i>
      </h2>
      <div
        id="header2"
        className="d-flex align-items-center justify-content-center justify-content-evenly flex-column flex-sm-row"
      >
        <SearchDropdown />
        <SearchBar />
      </div>
    </section>
  );
};

export default Header;
