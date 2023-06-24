import { useContext, useEffect, useRef, ReactElement } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { motion } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import MainSearchForm from "./MainSearchForm";
import "./styles/main-search.css";

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
  } = useContext<UseSearchStateContext>(SearchContext);

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

  const handleButtonClick: HandleButtonClickType = (category, term) => {
    searchType.current = category;
    setSubmittedTerm(term);
    sessionStorage.clear();
  };

  return (
    <motion.main
      initial={{ x: -200 }}
      animate={{ x: 0 }}
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
