import {
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  ReactElement,
} from "react";
import NavBar from "./NavBar";
import SearchContext from "../contexts/SearchStore";
import SearchBar from "./SearchBar";
import SelectedItem from "./SelectedItem";
import ArtistList from "./ArtistList";
import SongList from "./SongList";
import Pages from "./Pages";
import { motion } from "framer-motion";
import { UseSearchStateContext } from "../contexts/SearchState";
import { SearchListAnimateState } from "../hooks/AnimateStateHooks";
import { TopTracksDetailsType } from "../types";

export type HandleProfileClickType = (id: string) => void;

export type HandleSelectedSongType = (
  track: Required<TopTracksDetailsType>
) => void;

const SearchList = (): ReactElement => {
  const {
    artists,
    totalArtists,
    tracks,
    totalTracks,
    setArtists,
    setTracks,
    albums,
    topTracks,
    animateStateList,
    selectedSong,
    setTypeString,
    setAnimateStateList,
    setAnimateStateSearch,
    setSelectedSong,
    spotifyArtistAndAlbum,
    setFilteredAlbum,
    setFilteredTrack,
    navigate,
    setProfile,
    slicedElements,
  } = useContext(SearchContext);

  const idRef = useRef<string | null>(null);

  console.log(tracks);
  console.log(artists);

  useEffect(() => {
    let artists = sessionStorage.getItem("artists");
    let tracks = sessionStorage.getItem("tracks");

    const nav = document.getElementsByClassName("navClass")[0];
    setFilteredTrack(0);
    setFilteredAlbum(0);

    nav.classList.add("navClassList");

    if (artists && typeof artists === "string") {
      setTypeString("artist");
      setArtists(JSON.parse(artists));
      setAnimateStateSearch({ opacity: 0.5, x: 300 }, { opacity: 0, x: 300 });
      setAnimateStateList({ x: -300, opacity: 0 }, { x: -300, opacity: 0 });
    } else if (tracks && typeof tracks === "string") {
      setTypeString("track");
      setTracks(JSON.parse(tracks));
      setAnimateStateSearch({ opacity: 0, x: -300 }, { opacity: 0, x: -300 });
    }
  }, []);

  useEffect(() => {
    if (albums && topTracks && idRef.current) {
      navigate(`/artists/${idRef.current}`);
      idRef.current = null;
    }
  }, [albums, topTracks]);

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

  const handleProfileClick = useCallback<HandleProfileClickType>(
    (id) => {
      idRef.current = id;
      spotifyArtistAndAlbum(id, setProfile);
      setAnimateStateList({ x: 300, opacity: 0 }, { x: 300, opacity: 0 });
    },
    [setAnimateStateList, setProfile, spotifyArtistAndAlbum]
  );

  const handleSelectedSong = useCallback<HandleSelectedSongType>(
    (track) => {
      setSelectedSong(track);
    },
    [setSelectedSong]
  );

  const songOrArtistContainer = (): string => {
    if (artists) {
      return "artistWholeListContainer d-flex flex-column px-1";
    }

    return `songWholeListContainer ${
      totalTracks === 0 ? "" : "d-grid"
    } container-fluid`;
  };

  const renderSongs = (): ReactElement => {
    if (totalTracks === 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 d-flex flex-column align-items-center justify-content-between justify-content-center pt-4 noResultsSong"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-between  flex-column flex-xl-row noResultsSearch border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Songs</h2>
            <SearchBar />
          </div>
          <div className="d-flex flex-column ms-2 align-items-center justify-content-center p-5 p-xl-0">
            <h3>No results found</h3>
          </div>
        </motion.section>
      );
    } else if (totalTracks > 0 && tracks) {
      return (
        <section
          className={`${
            selectedSong ? "containerAnimate" : ""
          } w-100 d-grid selectedContainer`}
        >
          <SelectedItem />
          <SongList tracks={tracks} handleSelectedSong={handleSelectedSong} />
        </section>
      );
    }
    return <div></div>;
  };

  const renderArtists = (): ReactElement => {
    if (totalArtists === 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 h-100 d-grid artistListContainer align-items-center justify-content-center pt-4"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row noResultsSearch border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Artists</h2>
            <SearchBar />
          </div>
          <div className="d-flex flex-column ms-2 align-items-center justify-content-center p-5 p-xl-0 artistGrid">
            <h3>No results found</h3>
          </div>
        </motion.section>
      );
    } else if (totalArtists > 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 h-100 d-grid artistListContainer align-items-center justify-content-center pt-4"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row searchListDiv align-self-lg-end border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Artists</h2>
            <SearchBar />
          </div>
          {artists && (
            <ArtistList
              handleProfileClick={handleProfileClick}
              slicedElements={slicedElements}
              artists={artists}
            />
          )}
          <Pages />
        </motion.section>
      );
    }
    return <div></div>;
  };

  return (
    <motion.main
      variants={artists ? animations[0] : animations[1]}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={animateStateList}
      transition={{ duration: 0.2 }}
      style={(totalArtists | totalTracks) === 0 ? { height: "100vh" } : {}}
      id="main"
      className={songOrArtistContainer()}
    >
      <NavBar content={navContent} />
      {artists && renderArtists()}
      {tracks && renderSongs()}
    </motion.main>
  );
};

export default SearchList;
