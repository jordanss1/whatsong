import { ReactElement, useContext, useEffect } from "react";
import { MotionValue, motion, useMotionValue } from "framer-motion";
import { NavLink } from "react-router-dom";
import LandingCircles from "../landing/LandingCircles";
import "./styles/header.css";
import SearchContext from "../../contexts/searchContext/SearchState";

const HeaderSearch = (): ReactElement => {
  const { setTerm } = useContext(SearchContext);
  const x = useMotionValue(0);
  const opacity = useMotionValue(0);

  const color = useMotionValue("rgba(30, 215, 96)");

  x.on("change", (latest) => {
    if (Math.round(latest) >= 45) {
      color.set("rgba(30, 215, 96)");
    } else {
      color.set("rgba(30, 215, 96, 0.5)");
    }
  });

  return (
    <NavLink
      onClick={() => setTerm("")}
      className="text-uppercase text-decoration-none"
      to={"/search"}
    >
      <motion.div className="d-flex listNavbar px-5">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1.5,
              duration: 0.5,
            },
          }}
          className="text-lowercase"
        >
          <span className="w">w.</span>
          <span className="pink me-2">s</span>
        </motion.div>
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1.5,
              duration: 0.5,
            },
          }}
          className="underScore ms-1"
        >
          _
        </motion.span>
        <motion.div
          initial={{
            opacity: 0,
            x: 300,
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              delay: 1,
              duration: 0.5,
            },
          }}
          className="d-flex align-items-end ps-2 pb-3 listSpotify"
        >
          <h2 className="fs-6 me-2 mt-3 poweredList text-lowercase">
            powered by
          </h2>
          <motion.i
            style={{ color }}
            className="spotify icon mb-1 pe-1 spotifyIconList"
          ></motion.i>
        </motion.div>
        <LandingCircles x={x} containerStyle={{ bottom: 0, right: "45px" }} />
      </motion.div>
    </NavLink>
  );
};

export default HeaderSearch;
