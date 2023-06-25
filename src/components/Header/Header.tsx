import { ReactElement } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import "./styles/header.css";
import "../../styles/all.css";
import { AnimatePresence } from "framer-motion";

const Header = ({ path }: { path: string }): ReactElement => {
  const containerClass = path === "/" ? "header-landing" : "header-search";


  return (
    <>
      <header className={`${containerClass} d-grid justify-content-center`}>
        <AnimatePresence mode="sync">
          {path === "/" ? (
            <HeaderLanding key="landing1" />
          ) : (
            <HeaderSearch key="search1" />
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
