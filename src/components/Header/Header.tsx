import { ReactElement, useState, useEffect } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import {
  AnimatePresence,
  useMotionValue,
  motion,
  Variants,
} from "framer-motion";
import "./styles/header.css";
import "../../styles/all.css";

const containerVarients: Variants = {
  initial: (path) => ({ y: path === "/" ? 0 : -300 }),
  animate: {
    y: 0,
    transition: {
      duration: 1,
    },
  },
  exit: (path) => ({
    y: -300,
    transition: {
      duration: 1,
      delay: path === "/" ? 1.3 : 0 ,
    },
  }),
};

const Header = ({ path }: { path: string }): ReactElement => {
  const containerClass = path === "/" ? "header-landing" : "header-search";

  return (
    <>
      <motion.header
        custom={path}
        variants={containerVarients}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`${containerClass} d-grid justify-content-center`}
      >
        <AnimatePresence mode="sync">
          {path === "/" ? (
            <HeaderLanding key="landing1" />
          ) : (
            <HeaderSearch key="search1" />
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
