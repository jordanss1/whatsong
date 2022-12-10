import React, { useContext, useEffect, useRef } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchBar = () => {
  const {
    term,
    items,
    setPage,
    setTerm,
    focused,
    setItems,
    typeString,
    spotifyTokenAndSearch,
    submittedTerm,
    setSubmittedTerm,
  } = useContext(SearchContext);

  const pageChange = useRef(false);

  useEffect(() => {
    focused.current = false;
    console.log(typeString);
    console.log(submittedTerm);

    if (typeString === "artist" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
      setSubmittedTerm("");
      pageChange.current = true;
    } else if (typeString === "track" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
      setSubmittedTerm("");
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (typeString === "artist" && pageChange.current) {
      sessionStorage.setItem("artists", JSON.stringify(items));
      setPage(1);
      pageChange.current = false;
    } else if (typeString === "track") {
      sessionStorage.setItem("tracks", JSON.stringify(items));
    }
  }, [items, typeString]);

  const handleFocus = () => {
    const div1 = document.getElementsByClassName("listSearchDiv")[0];

    focused.current = !focused.current;

    if (focused.current === true) {
      div1.classList.add("listSearchDivFocus");
    } else {
      div1.classList.remove("listSearchDivFocus");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term) {
      setSubmittedTerm(term);
      setTerm("");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="ui input listSearchDiv">
      <input
        onFocus={() => {
          handleFocus();
        }}
        onBlur={() => {
          handleFocus();
        }}
        value={term}
        onChange={({ target }) => setTerm(target.value)}
        role="searchList-input"
        type="text"
        placeholder={`${
          typeString === "artist" ? "Search artists" : "Search songs"
        }`}
        data-dashlane-rid="3640789f2356683f"
        data-form-type=""
        className="searchInput me-1"
      />
      <button
        role="searchList-button"
        disabled={!term ? true : false}
        className="ui inverted pink basic button px-1 searchButton d-flex align-items-center justify-content-center"
      >
        <i className="search icon fs-6 mx-0"></i>
      </button>
    </form>
  );
};

export default SearchBar;
