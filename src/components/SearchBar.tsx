import {
  FormEvent,
  ReactElement,
  useState,
  useContext,
  useEffect,
} from "react";
import SearchContext from "../contexts/searchContext/SearchStore";
import "../styles/all.css";

const SearchBar = ({
  setSearched,
}: {
  setSearched: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const { handleArtistsOrSongsSearch, artists, tracks } =
    useContext(SearchContext);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (artists) {
      setSearched(false);
      sessionStorage.setItem("artists", JSON.stringify(artists));
    } else if (tracks) {
      setSearched(false);
      sessionStorage.setItem("tracks", JSON.stringify(tracks));
    }
  }, [tracks, artists]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category = artists ? "artist" : "track";

    if (searchTerm) {
      setSearched(true);
      handleArtistsOrSongsSearch(searchTerm, category);
      setSearchTerm("");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="ui input pe-1 justify-content-end"
    >
      <div className="search-input d-flex">
        <input
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          className="flex-grow-1"
          placeholder={`${artists ? "Search artists" : "Search songs"}`}
          type="text"
        />
        <button
          role="searchList-button"
          disabled={!searchTerm}
          type="submit"
          className="search-button"
        >
          <i className="search icon fs-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
