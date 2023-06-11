import { ReactNode, ReactElement } from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const SearchListContainer = ({
  isArtists,
  searchResults,
  children,
}: {
  isArtists: boolean;
  searchResults: boolean;
  children?: ReactNode;
}): ReactElement => {
  const divClasses = (): string => {
    if (isArtists) {
      return searchResults ? "" : "noResultsSearch";
    } else {
      return searchResults
        ? `w-100 whole-songs-container d-grid`
        : "w-100 d-flex flex-column align-items-center justify-content-between justify-content-center pt-4 noResultsSong";
    }
  };

  if (isArtists) {
    return (
      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="w-100 h-100 d-flex artist-list-results-container"
      >
        <div className="artist-list-results d-grid h-100 p-4">
          <div className="align-items-center justify-content-center search-list-div border rounded-3">
            <h2 className="ms-4 fs-3 pt-1 typeHeader">Artists</h2>
            <SearchBar />
          </div>
          {children}
        </div>
      </motion.section>
    );
  } else {
    return (
      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className={divClasses()}
      >
        {children}
      </motion.section>
    );
  }
};

export default SearchListContainer;
