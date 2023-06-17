import { ReactElement } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./Landing";
import MainSearch from "./main-search/MainSearch";
import SearchList from "./SearchList";
import { AnimatePresence } from "framer-motion";
import ArtistDetails from "./artist-details/ArtistDetails";
import Header from "./Header/Header";

const App = (): ReactElement => {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <>
      {location.pathname !== "/artists/:id" && (
        <Header path={location.pathname} />
      )}
      <AnimatePresence initial={false} mode="wait">
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
