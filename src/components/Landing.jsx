import React, { useEffect, useRef, useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import NavBar from "./NavBar";
import "../styles/all.css";
import { motion } from "framer-motion";

const Landing = () => {
  const { navigate } = useContext(SearchContext);
  const hover = useRef(false);

  const animations = {
    initial: { opacity: 0.5, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 },
  };

  useEffect(() => {
    const nav = document.getElementsByClassName("navClass")[0];
    nav.classList.add("navClassAnimate");
  }, []);

  const handleClick = () => {
    const navBg = document.getElementsByClassName("navClass")[0];
    const wrapper = document.getElementsByClassName("wrapper")[0];

    navBg.classList.remove("navClassAnimate");
    wrapper.classList.add("wrapperLoad");

    setTimeout(() => {
      navigate("search");
    }, 1000);
  };

  const handleHover = () => {
    const spotifyDiv = document.getElementsByClassName("spotifyDiv")[0];
    const icon = document.getElementsByClassName("spotifyNav")[0];
    const text = document.getElementsByClassName("powered")[0];
    const navBg = document.getElementsByClassName("navClass")[0];

    hover.current = !hover.current;

    if (hover.current) {
      spotifyDiv.classList.add("spotifyLoad");
      icon.classList.add("spotifyHover");
      text.classList.add("poweredHover");
      navBg.classList.remove("navClassAnimate");
    } else if (!hover.current) {
      navBg.classList.add("navClassAnimate");
    }
  };

  const content = () => {
    return (
      <>
        w<span className="me-1 pt-2 extraText fs-5">.hat</span>s
        <span className="ms-2 extraText fs-5">.ong</span>
      </>
    );
  };

  return (
    <motion.main
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className="landingContainer d-flex flex-column"
    >
      <NavBar content={content} />
      <div className="wrapper h-100">
        <div className="d-flex h-100 justify-content-center align-items-center flex-column-reverse mainDiv">
          <button
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
            onClick={() => handleClick()}
            type="button"
            className="btn btn-outline-dark fs-4 rounded-pill p-3 px-5 startButton"
          >
            Get started!
          </button>
          <div data-testid="div-powered" className="d-flex border rounded-3 p-5 pt-3 pb-3 spotifyDiv">
            <h2 className="fs-5 me-2 mt-2 powered">Powered by</h2>
            <i className="spotify icon fs-1 spotifyNav"></i>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
