import { ReactElement, useState, useEffect } from "react";
import HeaderLanding from "./HeaderLanding";
import HeaderSearch from "./HeaderSearch";
import {
  AnimatePresence,
  useMotionValue,
  motion,
  Variants,
  MotionValue,
  useTransform,
} from "framer-motion";
import "./styles/header.css";
import "../../styles/all.css";

const containerVarients: Variants = {
  initial: (path) => ({ opacity: path === "/" ? 1 : 0 }),
  animate: (path) => ({
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: path === "/" ? 0 : 1,
    },
  }),
  exit: (path) => ({
    y: -300,
    transition: {
      duration: path === "/" ? 1 : 0.5,
      delay: path === "/" ? 1.3 : 0,
    },
  }),
};

type HeaderPropsType = {
  path: string;
  scrollY?: MotionValue<number>;
};

const Header = ({ path, scrollY }: HeaderPropsType): ReactElement => {
  const containerClass = path === "/" ? "header-landing" : "header-search";
  // const background = useTransform(scrollY, [])

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
          {path === "/" && <HeaderLanding key="landing" />}
          {(path === "/artists" || path === "/tracks") && scrollY && (
            <HeaderSearch scrollY={scrollY} key="search" />
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
