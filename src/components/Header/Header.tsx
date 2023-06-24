import { ReactElement, useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import { FramerContext } from "../../contexts/framerContext/FramerState";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import "./styles/header.css";
import "../../styles/all.css";
import { AnimatePresence } from "framer-motion";

const Header = ({ path }: { path: string }): ReactElement => {
  const { setTerm } = useContext<UseSearchStateContext>(SearchContext);
  const { headerCycle } = useContext(FramerContext);

  const linkPath = path === "/" ? "" : "/search";

  return (
    <>
      <header className="navClass d-flex justify-content-center">
        <NavLink
          style={{ cursor: linkPath === "" ? "default" : "pointer" }}
          onClick={
            linkPath === ""
              ? () => {}
              : () => {
                  setTerm("");
                }
          }
          className="text-uppercase"
          to={linkPath}
        >
          <AnimatePresence mode="sync">
            {path === "/" ? (
              <HeaderLanding key="landing1" />
            ) : (
              <HeaderSearch key="search1" />
            )}
          </AnimatePresence>
        </NavLink>
      </header>
    </>
  );
};

export default Header;
