import React, { useEffect, useState } from "react";
import { accessToken } from "../api";
import "../styles/body.css";

const SearchBar = () => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const logo = document.getElementById("headerLogo");

    if (hovered) {
      logo.classList.add("hoveredInput");
    } else {
      logo.classList.remove("hoveredInput");
    }
    accessToken();
  }, [hovered]);

  return (
    <div id="searchContainer" className="w-50 d-flex justify-content-end">
      <form className="ui left icon input w-50">
        <i className="inverted circular search link icon"></i>
        <input
          type="text"
          placeholder="Search..."
          data-dashlane-rid="3640789f2356683f"
          data-form-type=""
          className="searchInput"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
