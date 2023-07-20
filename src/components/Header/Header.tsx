import { ReactElement, useEffect, useContext, useCallback } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import { AnimatePresence, useCycle } from "framer-motion";
import "./styles/header.css";
import "../../styles/all.css";
import SearchContext from "../../contexts/searchContext/SearchState";

type HeaderPropsType = {
  path: string;
  headerCycle: string;
};

const Header = ({ path, headerCycle }: HeaderPropsType): ReactElement => {
  const [searchCycle, cycleSearch] = useCycle(false, true);
  const { setModal } = useContext(SearchContext);

  const handleClick = useCallback(
    (exit?: boolean) => {
      if (exit) {
        setModal(false);
        cycleSearch(0);
      } else {
        cycleSearch(searchCycle ? 0 : 1);
        setModal((prev) => !prev);
      }
    },
    [searchCycle, headerCycle]
  );

  useEffect(() => {
    if (headerCycle === "transparent") cycleSearch(0);
  }, [headerCycle]);

  return (
    <AnimatePresence mode="sync">
      {path === "/" && <HeaderLanding key="landing" />}
      {(path === "/artists" || path === "/tracks") && (
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
