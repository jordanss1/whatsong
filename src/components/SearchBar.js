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
    submittedTerm,
    setSubmittedTerm,
    spotifyTokenAndSearch,
    setItems,
    setTypeString,
  } = useContext(SearchContext);

  useEffect(() => {
    const logo = document.getElementsByClassName("headerLogo")[0];

    if (hover || focus) {
      logo.classList.add("hoveredInput");
    } else {
      logo.classList.remove("hoveredInput");
    }
  }, [hover, focus]);

  useEffect(() => {
    let stateSetters = [setTypeString, setItems];

    if (submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, "track", stateSetters, 20);
    }
  }, [submittedTerm]);

  return (
    <div id="searchContainer" className="w-50 d-flex justify-content-end">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedTerm(term);
        }}
        className="ui left icon input w-50"
      >
        <i className="inverted circular search link icon"></i>
        <input
          value={term}
          type="text"
          placeholder="Search..."
          data-dashlane-rid="3640789f2356683f"
          data-form-type=""
          className="searchInput"
          onChange={({ target }) => setTerm(target.value)}
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
