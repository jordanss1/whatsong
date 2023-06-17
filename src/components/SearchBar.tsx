import {
  FormEvent,
  ReactElement,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import SearchContext from "../contexts/SearchStore";

const SearchBar = (): ReactElement => {
  const {
    term,
    setTerm,
    handleArtistsOrSongsSearch,
    submittedTerm,
    setSubmittedTerm,
    setPage,
    fullArtists,
    tracks,
  } = useContext(SearchContext);

  const [searchInputClass, setSearchInputClass] = useState("");

  const pageChange = useRef<boolean>(false);

  useEffect(() => {
    if (fullArtists && submittedTerm) {
      handleArtistsOrSongsSearch(submittedTerm, "artist");
      setSubmittedTerm("");
      pageChange.current = true;
    } else if (tracks && submittedTerm) {
      handleArtistsOrSongsSearch(submittedTerm, "track");
      setSubmittedTerm("");
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (fullArtists && pageChange.current) {
      sessionStorage.setItem("artists", JSON.stringify(fullArtists));
      setPage(1);
      pageChange.current = false;
    } else if (tracks) {
      sessionStorage.setItem("tracks", JSON.stringify(tracks));
    }
  }, [tracks, fullArtists]);

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
          setSearchInputClass("search-input-focus");
        }}
        onBlur={() => {
          setSearchInputClass("");
        }}
        value={term}
        onChange={({ target }) => setTerm(target.value)}
        type="text"
        placeholder={`${fullArtists ? "Search artists" : "Search songs"}`}
        data-dashlane-rid="3640789f2356683f"
        data-form-type=""
        className={`search-input ${searchInputClass} me-2`}
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
