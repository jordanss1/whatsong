import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchBar = () => {
  const {
    items,
    setPage,
    focus,
    setFocus,
    term,
    setTerm,
    setItems,
    typeString,
    spotifyTokenAndSearch,
    submittedTerm,
    setSubmittedTerm,
  } = useContext(SearchContext);

  useEffect(() => {
    const div1 = document.getElementsByClassName("listSearchDiv")[0];

    if (focus === true) {
      div1.classList.add("listSearchDivFocus");
    } else {
      div1.classList.remove("listSearchDivFocus");
    }
  }, [focus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term) {
      setSubmittedTerm(term);
      setTerm("");
    }
  };

  useEffect(() => {
    if (typeString === "artist" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
      setSubmittedTerm("");
      setPage(1);
    } else if (typeString === "track" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
      setSubmittedTerm("");
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (typeString === "artist") {
      sessionStorage.setItem("artists", JSON.stringify(items));
    } else {
      sessionStorage.setItem("tracks", JSON.stringify(items));
    }
  }, [items]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="ui input listSearchDiv">
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        value={term}
        onChange={({ target }) => setTerm(target.value)}
        type="text"
        placeholder={`${
          typeString === "artist" ? "Search artists" : "Search songs"
        }`}
        data-dashlane-rid="3640789f2356683f"
        data-form-type=""
        className="searchInput me-1"
      />
      <button
        disabled={!term ? true : false}
        className="ui inverted pink basic button px-1 searchButton d-flex align-items-center justify-content-center"
      >
        <i className="search icon fs-6 mx-0"></i>
      </button>
    </form>
  );
};

export default SearchBar;
