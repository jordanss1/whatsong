import { ReactElement, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/searchbar.css";
import Caret from "../Caret";
import Magnifier from "../Magnifier";
import SearchContext from "../../contexts/SearchState";

type SearchButtonPropsTypes = {
  searchTerm?: string;
  size?: number;
  x?: number;
  handleClick?: (exit?: boolean) => void;
};

const SearchButton = ({
  searchTerm,
  size,
  x,
  handleClick,
}: SearchButtonPropsTypes): ReactElement => {
  const { modal } = useContext(SearchContext);
  const [clicked, setClicked] = useState(false);

  size = size ?? 5;
  x = x ?? 0;

  const classes1 =
    searchTerm === undefined ? "search-button-nav" : "search-button";

  useEffect(() => {
    if (!modal && searchTerm === undefined) setClicked(false);
  }, [modal]);

  const newHandleClick = () => {
    if (handleClick) {
      handleClick();
      setClicked((prev) => (prev ? false : true));
    }
    return () => {};
  };

  return (
    <motion.button
      role="searchList-button"
      style={{ x }}
      disabled={searchTerm ? !searchTerm : false}
      type="submit"
      className={classes1}
    >
      <AnimatePresence mode="wait">
        {clicked ? (
          <Caret handleClick={newHandleClick} />
        ) : (
          <Magnifier
            size={size}
            handleClick={newHandleClick}
            searchTerm={searchTerm}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SearchButton;
