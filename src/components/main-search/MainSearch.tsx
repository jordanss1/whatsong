import { useContext, useEffect, useRef, ReactElement } from "react";
import SearchContext from "../../contexts/SearchStore";
import { motion } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/SearchState";
import { SearchAnimateState } from "../../hooks/AnimateStateHooks";
import MainSearchForm from "./MainSearchForm";

export type HandleButtonClickType = (
  category: "artist" | "track",
  term: string
) => void;

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
    animateStateSearch,
    setAnimateStateSearch,
  } = useContext<UseSearchStateContext>(SearchContext);

  const searchType = useRef<string>("");

  const animations = {
    initial: (animateStateSearch: SearchAnimateState) => ({
      ...animateStateSearch.initial,
    }),
    animate: { opacity: 1, y: 0, x: 0 },
    exit: (animateStateSearch: SearchAnimateState) => ({
      ...animateStateSearch.exit,
    }),
  };

  useEffect(() => {
    setFullArtists(null);
    setTracks(null);
    setSelectedSong(null);
    setAnimateStateSearch({ opacity: 0.5, y: 300 }, { opacity: 0, y: 0 });
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

  const handleButtonClick: HandleButtonClickType = (category, term) => {
    const x = category === "artist" ? 300 : -300;

    searchType.current = category;
    setSubmittedTerm(term);
    setAnimateStateSearch({ opacity: 0.5, x }, { opacity: 0, x });
    sessionStorage.clear();
  };

  return (
    <motion.main
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      custom={animateStateSearch}
      className="searchContainer container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <MainSearchForm
        term={term}
        setTerm={setTerm}
        handleButtonClick={handleButtonClick}
      />
    </motion.main>
  );
};

export default MainSearch;
