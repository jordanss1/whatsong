import { ReactElement, useEffect, useContext, useCallback } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import { AnimatePresence, useCycle } from "framer-motion";
import SearchContext from "../../contexts/searchContext/SearchState";
import "./styles/header.css";

type HeaderPropsType = {
  headerCycle?: string;
};

const Header = ({ headerCycle }: HeaderPropsType): ReactElement => {
  const { setModal, pathname, modal, searched } = useContext(SearchContext);

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
    if (!searched && headerCycle === "transparent") cycleSearch(0);
  }, [headerCycle, searched]);

  return (
    <AnimatePresence mode="sync" onExitComplete={() => handleClick(true)}>
      {pathname === "/" && <HeaderLanding key="landing" />}
      {(pathname === "/artists" || pathname === "/tracks") && headerCycle && (
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
