import { ReactElement, useContext, useEffect, useState } from "react";
import { motion, Variants, useScroll, useCycle } from "framer-motion";
import Header from "../header/Header";
import ArtistListGrid from "./ArtistListGrid";
import ArtistListSearchBar from "./ArtistListSearchBar";
import SearchContext from "../../contexts/SearchState";
import "./styles/artist-list.css";

const artistsNormalVariants: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 100% 50%,rgb(0, 5, 133, 1) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133, 1) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 1) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 1) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
    transition: {
      delay: 0.5,
      duration: 0.5,
      staggerChildren: 0.05,
      when: "beforeChildren",
      type: "tween",
      ease: "easeInOut",
    },
  },
  exit: {
    background: [
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 1) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 1) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%)",
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
    ],
    transition: {
      duration: 0.5,
      when: "afterChildren",
      staggerChildren: 0.01,
      background: {
        duration: 1,
        type: "tween",
        ease: "easeInOut",
      },
    },
  },
};

const artistDetailVariants: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
      when: "beforeChildren",
      type: "tween",
      ease: "easeInOut",
    },
  },
  exit: {
    background: [
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, .2) 20%,transparent 60%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, .2) 20%,transparent 60%)",
      "radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)",
    ],
    transition: {
      when: "afterChildren",
      staggerChildren: 0.01,
      duration: 0.5,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const ArtistList = (): ReactElement => {
  const { artists, setArtistsOrTracks, searched, setProfile, artistDetail } =
    useContext(SearchContext);

  const { scrollY } = useScroll();

  const [headerCycle, cycleHeader] = useCycle<"animate" | "transparent">(
    "animate",
    "transparent"
  );

  useEffect(() => {
    let artists = sessionStorage.getItem("artists");

    if (artists && typeof artists === "string") {
      setProfile(null, null, null);
      setArtistsOrTracks(JSON.parse(artists));
    }
  }, []);

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 55) {
        cycleHeader(1);
      } else {
        cycleHeader(0);
      }
    });

    return () => scrollY.clearListeners();
  }, []);

  return (
    <>
      {artists && (
        <motion.main
          variants={artistDetail ? artistDetailVariants : artistsNormalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="artist-whole-list-container d-flex flex-column px-1"
        >
          <Header headerCycle={headerCycle} />
          <div className="filler-div" />
          <motion.section className="w-100 h-100 artist-list-container d-grid py-4 px-1">
            <ArtistListSearchBar searched={searched} cycle={headerCycle} />
            <ArtistListGrid artists={artists} />
          </motion.section>
          <div className="filler-div" />
        </motion.main>
      )}
    </>
  );
};

export default ArtistList;
