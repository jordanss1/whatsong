import {
  useContext,
  useEffect,
  ReactElement,
  useState,
  FormEvent,
} from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import {
  AnimatePresence,
  Variants,
  motion,
  useCycle,
  usePresence,
  useAnimate,
} from "framer-motion";
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
  searchComplete: (category) => ({
    background:
      category === "artist"
        ? "radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)"
        : "radial-gradient(circle at 110% 50%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%), radial-gradient(circle at -10% 50%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
      type: "tween",
    },
  }),
};

export type HandleButtonClickType = (
  category: "artist" | "track",
  term: string
) => void;

export type HandleCategoryHoverType = (hovered?: "artists" | "songs") => void;

const MainSearch = (): ReactElement => {
  const {
    setSelectedTrack,
    artists,
    tracks,
    handleArtistsOrSongsSearch,
    navigate,
    resetModalOrSpotify,
    error,
    noResults,
    setLoading,
  } = useContext<UseSearchStateContext>(SearchContext);

  const [category, setCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  const [mainCycle, cycleMain] = useCycle(
    "intro",
    "artists",
    "songs",
    "awaitingInput",
    "searchComplete"
  );

  const [redo, cycleRedo] = useCycle(false, true);

  useEffect(() => {
    resetModalOrSpotify("spotify");
    setSelectedTrack(null);
    setLoading(false);
    const category = sessionStorage.getItem("category");

    if (category) {
      setCategory(category);
      cycleMain(3);
    }
  }, []);

  useEffect(() => {
    if (error || noResults) return;
    setSearchTerm("");
  }, [error, noResults]);

  useEffect(() => {
    const item = artists ? artists : tracks;
    const key = artists ? "artists" : "tracks";

    if ((artists || tracks) && !error && category) {
      sessionStorage.clear();
      // sessionStorage.removeItem(key);

      setSearchTerm("");
      sessionStorage.setItem(key, JSON.stringify(item));
      navigate(artists ? "/artists" : "/tracks");
    }
  }, [tracks, artists]);

  useEffect(() => {
    if (!isPresent) {
      const mainCycle = tracks || artists ? 4 : 0;

      const exitAnimation = async () => {
        cycleMain(mainCycle);
        animate(
          ".main-input",
          {
            x: -200,
            opacity: 0,
          },
          {
            duration: tracks || artists ? 1.5 : 0.5,
          }
        );
        await animate(
          ".redo",
          tracks || artists
            ? {
                x: 200,
                opacity: 0,
              }
            : { y: -100, opacity: 0 },
          tracks || artists
            ? {
                duration: 1.5,
              }
            : {
                delay: 0.5,
                duration: 0.5,
              }
        );

        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

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
    sessionStorage.setItem("category", category);
    setCategory(category);
    cycleMain(3);
    cycleRedo(0);
  };

  const handleResetCategoryClick = () => {
    sessionStorage.removeItem("category");
    setCategory("");
    cycleMain(0);
    cycleRedo(1);
  };

  const handleFormSubmit = (e: FormEvent, searchTerm: string) => {
    e.preventDefault();
    handleArtistsOrSongsSearch(searchTerm, category);
  };

  return (
    <motion.main
      className="search-main d-flex"
      ref={scope}
      custom={category}
      variants={category ? searchVarients : categoryVarients}
      initial="initial"
      animate={mainCycle}
      key="search"
    >
      <AnimatePresence mode="wait">
        {category || sessionStorage.getItem("category") ? (
          <div className="actual-search-box d-flex flex-column gap-4 px-4 w-100">
            <MainSearchHeader
              key="header"
              handleClick={handleResetCategoryClick}
              category={category}
            />
            <MainSearchInput
              key="input"
              handleSubmit={handleFormSubmit}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
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
