import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import SearchContext from "../../contexts/SearchStore";
import { motion } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/SearchState";
import "./styles/landing.css";
import LandingScroll from "./LandingScroll";

const Landing = (): ReactElement => {
  const { navigate } = useContext<UseSearchStateContext>(SearchContext);

  const hover = useRef<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current as number);
    };
  }, []);

  const handleClick = (): void => {
    timeoutId.current = setTimeout(() => {
      navigate("/search");
    }, 1000);
  };

  const handleHover = (): void => {};

  return (
    <motion.main className="landing-main">
      <div className="landing-content d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-grow-1 w-100 align-items-center">
          <div className="d-flex h-100 border rounded-3 p-5 pt-3 pb-3 spotify-div">
            <h2 className="fs-5 me-2 mt-2 powered">Powered by</h2>
            <i className="spotify icon fs-1 spotify-nav"></i>
          </div>
        </div>
        <div className="d-flex flex-grow-1 flex-column w-100 align-items-center justify-content-center gap-4 ">
          <div className="d-flex h-100 justify-content-center h-100 align-items-end flex-grow-1">
            <button
              onMouseEnter={() => handleHover()}
              onMouseLeave={() => handleHover()}
              onClick={() => handleClick()}
              type="button"
              className="btn btn-outline-dark fs-4 rounded-pill p-3 px-4 start-button"
            >
              Start searching
            </button>
          </div>
          <LandingScroll />
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
