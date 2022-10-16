import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import SearchContext from "../contexts/SearchStore";
import SearchBar from "./SearchBar";
import SelectedItem from "./SelectedItem";
import ArtistList from "./ArtistList";
import SongList from "./SongList";
import Pages from "./Pages";
import { motion } from "framer-motion";

const SearchList = () => {
  const {
    items,
    animateStateList,
    selectedItem,
    setTypeString,
    setItems,
    typeString,
    setAnimateStateList,
    setAnimateStateSearch,
  } = useContext(SearchContext);

  let animations = [
    {
      initial: (animateStateList) => ({ ...animateStateList.initial }),
      animate: { x: 0, opacity: 1 },
      exit: (animateStateList) => ({ ...animateStateList.exit }),
    },
    {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 300, opacity: 0 },
    },
  ];

  useEffect(() => {
    const nav = document.getElementsByClassName("navClass")[0];
    sessionStorage.removeItem("artist-details");

    nav.classList.add("navClassList");

    if (sessionStorage.getItem("artists")) {
      setTypeString("artist");
      setItems(JSON.parse(sessionStorage.getItem("artists")));
      setAnimateStateSearch({
        initial: { opacity: 0.5, x: 300 },
        exit: { opacity: 0, x: 300 },
      });
      setAnimateStateList({
        initial: { x: -300, opacity: 0 },
        exit: { x: -300, opacity: 0 },
      });
    } else if (sessionStorage.getItem("tracks")) {
      setTypeString("track");
      setItems(JSON.parse(sessionStorage.getItem("tracks")));
      setAnimateStateSearch({
        initial: { opacity: 0, x: -300 },
        exit: { opacity: 0, x: -300 },
      });
    }
  }, []);

  const content = () => {
    return (
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
  };

  const renderSongs = () => {
    if (items.length === 0) {
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
    } else if (items.length > 0) {
      return (
        <section
          className={`${
            selectedItem ? "containerAnimate" : ""
          } w-100 d-grid selectedContainer`}
        >
          <SelectedItem />
          <SongList />
        </section>
      );
    }
  };

  const renderArtists = () => {
    if (items.length === 0) {
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
    } else if (items.length > 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 h-100 d-grid artistListContainer align-items-center justify-content-center pt-4"
        >
          <ArtistList />
          <Pages />
        </motion.section>
      );
    }
  };

  return (
    <motion.main
      variants={typeString === "artist" ? animations[0] : animations[1]}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={animateStateList}
      transition={{ duration: 0.2 }}
      style={items.length === 0 ? { height: "100vh" } : {}}
      id="main"
      className={`${
        typeString === "artist"
          ? "artistWholeListContainer d-flex flex-column px-1"
          : `songWholeListContainer ${
              items.length === 0 ? "d-flex flex-column" : "d-grid"
            }`
      } container-fluid `}
    >
      <NavBar content={content} />
      {typeString === "artist" ? renderArtists() : renderSongs()}
    </motion.main>
  );
};

export default SearchList;
