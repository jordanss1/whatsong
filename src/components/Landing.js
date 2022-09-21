import React, { useEffect, useRef, useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import NavBar from "./NavBar";
import "../styles/all.css";

const Landing = () => {
  const { navigate, nav, setNav } = useContext(SearchContext);
  const hover = useRef(false);

  const content = () => {
    return (
      <>
        w<span className="me-1 pt-2 extraText fs-5">.hat</span>s
        <span className="ms-2 extraText fs-5">.ong</span>
      </>
    );
  };

  useEffect(() => {
    const navBg = document.getElementsByClassName("navClass")[0];
    const wrapper = document.getElementsByClassName("wrapper")[0];

    if (nav) {
      navBg.classList.remove("navClassAnimate");
      wrapper.classList.add("wrapperLoad");
      const intervalId = setInterval(() => {
        navigate("search");
      }, 1000);

      return () => {
        clearInterval(intervalId);
        setNav(false);
      };
    }
  }, [nav]);

  const handleHover = () => {
    const icon = document.getElementsByClassName("spotify")[0];
    const text = document.getElementsByClassName("powered")[0];
    const navBg = document.getElementsByClassName("navClass")[0];

    hover.current = !hover.current;

    if (hover.current) {
      icon.classList.add("spotifyHover");
      text.classList.add("poweredHover");
      navBg.classList.remove("navClassAnimate");
    } else if (!hover.current) {
      icon.classList.remove("spotifyHover");
      text.classList.remove("poweredHover");
      navBg.classList.add("navClassAnimate");
    }
  };

  useEffect(() => {
    const nav = document.getElementsByClassName("navClass")[0];

    nav.classList.add("navClassAnimate");
  }, []);

  return (
    <main className="landingContainer d-flex flex-column">
      <NavBar content={content} />
      <div className="wrapper h-100">
        <div className="d-flex h-100 justify-content-center align-items-center flex-column-reverse mainDiv">
          <button
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
            onClick={() => setNav(true)}
            type="button"
            className="btn btn-outline-dark fs-4 rounded-pill p-3 px-5 startButton"
          >
            Get started!
          </button>
          <div className="d-flex border rounded-3 p-5 pt-3 pb-3 spotifyDiv">
            <h2 className="fs-5 me-2 mt-2 powered">Powered by</h2>
            <i className="spotify icon fs-1 spotifyNav"></i>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
