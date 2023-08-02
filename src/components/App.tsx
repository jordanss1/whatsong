import { ReactElement, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainSearch from "./main-search/MainSearch";
import ArtistList from "./artist-list/ArtistList";
import ArtistDetails from "./artist-details/ArtistDetails";
import Modal from "./modal/Modal";
import Landing from "./landing/Landing";
import SearchContext from "../contexts/SearchState";
import TrackList from "./track-list/TrackList";
import "../styles/all.css";

const App = (): ReactElement => {
  const location = useLocation();

  const { error, loading, noResults, modal, popout } =
    useContext(SearchContext);

  const showModal = loading || error || noResults || modal || popout;

  return (
    <>
      <AnimatePresence mode="wait">
        {showModal && (
          <Modal
            pathname={location.pathname}
            noResults={noResults}
            error={error}
            loading={loading}
            popout={popout}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" key={location.key} element={<Landing />} />
          <Route path="/search" key={location.key} element={<MainSearch />} />
          <Route path="/artists">
            <Route index key={location.key} element={<ArtistList />} />
            <Route
              path="/artists/:id"
              key={location.key}
              element={<ArtistDetails />}
            />
          </Route>
          <Route path="/tracks" key={location.key} element={<TrackList />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
