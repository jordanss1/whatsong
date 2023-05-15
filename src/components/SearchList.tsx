import { useContext, useEffect, useMemo, ReactElement } from "react";
import NavBar from "./NavBar";
import SearchContext from "../contexts/SearchStore";
import SearchBar from "./SearchBar";
import SongListSelectedItem from "./song-list/SongListSelectedSong";
import ArtistList from "./artist-list/ArtistList";
import SongList from "./song-list/SongList";
import ArtistListPages from "./artist-list/ArtistListPages";
import { motion } from "framer-motion";
import { SearchListAnimateState } from "../hooks/AnimateStateHooks";
import SearchListContainer from "./SearchListContainer";
import { useMediaQuery } from "../hooks/MediaQueryHook";

const SearchList = (): ReactElement => {
  const {
    artists,
    fullArtists,
    totalArtists,
    tracks,
    totalTracks,
    setFullArtists,
    setTracks,
    animateStateList,
    setAnimateStateList,
    setAnimateStateSearch,
  } = useContext(SearchContext);

  const is900 = useMediaQuery(900);

  useEffect(() => {
    let artists = sessionStorage.getItem("artists");
    let tracks = sessionStorage.getItem("tracks");

    const nav = document.getElementsByClassName("navClass")[0];
    nav.classList.add("navClassList");

    sessionStorage.removeItem("artist-details");

    if (artists && typeof artists === "string") {
      setFullArtists(JSON.parse(artists));
      setAnimateStateSearch({ opacity: 0.5, x: 300 }, { opacity: 0, x: 300 });
      setAnimateStateList({ x: -300, opacity: 0 }, { x: -300, opacity: 0 });
    } else if (tracks && typeof tracks === "string") {
      setTracks(JSON.parse(tracks));
      setAnimateStateSearch({ opacity: 0, x: -300 }, { opacity: 0, x: -300 });
    }
  }, []);

  let animations = useMemo(() => {
    return [
      {
        initial: (animateStateList: SearchListAnimateState) => ({
          ...animateStateList.initial,
        }),
        animate: { x: 0, opacity: 1 },
        exit: (animateStateList: SearchListAnimateState) => ({
          ...animateStateList.exit,
        }),
      },
      {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 300, opacity: 0 },
      },
    ];
  }, []);

  const navContent: ReactElement = (
    <div className="d-flex listNavbar">
      <div className="text-lowercase">
        <span className="w">w.</span>
        <span className="pink me-2">s</span>
      </div>
      <span className="underScore ms-1">_</span>
      <div className="d-flex align-items-end ps-2 pe-2 pb-3 listSpotify">
        <h2 className="fs-6 me-2 mt-3 poweredList text-lowercase">
          powered by
        </h2>
        <i className="spotify icon mb-1 fs-1 pe-1 spotifyIconList"></i>
      </div>
    </div>
  );

  const songOrArtistContainer = (): string => {
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
          <div className="d-flex flex-column ms-2 align-items-center justify-content-center p-5 p-xl-0 artistGrid">
            <h3>No results found</h3>
          </div>
        </SearchListContainer>
      );
    } else {
      return (
        <SearchListContainer isArtists searchResults>
          {artists && <ArtistList artists={artists} />}
          {totalArtists && <ArtistListPages totalArtists={totalArtists} />}
        </SearchListContainer>
      );
    }
  };

  return (
    <motion.main
      variants={artists ? animations[0] : animations[1]}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={animateStateList}
      transition={{ duration: 0.2 }}
      id="main"
      className={songOrArtistContainer()}
    >
      <NavBar content={navContent} />
      {fullArtists && renderArtists()}
      {tracks && renderSongs()}
    </motion.main>
  );
};

export default SearchList;
