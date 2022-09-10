import React, { useEffect, useState } from "react";
import "../styles/body.css";

const SearchBar = () => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const logo = document.getElementsByClassName("headerLogo")[0];

    if (hover || focus) {
      logo.classList.add("hoveredInput");
    } else {
      logo.classList.remove("hoveredInput");
    }
  }, [hover, focus]);

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
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
