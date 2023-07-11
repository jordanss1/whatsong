import { useContext, useEffect, ReactElement } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import SearchBar from "../SearchBar";
import SongListSelectedItem from "../song-list/SongListSelectedSong";
import ArtistList from "../artist-list/ArtistList";
import SongList from "../song-list/SongList";
import { motion } from "framer-motion";
import SearchListContainer from "./SearchListContainer";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import "./styles/search-list.css";

const SearchList = (): ReactElement => {
  const { artists, totalArtists, tracks, totalTracks, setArtistsOrTracks } =
    useContext(SearchContext);

  const is900 = useMediaQuery(900);

  useEffect(() => {
    let artists = sessionStorage.getItem("artists");
    let tracks = sessionStorage.getItem("tracks");

    sessionStorage.removeItem("artist-details");

    if (artists && typeof artists === "string") {
      setArtistsOrTracks(JSON.parse(artists));
    } else if (tracks && typeof tracks === "string") {
      setArtistsOrTracks(undefined, JSON.parse(tracks));
    }
  }, []);

  const songOrArtistContainerClasses = (): string => {
    if (artists) {
      return "artistWholeListContainer d-flex flex-column px-1";
    }

    return `songWholeListContainer 
     container-fluid`;
  };

  const renderSongs = (): ReactElement => {
    if (!totalTracks) {
      return (
        <SearchListContainer isArtists={false} searchResults={false}>
          <div className="d-flex align-items-center justify-content-center justify-content-between  flex-column flex-xl-row noResultsSearch border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Songs</h2>
            <SearchBar />
          </div>
          <div className="d-flex flex-column ms-2 align-items-center justify-content-center p-5 p-xl-0">
            <h3>No results found</h3>
          </div>
        </SearchListContainer>
      );
    } else {
      return (
        <>
          <SearchListContainer isArtists={false} searchResults>
            {!is900 && <SongListSelectedItem />}
            <div className="song-list-empty-div"></div>
            {tracks && <SongList tracks={tracks} />}
          </SearchListContainer>
        </>
      );
    }
  };

  const renderArtists = (): ReactElement => {
    if (!totalArtists) {
      return (
        <SearchListContainer isArtists searchResults={false}>
          <div className="no-results-artists d-flex align-items-center">
            <h3 className="text-center w-100">No results found</h3>
          </div>
        </SearchListContainer>
      );
    } else {
      return (
        <SearchListContainer isArtists searchResults>
          {artists && <ArtistList artists={artists} />}
        </SearchListContainer>
      );
    }
  };

  return (
    <motion.main id="main" className={songOrArtistContainerClasses()}>
      {artists && renderArtists()}
      {tracks && renderSongs()}
    </motion.main>
  );
};

export default SearchList;
