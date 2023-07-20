import { ReactElement, useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainSearch from "./main-search/MainSearch";
import ArtistList from "./artist-list/ArtistList";
import ArtistDetails from "./artist-details/ArtistDetails";
import Modal from "./modal/Modal";
import Landing from "./landing/Landing";
import SearchContext from "../contexts/searchContext/SearchState";
import TrackList from "./track-list/TrackList";

const App = (): ReactElement => {
  const location = useLocation();

  const { error, loading, noResults, modal } = useContext(SearchContext);

  const showModal = loading || error || noResults || modal;

  return (
    <>
      <AnimatePresence mode="wait">
        {showModal && (
          <Modal
            pathname={location.pathname}
            noResults={noResults}
            error={error}
            loading={loading}
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
