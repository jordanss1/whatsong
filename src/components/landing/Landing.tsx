import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { motion, useCycle } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import "./styles/landing.css";
import LandingScroll from "./LandingScroll";

const Landing = (): ReactElement => {
  const { navigate } = useContext<UseSearchStateContext>(SearchContext);
  const [xAnimation, cycleAnimation] = useCycle("cycleX", "cycleXFast");

  const handleHover = (): void => {};

  return (
    <motion.main className="landing-main">
      <div className="landing-content d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex align-items-center flex-grow-1">
          <div className="d-flex border rounded-3 p-5 pt-3 pb-3 spotify-div">
            <h2 className="fs-5 me-2 mt-2 powered">Powered by</h2>
            <i className="spotify icon fs-1 spotify-nav"></i>
          </div>
        </div>
        <div className="flex-grow-1 d-flex flex-column justify-content-end pb-5 gap-5">
          <div className="d-flex justify-content-center align-items-end ">
            <button
              onMouseEnter={() => handleHover()}
              onMouseLeave={() => handleHover()}
              type="button"
              className="btn btn-outline-dark fs-4 rounded-pill p-3 px-4 start-button"
            >
              Start searching
            </button>
          </div>
          <LandingScroll cycleAnimation={cycleAnimation} xAnimation={xAnimation} />
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
