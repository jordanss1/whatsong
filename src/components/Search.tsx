import { useContext, useEffect, useRef, ReactElement } from "react";
import SearchContext from "../contexts/SearchStore";
import { motion } from "framer-motion";
import { UseSearchStateContext } from "../contexts/SearchState";
import { SearchAnimateState } from "../hooks/AnimateStateHooks";

type HandleButtonClickType = (
  category: "artist" | "track",
  term: string
) => void;

const Search = (): ReactElement => {
  const {
    animateStateSearch,
    term,
    setAnimateStateSearch,
    setTerm,
    setArtists,
    setTracks,
    setSelectedSong,
    artists,
    tracks,
    setPage,
    setSubmittedTerm,
    submittedTerm,
    spotifyTokenAndSearch,
    navigate,
  } = useContext<UseSearchStateContext>(SearchContext);

  const focused = useRef<boolean>(false);
  const searchType = useRef<string>("");

  const animations = {
    initial: (animateStateSearch: SearchAnimateState) => ({
      ...animateStateSearch.initial,
    }),
    animate: { opacity: 1, y: 0, x: 0 },
    exit: (animateStateSearch: SearchAnimateState) => ({
      ...animateStateSearch.exit,
    }),
  };

  useEffect(() => {
    focused.current = false;
    setArtists(null);
    setTracks(null);
    setSelectedSong(null);
    setAnimateStateSearch({ opacity: 0.5, y: 300 }, { opacity: 0, y: 0 });
  }, []);

  useEffect(() => {
    const div = document.getElementsByClassName(
      "instructionsDiv"
    )[0] as HTMLDivElement;
    const form = document.getElementsByClassName(
      "wholeForm"
    )[0] as HTMLFormElement;

    if (term) {
      div.classList.add("instructionsFloat");
      form.classList.add("wholeFormMoved");
    }
  }, [term]);

  useEffect(() => {
    setTerm("");

    if (searchType.current === "artist" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, searchType.current, setArtists);
    } else if (searchType.current === "track" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, searchType.current, setTracks);
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (searchType.current === "artist" && submittedTerm) {
      setPage(1);
      setSubmittedTerm("");
      sessionStorage.setItem("artists", JSON.stringify(artists));
      navigate("/artists");
    } else if (searchType.current === "track" && submittedTerm) {
      setSubmittedTerm("");
      sessionStorage.setItem("tracks", JSON.stringify(tracks));
      navigate("/songs");
    }
  }, [tracks, artists]);

  const handleFocus = (): void => {
    const input = document.getElementsByClassName(
      "main-search-div"
    )[0] as HTMLInputElement;

    focused.current = !focused.current;

    if (focused.current === true) {
      input.classList.add("main-search-div-focus");
    } else {
      input.classList.remove("main-search-div-focus");
    }
  };

  const handleButtonClick: HandleButtonClickType = (category, term) => {
    const x = category === "artist" ? 300 : -300;

    searchType.current = category;
    setSubmittedTerm(term);
    setAnimateStateSearch({ opacity: 0.5, x }, { opacity: 0, x });
    sessionStorage.clear();
  };

  const renderButton = (buttonType: "artists" | "songs"): ReactElement => {
    const capitalized =
      buttonType.charAt(0).toUpperCase() + buttonType.slice(1);

    return (
      <button
        placeholder="button"
        role={`search-button-${buttonType}`}
        disabled={!term}
        onClick={() =>
          handleButtonClick(buttonType === "artists" ? "artist" : "track", term)
        }
        type="button"
        className={`btn btn-outline-dark submitButtons fs-4 rounded-3 ${
          buttonType === "artists" && "me-3"
        } p-1 px-3`}
      >
        {capitalized}
      </button>
    );
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
      <div className="instructionsDiv d-flex flex-column justify-content-center p-4">
        <h1 className="text-center fs-4">Search artists or songs</h1>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex flex-column justify-content-center align-items-center wholeForm w-100 h-50"
      >
        <div className="w-100 d-flex justify-content-center main-search-div-outer">
          <div className="ui input main-search-div w-50">
            <input
              role="search-all-input"
              onFocus={() => handleFocus()}
              onBlur={() => handleFocus()}
              value={term}
              onChange={({ target }) => setTerm(target.value)}
              type="text"
              placeholder="Search..."
              data-dashlane-rid="3640789f2356683f"
              data-form-type=""
              className="main-search-input"
            />
          </div>
        </div>
        <div>
          {renderButton("artists")}
          {renderButton("songs")}
        </div>
      </form>
    </motion.main>
  );
};

export default Search;
