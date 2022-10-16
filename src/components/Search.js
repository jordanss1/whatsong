import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";
import { motion } from "framer-motion";

const Search = () => {
  const {
    animateStateSearch,
    focused,
    typeString,
    setTypeString,
    term,
    setAnimateStateSearch,
    setTerm,
    setSubmittedTerm,
    submittedTerm,
    spotifyTokenAndSearch,
    setItems,
    items,
    navigate,
  } = useContext(SearchContext);

  const animations = {
    initial: (animateStateSearch) => ({ ...animateStateSearch.initial }),
    animate: { opacity: 1, y: 0, x: 0 },
    exit: (animateStateSearch) => ({ ...animateStateSearch.exit }),
  };

  useEffect(() => {
    focused.current = false;
    sessionStorage.clear();

    setAnimateStateSearch({
      initial: { opacity: 0.5, y: 300 },
      exit: { opacity: 0, y: 0 },
    });
  }, []);

  useEffect(() => {
    const div = document.getElementsByClassName("instructionsDiv")[0];
    const form = document.getElementsByClassName("wholeForm")[0];

    if (term) {
      div.classList.add("instructionsFloat");
      form.classList.add("wholeFormMoved");
    }
  }, [term]);

  useEffect(() => {
    setTerm("");

    if (typeString === "artist" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
    } else if (typeString === "track" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setItems);
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (typeString === "artist" && submittedTerm) {
      console.log(animateStateSearch);
      setSubmittedTerm("");
      sessionStorage.setItem("artists", JSON.stringify(items));
      navigate("/artists");
    } else if (typeString === "track" && submittedTerm) {
      setSubmittedTerm("");
      sessionStorage.setItem("tracks", JSON.stringify(items));
      navigate("/songs");
    }
  }, [items]);

  const handleFocus = () => {
    const div1 = document.getElementsByClassName("searchDiv")[0];

    focused.current = !focused.current;

    if (focused.current === true) {
      div1.classList.add("searchDivFocus");
    } else {
      div1.classList.remove("searchDivFocus");
    }
  };

  return (
    <motion.main
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      custom={animateStateSearch}
      className="searchContainer container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <div className="instructionsDiv d-flex flex-column justify-content-center w-25">
        <h1 className="text-center fs-4">Search artist or songs</h1>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex flex-column justify-content-center align-items-center wholeForm w-100 h-50"
      >
        <div className="w-100 d-flex justify-content-center pb-5">
          <div className="ui input searchDiv w-50">
            <input
              onFocus={() => handleFocus()}
              onBlur={() => handleFocus()}
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
              setAnimateStateSearch({
                initial: { opacity: 0.5, x: 300 },
                exit: { opacity: 0, x: 300 },
              });
            }}
            type="button"
            className="btn btn-outline-dark submitButtons fs-4 rounded-3 me-3 p-1 px-3 "
          >
            Artists
          </button>
          <button
            disabled={!term}
            onClick={() => {
              setTypeString("track");
              setSubmittedTerm(term);
              setAnimateStateSearch({
                initial: { opacity: 0, x: -300 },
                exit: { opacity: 0, x: -300 },
              });
            }}
            type="button"
            className="btn btn-outline-dark submitButtons fs-4 rounded-3 p-1 px-3 "
          >
            Songs
          </button>
        </div>
      </form>
    </motion.main>
  );
};

export default Search;
