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
    typeString,
    spotifyTokenAndSearch,
    submittedTerm,
    setSubmittedTerm,
  } = useContext(SearchContext);

  const focused = useRef<boolean>(false);
  const pageChange = useRef<boolean>(false);

  useEffect(() => {
    focused.current = false;

    if (typeString === "artist" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setArtists);
      setSubmittedTerm("");
      pageChange.current = true;
    } else if (typeString === "track" && submittedTerm) {
      spotifyTokenAndSearch(submittedTerm, typeString, setTracks);
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
    const div1 = document.getElementsByClassName(
      "listSearchDiv"
    )[0] as HTMLDivElement;

    focused.current = !focused.current;

    if (focused.current === true) {
      div1.classList.add("listSearchDivFocus");
    } else {
      div1.classList.remove("listSearchDivFocus");
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
        type="text"
        placeholder={`${artists ? "Search artists" : "Search songs"}`}
        data-dashlane-rid="3640789f2356683f"
        data-form-type=""
        className="searchInput me-1"
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
