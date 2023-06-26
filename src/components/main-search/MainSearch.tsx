import {
  useContext,
  useEffect,
  ReactElement,
  useState,
  FormEvent,
} from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { AnimatePresence, Variants, motion, useCycle } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import MainSearchCategory from "./MainSearchCategory";
import MainSearchInput from "./MainSearchInput";
import "./styles/main-search.css";
import MainSearchHeader from "./MainSearchHeader";

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
      delay: 0.5,
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
    setFullArtists,
    setTracks,
    setSelectedSong,
    fullArtists,
    tracks,
    setPage,
    handleArtistsOrSongsSearch,
    navigate,
  } = useContext<UseSearchStateContext>(SearchContext);

  const [category, setCategory] = useState<string>("");
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const [mainCycle, cycleMain] = useCycle(
    "intro",
    "artists",
    "songs",
    "awaitingInput"
  );

  const [redo, cycleRedo] = useCycle(false, true);

  useEffect(() => {
    setFullArtists(null);
    setTracks(null);
    setSelectedSong(null);
  }, []);

  useEffect(() => {
    setTerm("");

    if (category === "artist" && submittedTerm) {
      handleArtistsOrSongsSearch(submittedTerm, category);
    } else if (category === "track" && submittedTerm) {
      handleArtistsOrSongsSearch(submittedTerm, category);
    }
  }, [submittedTerm]);

  useEffect(() => {
    if (category === "artist" && submittedTerm) {
      setPage(1);
      setSubmittedTerm("");
      sessionStorage.setItem("artists", JSON.stringify(fullArtists));
      navigate("/artists");
    } else if (category === "track" && submittedTerm) {
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
    setCategory(category);
    cycleMain(3);
    cycleRedo(0);
  };

  const handleResetCategoryClick = () => {
    setCategory("");
    cycleMain(0);
    cycleRedo(1);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedTerm(term);
  };

  return (
    <motion.main
      className="search-main d-flex"
      variants={category ? searchVarients : categoryVarients}
      initial="initial"
      animate={mainCycle}
      key="search"
    >
      <AnimatePresence mode="wait">
        {category ? (
          <div className="actual-search-box d-flex flex-column gap-4 w-100">
            <MainSearchHeader
              key="header"
              handleClick={handleResetCategoryClick}
              category={category}
            />
            <MainSearchInput
              key="input"
              handleSubmit={handleFormSubmit}
              setTerm={setTerm}
              term={term}
            />
          </div>
        ) : (
          <MainSearchCategory
            key="category"
            redo={redo}
            handleHover={handleCategoryHover}
            handleClick={handleCategoryClick}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default MainSearch;
