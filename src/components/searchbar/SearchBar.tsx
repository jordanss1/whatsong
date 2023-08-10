import {
  FormEvent,
  ReactElement,
  useState,
  useContext,
  useEffect,
} from "react";
import SearchContext from "../../contexts/SearchStore";
import SearchButton from "./SearchButton";
import "./styles/searchbar.css";

const SearchBar = (): ReactElement => {
  const { handleArtistsOrSongsSearch, artists, tracks, searched, setSearched } =
    useContext(SearchContext);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (artists && searched) {
      setSearched(false);
      sessionStorage.setItem("artists", JSON.stringify(artists));
    } else if (tracks && searched) {
      setSearched(false);
      sessionStorage.setItem("tracks", JSON.stringify(tracks));
    }
  }, [tracks?.[0], artists?.[0]]);

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
          data-testid="small-search-bar"
        />
        <SearchButton searchTerm={searchTerm} />
      </div>
    </form>
  );
};

export default SearchBar;
