import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";
import { motion } from "framer-motion";

const Search = () => {
  const {
    focus,
    typeString,
    setTypeString,
    term,
    setFocus,
    setTerm,
    setSubmittedTerm,
    submittedTerm,
    spotifyTokenAndSearch,
    setItems,
    items,
    navigate,
  } = useContext(SearchContext);

  useEffect(() => {
    const div1 = document.getElementsByClassName("searchDiv")[0];

    if (focus === true) {
      div1.classList.add("searchDivFocus");
    } else {
      div1.classList.remove("searchDivFocus");
    }
  }, [focus]);

  useEffect(() => {
    const container = document.getElementsByClassName("searchContainer")[0];

    if (term || submittedTerm) {
      container.classList.add("focusContainer");
    } else {
      container.classList.remove("focusContainer");
    }
  }, [term]);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    setTerm("");

    if (typeString === "artist" && submittedTerm) {
      sessionStorage.removeItem("artists");
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
    } else if (typeString === "track" && submittedTerm) {
      sessionStorage.removeItem("tracks");
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (items.length > 0 && typeString === "artist" && submittedTerm) {
      setSubmittedTerm("");
      sessionStorage.setItem("artists", JSON.stringify(items));
      navigate("/artists");
    } else if (items.length > 0 && typeString === "track" && submittedTerm) {
      setSubmittedTerm("");
      sessionStorage.setItem("tracks", JSON.stringify(items));
      navigate("/songs");
    }
  }, [items]);

  return (
    <motion.main
      initial={{
        position: "relative",
        bottom: "800px",
        opacity: 0.5,
        transition: { duration: 0.5 },
      }}
      animate={{ top: "0px", opacity: 1, transition: { duration: 0.5 } }}
      exit={{ top: "1000px", opacity: 0, transition: { duration: 0.5 } }}
      className="searchContainer container-fluid d-flex align-items-center"
    >
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
            onClick={() => {
              setTypeString("artist");
              setSubmittedTerm(term);
            }}
            type="button"
            className="btn btn-outline-dark submitButtons fs-4 rounded-3 me-3 p-2 px-4 "
          >
            Artists
          </button>
          <button
            disabled={!term}
            onClick={() => {
              setTypeString("track");
              setSubmittedTerm(term);
            }}
            type="button"
            className="btn btn-outline-dark submitButtons fs-4 rounded-3 p-2 px-4 "
          >
            Songs
          </button>
        </div>
      </form>
    </motion.main>
  );
};

export default Search;
