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

  const { networkError, loading } = useContext(SearchContext);

  return (
    <>
      <Header path={location.pathname} />
      <AnimatePresence mode="wait">
        {(loading || networkError) && <Modal />}
        <Routes location={location} key={location.pathname}>
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
