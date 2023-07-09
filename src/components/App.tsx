import { ReactElement, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchList from "./search-list/SearchList";
import { AnimatePresence } from "framer-motion";
import ArtistDetails from "./artist-details/ArtistDetails";
import Header from "./header/Header";
import SearchContext from "../contexts/searchContext/SearchState";
import Modal from "./modal/Modal";
import Landing from "./landing/Landing";
import MainSearch from "./main-search/MainSearch";

const App = (): ReactElement => {
  const location = useLocation();

  const { error, loading } = useContext(SearchContext);

  return (
    <>
      <AnimatePresence>
        {location.pathname !== "/search" &&
          location.pathname !== "artists/:id" && (
            <Header path={location.pathname} />
          )}
      </AnimatePresence>
      {(loading || error) && <Modal error={error} loading={loading} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<MainSearch />} />
          <Route path="/artists">
            <Route index element={<SearchList />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
          </Route>
          <Route path="/songs" element={<SearchList />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
