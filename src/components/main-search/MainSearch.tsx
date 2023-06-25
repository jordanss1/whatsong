import { useContext, useEffect, useRef, ReactElement, useState } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { AnimatePresence, Variants, motion, useCycle } from "framer-motion";
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
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 110%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 90%)",
    transition: {
      duration: 0.5,
    },
  },
  songs: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .3) 15%,transparent 70%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, .2) 20%,transparent 90%)",
    transition: {
      duration: 0.5,
    },
  },
};

const searchVarients: Variants = {
  awaitingInput: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%), radial-gradient(circle at 0% 110%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)",
    transition: {
      duration: 1,
      delay: .5,
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
  const [mainCycle, cycleMain] = useCycle(
    "intro",
    "artists",
    "songs",
    "awaitingInput"
  );

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

  const handleCategoryClick = (category: string) => {
    cycleMain(3);
    setCategory(category);
  };

  return (
    <motion.main
      className="search-main d-flex flex-column"
      variants={category ? searchVarients : categoryVarients}
      initial="initial"
      animate={mainCycle}
      key="search"
    >
      <div className="fixed" />
      <AnimatePresence mode="wait">
        {category ? (
          <MainSearchInput key="input" />
        ) : (
          <MainSearchCategory
            key="category"
            handleHover={handleCategoryHover}
            handleClick={handleCategoryClick}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default MainSearch;
