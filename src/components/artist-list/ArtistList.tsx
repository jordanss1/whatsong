import { ReactElement, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import Header from "../header/Header";
import ArtistListGrid from "./ArtistListGrid";
import SearchBar from "../SearchBar";
import SearchContext from "../../contexts/searchContext/SearchState";
import "./styles/artist-list.css";

const artistContainerVariants: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
    transition: {
      delay: 0.5,
      duration: 0.5,
      staggerChildren: 0.04,
      when: "beforeChildren",
    },
  },
  exit: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%)",
    transition: {
      duration: 0.3,
      delay: 0.4,
      staggerChildren: 0.02,
    },
  },
};

const artistSearchBarVariants: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ArtistList = (): ReactElement => {
  const { artists, setArtistsOrTracks } = useContext(SearchContext);
  const [searched, setSearched] = useState(false);

  const location = useLocation();

  useEffect(() => {
    let artists = sessionStorage.getItem("artists");

    sessionStorage.removeItem("artist-details");

    if (artists && typeof artists === "string") {
      setArtistsOrTracks(JSON.parse(artists));
    }
  }, []);

  return (
    <>
      {artists && (
        <motion.main
          variants={artistContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="artistWholeListContainer d-flex flex-column px-1"
        >
          <Header path={location.pathname} />
          <div className="filler-div" />
          <section className="w-100 h-100 artist-list-container d-grid py-4 px-1">
            <motion.div
              variants={artistSearchBarVariants}
              className="align-items-center justify-content-end d-flex search-input-container"
            >
              <SearchBar setSearched={setSearched} />
            </motion.div>
            <ArtistListGrid
              setSearched={setSearched}
              searched={searched}
              artists={artists}
            />
          </section>
          <div className="filler-div" />
        </motion.main>
      )}
    </>
  );
};

export default ArtistList;
