import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { motion, useCycle } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import "./styles/landing.css";
import LandingScroll from "./LandingScroll";
import LandingButton from "./LandingButton";
import LandingPowered from "./LandingPowered";
import LandingCircles from "./LandingCircles";

const Landing = (): ReactElement => {
  const { navigate } = useContext<UseSearchStateContext>(SearchContext);

  return (
    <motion.main className="landing-main">
      <div className="landing-content d-flex flex-column justify-content-center align-items-center">
        <LandingPowered />
        <div className="flex-grow-1 d-flex flex-column justify-content-end pb-5 gap-5">
          <LandingButton />
          <LandingScroll />
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
