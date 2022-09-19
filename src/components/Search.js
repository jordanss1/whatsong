import React, { useContext, useEffect, useRef, useState } from "react";
import SearchContext from "../contexts/SearchStore";

const Search = () => {
  const type = useRef("");
  const [focus, setFocus] = useState(false);

  const {
    term,
    setTerm,
    setSubmittedTerm,
    submittedTerm,
    spotifyTokenAndSearch,
    setItems,
    items,
    navigate,
  } = useContext(SearchContext);

  const handleSubmit = (target) => {
    setSubmittedTerm(term);
    setTerm("");

    if (target.textContent === "Artists") {
      type.current = "artists";
    } else if (target.textContent === "Songs") {
      type.current = "songs";
    }
  };

  useEffect(() => {
    const div1 = document.getElementsByClassName("searchDiv")[0];

    if (focus === true) {
      div1.classList.add("searchDivFocus");
    } else {
      div1.classList.remove("searchDivFocus");
    }
  }, [focus]);

  useEffect(() => {
    if (type.current === "artists") {
      spotifyTokenAndSearch(submittedTerm, "artist", setItems, 40);
    } else if (type.current === "songs") {
      spotifyTokenAndSearch(submittedTerm, "track", setItems, 40);
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (type.current === "artists") {
      navigate("/artists");
    } else if (type.current === "songs") {
      navigate("/songs");
    }
  }, [items]);

  return (
    <main className="searchContainer container-fluid d-flex align-items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex flex-column justify-content-center justify-content-evenly align-items-center mt-5 w-100 h-50"
      >
        <div className="w-100 d-flex justify-content-center">
          <div className="ui input searchDiv w-50">
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
              placeholder="Search..."
              data-dashlane-rid="3640789f2356683f"
              data-form-type=""
              className="searchInput"
            />
          </div>
        </div>
        <div>
          <button
            disabled={!term}
            onClick={({ target }) => handleSubmit(target)}
            type="button"
            className="btn btn-outline-dark submitButtons fs-4 rounded-3 me-3 p-2 px-4 "
          >
            Artists
          </button>
          <button
            disabled={!term}
            onClick={({ target }) => handleSubmit(target)}
            type="button"
            className="btn btn-outline-dark submitButtons fs-4 rounded-3 p-2 px-4 "
          >
            Songs
          </button>
        </div>
      </form>
    </main>
  );
};

export default Search;
