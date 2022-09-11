import React, { useEffect, useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import "../styles/body.css";

const SearchBar = () => {
  const {
    hover,
    setHover,
    focus,
    setFocus,
    term,
    setTerm,
    spotifyTokenAndSearch,
  } = useContext(SearchContext);

  useEffect(() => {
    const logo = document.getElementsByClassName("headerLogo")[0];

    if (hover || focus) {
      logo.classList.add("hoveredInput");
    } else {
      logo.classList.remove("hoveredInput");
    }
  }, [hover, focus]);

  const handleInputChange = (value) => {
    setTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term) {
      spotifyTokenAndSearch(term);
    }
  };

  return (
    <div id="searchContainer" className="w-50 d-flex justify-content-end">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="ui left icon input w-50"
      >
        <i className="inverted circular search link icon"></i>
        <input
          type="text"
          placeholder="Search..."
          data-dashlane-rid="3640789f2356683f"
          data-form-type=""
          className="searchInput"
          onChange={({ target }) => handleInputChange(target.value)}
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
