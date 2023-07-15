import { ReactElement, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchList from "./search-list/SearchList";
import { AnimatePresence } from "framer-motion";
import ArtistDetails from "./artist-details/ArtistDetails";
import SearchContext from "../contexts/searchContext/SearchState";
import Modal from "./modal/Modal";
import Landing from "./landing/Landing";
import MainSearch from "./main-search/MainSearch";

const App = (): ReactElement => {
  const location = useLocation();

  const { error, loading, noResults } = useContext(SearchContext);

  return (
    <>
      <AnimatePresence mode="wait">
        {(loading || error || noResults) && (
          <Modal noResults={noResults} error={error} loading={loading} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" key={location.key} element={<Landing />} />
          <Route path="/search" key={location.key} element={<MainSearch />} />
          <Route path="/artists">
            <Route index key={location.key} element={<SearchList />} />
            <Route
              path="/artists/:id"
              key={location.key}
              element={<ArtistDetails />}
            />
          </Route>
          <Route path="/songs" key={location.key} element={<SearchList />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
