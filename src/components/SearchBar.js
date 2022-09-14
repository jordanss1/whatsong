import React, { useEffect, useContext, useRef } from "react";
import SearchContext from "../contexts/SearchStore";
import "../styles/body.css";

const SearchBar = ({ logo }) => {
  const hover = useRef(false);
  const focus = useRef(false);

  const {
    term,
    setTerm,
    submittedTerm,
    setSubmittedTerm,
    spotifyTokenAndSearch,
    setItems,
    setTypeString,
  } = useContext(SearchContext);

  const styleLogo = () => {
    const classes = logo.current.classList;
    const logoHeader = document.getElementsByClassName("headerLogo")[0];

    console.log(classes[0]);
    if (hover.current || focus.current) {
      logoHeader.classList.add("hoveredInput");
    } else {
      logoHeader.classList.remove("hoveredInput");
    }
  };

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
          onMouseEnter={() => {
            hover.current = true;
            styleLogo();
          }}
          onMouseLeave={() => {
            hover.current = false;
            styleLogo();
          }}
          onFocus={() => {
            focus.current = true;
            styleLogo();
          }}
          onBlur={() => {
            focus.current = false;
            styleLogo();
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
