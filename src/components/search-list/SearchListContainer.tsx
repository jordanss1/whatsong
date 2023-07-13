import { ReactNode, ReactElement } from "react";
import SearchBar from "./SearchListSearchBar";
import { motion } from "framer-motion";
import "./styles/search-list.css";

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
      <>
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 h-100 d-flex"
        >
          <div className="artist-list-results d-grid h-100 py-4 px-1">
            <div className="align-items-center justify-content-end d-flex search-input-container">
              <SearchBar />
            </div>
            {children}
          </div>
        </motion.section>
        <div className="filler-div" />
      </>
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
