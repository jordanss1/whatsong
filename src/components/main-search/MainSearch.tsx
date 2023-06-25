import { useContext, useEffect, useRef, ReactElement, useState } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { Variants, motion, useCycle } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import MainSearchCategory from "./MainSearchCategory";
import MainSearchInput from "./MainSearchInput";
import "./styles/main-search.css";

const categoryVarients: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, 0) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
  },
  intro: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
    transition: {
      duration: 1,
    },
  },
  artists: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 90%)",
    transition: {
      duration: 0.5,
    },
  },
  songs: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, .3) 10%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, .2) 20%,transparent 90%)",
    transition: {
      duration: 0.5,
    },
  },
};

export type HandleButtonClickType = (
  category: "artist" | "track",
  term: string
) => void;

export type HandleCategoryHoverType = (hovered?: "artists" | "songs") => void;

const MainSearch = (): ReactElement => {
  const {
    term,
    setTerm,
    setFullArtists,
    setTracks,
    setSelectedSong,
    fullArtists,
    tracks,
    setPage,
    setSubmittedTerm,
    submittedTerm,
    handleArtistsOrSongsSearch,
    navigate,
  } = useContext<UseSearchStateContext>(SearchContext);

  const [category, setCategory] = useState<string>("");
  const [mainCycle, cycleMain] = useCycle("intro", "artists", "songs");

  const searchType = useRef<string>("");

  useEffect(() => {
    setFullArtists(null);
    setTracks(null);
    setSelectedSong(null);
  }, []);

  useEffect(() => {
    setTerm("");

    if (searchType.current === "artist" && submittedTerm) {
      handleArtistsOrSongsSearch(submittedTerm, searchType.current);
    } else if (searchType.current === "track" && submittedTerm) {
      handleArtistsOrSongsSearch(submittedTerm, searchType.current);
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (searchType.current === "artist" && submittedTerm) {
      setPage(1);
      setSubmittedTerm("");
      sessionStorage.setItem("artists", JSON.stringify(fullArtists));
      navigate("/artists");
    } else if (searchType.current === "track" && submittedTerm) {
      setSubmittedTerm("");
      sessionStorage.setItem("tracks", JSON.stringify(tracks));
      navigate("/songs");
    }
  }, [tracks, fullArtists]);

  const handleCategoryHover: HandleCategoryHoverType = (hovered) => {
    if (hovered === "artists") {
      cycleMain(1);
    } else if (hovered === "songs") {
      cycleMain(2);
    } else if (!hovered) {
      cycleMain(0);
    }
  };

  return (
    <motion.main
      className="search-main d-flex flex-column"
      variants={categoryVarients}
      initial="initial"
      animate={mainCycle}
      key="search"
      layout
    >
      <div className="fixed" />
      <MainSearchCategory
        handleHover={handleCategoryHover}
        category={category}
        setCategory={setCategory}
      />
      <MainSearchInput />
    </motion.main>
  );
};

export default MainSearch;
