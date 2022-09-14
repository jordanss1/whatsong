import React, { useEffect, useContext, useRef } from "react";
import SearchContext from "../contexts/SearchStore";
import "../styles/body.css";

const SearchBar = () => {
  const hover = useRef(false);
  const focus = useRef(false);

  const {
    term,
    setTerm,
    submittedTerm,
    setSubmittedTerm,
    typeString,
    spotifyTokenAndSearch,
    setItems,
    setSelectedSong,
  } = useContext(SearchContext);

  const styleLogo = () => {
    const logoHeader = document.getElementsByClassName("headerLogo")[0];

    if (hover.current || focus.current) {
      logoHeader.classList.add("hoveredInput");
    } else {
      logoHeader.classList.remove("hoveredInput");
    }
  };

  useEffect(() => {
    if (typeString === "artist" && submittedTerm) {
      setSelectedSong(null);
      spotifyTokenAndSearch(submittedTerm, typeString, setItems, 12);
    } else if (typeString === "track" && submittedTerm) {
      setSelectedSong(null);
      spotifyTokenAndSearch(submittedTerm, typeString, setItems, 20);
    }
  }, [submittedTerm]);

  return (
    <div id="searchContainer" className="w-25 d-flex justify-content-end ps-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedTerm(term);
        }}
        className="ui left icon input w-100"
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
