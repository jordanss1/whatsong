import { ReactElement, useEffect, useContext, useCallback } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import { AnimatePresence, useCycle } from "framer-motion";
import "./styles/header.css";
import "../../styles/all.css";
import SearchContext from "../../contexts/searchContext/SearchState";

type HeaderPropsType = {
  headerCycle?: string;
};

const Header = ({ headerCycle }: HeaderPropsType): ReactElement => {
  const { setModal, location, modal } = useContext(SearchContext);

  const [searchCycle, cycleSearch] = useCycle(false, true);

  const handleClick = useCallback((exit?: boolean) => {
    if (exit) {
      setModal(false);
      cycleSearch(0);
    } else {
      cycleSearch(searchCycle ? 0 : 1);
      setModal((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    if (!modal) cycleSearch(0);
  }, [modal]);

  useEffect(() => {
    if (headerCycle === "transparent") cycleSearch(0);
  }, [headerCycle]);

  return (
    <AnimatePresence mode="sync" onExitComplete={() => handleClick(true)}>
      {location === "/" && <HeaderLanding key="landing" />}
      {(location === "/artists" || location === "/tracks") && headerCycle && (
        <HeaderSearch
          key="search"
          headerCycle={headerCycle}
          searchCycle={searchCycle}
          handleClick={handleClick}
        />
      )}
    </AnimatePresence>
  );
};

export default Header;
