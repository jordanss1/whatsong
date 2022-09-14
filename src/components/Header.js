import React, { useRef } from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  const logo = useRef();

  console.log(logo);

  return (
    <section id="headerContainer" className="d-grid">
      <h2
        ref={logo}
        className="ui header d-flex align-items-center justify-content-center mb-0 headerLogo"
      >
        <div className="content headerFont fs-3 ps-0">WhatSong.</div>
        <i className="play circle icon fs-5"></i>
      </h2>
      <div id="header2" className="d-flex align-items-center flex-row-reverse">
        <SearchBar logo={logo} />
      </div>
    </section>
  );
};

export default Header;
