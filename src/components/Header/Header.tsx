import { ReactElement, useState, useEffect } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import { AnimatePresence, useMotionValue, motion } from "framer-motion";
import "./styles/header.css";
import "../../styles/all.css";

const Header = ({ path }: { path: string }): ReactElement => {
  const containerClass = path === "/" ? "header-landing" : "header-search";

  const y = useMotionValue(0);
  const position = useMotionValue("");

  return (
    <>
      <motion.header
        style={{ position }}
        className={`${containerClass} d-grid justify-content-center`}
      >
        <AnimatePresence mode="sync">
          {path === "/" ? (
            <HeaderLanding y={y} key="landing1" />
          ) : (
            <HeaderSearch key="search1" />
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
