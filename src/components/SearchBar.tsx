import { FormEvent, ReactElement, useContext, useEffect, useRef } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchBar = (): ReactElement => {
  const {
    term,
    artists,
    tracks,
    setArtists,
    setTracks,
    setPage,
    setTerm,
    spotifyTokenAndSearch,
    submittedTerm,
    setSubmittedTerm,
  } = useContext(SearchContext);

  const focused = useRef<boolean>(false);
  const pageChange = useRef<boolean>(false);

  useEffect(() => {
    focused.current = false;

    if (artists && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, "artist", setArtists);
      setSubmittedTerm("");
      pageChange.current = true;
    } else if (tracks && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, "track", setTracks);
      setSubmittedTerm("");
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (artists && pageChange.current) {
      sessionStorage.setItem("artists", JSON.stringify(artists));
      setPage(1);
      pageChange.current = false;
    } else if (tracks) {
      sessionStorage.setItem("tracks", JSON.stringify(tracks));
    }
  }, [tracks, artists]);

  const handleFocus = (): void => {
    const input = document.getElementsByClassName(
      "search-input"
    )[0] as HTMLFormElement;

    focused.current = !focused.current;

    if (focused.current === true) {
      input.classList.add("search-input-focus");
    } else {
      input.classList.remove("search-input-focus");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (term) {
      setSubmittedTerm(term);
      setTerm("");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="ui input list-search-div pe-1 justify-content-end"
    >
      <input
        onFocus={() => {
          handleFocus();
        }}
        onBlur={() => {
          handleFocus();
        }}
        value={term}
        onChange={({ target }) => setTerm(target.value)}
        type="text"
        placeholder={`${artists ? "Search artists" : "Search songs"}`}
        data-dashlane-rid="3640789f2356683f"
        data-form-type=""
        className="search-input me-2"
      />
      <button
        role="searchList-button"
        disabled={!term}
        className="ui inverted pink basic button px-1 searchButton d-flex align-items-center justify-content-center"
      >
        <i className="search icon fs-6 mx-0"></i>
      </button>
    </form>
  );
};

export default SearchBar;
