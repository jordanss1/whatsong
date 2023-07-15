import { useContext, useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import SearchContext from "../../contexts/searchContext/SearchStore";
import SearchBar from "./SearchListSearchBar";
import SongListSelectedItem from "../song-list/SongListSelectedSong";
import ArtistList from "../artist-list/ArtistList";
import SongList from "../song-list/SongList";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import "./styles/search-list.css";

const SearchList = (): ReactElement => {
  const { artists, tracks, setArtistsOrTracks } = useContext(SearchContext);

  const location = useLocation();

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

    return "";
  };

  const renderSongs = (
    <motion.section className="w-100 whole-songs-container d-grid">
      {!is900 && <SongListSelectedItem />}
      <div className="song-list-empty-div"></div>
      {tracks && <SongList tracks={tracks} />}
    </motion.section>
  );

  const renderArtists = (
    <>
      <motion.section className="w-100 h-100 d-flex">
        <div className="artist-list-results d-grid h-100 py-4 px-1">
          <div className="align-items-center justify-content-end d-flex search-input-container">
            <SearchBar />
          </div>
          {artists && <ArtistList artists={artists} />}
        </div>
      </motion.section>
      <div className="filler-div" />
    </>
  );

  return (
    <>
      <Header path={location.pathname} />
      <div className="filler-div" />
      <motion.main className={songOrArtistContainerClasses()}>
        {artists && renderArtists}
        {tracks && renderSongs}
      </motion.main>
    </>
  );
};

export default SearchList;
