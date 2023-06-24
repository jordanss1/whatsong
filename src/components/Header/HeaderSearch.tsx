import { ReactElement } from "react";
import { motion, useMotionValue } from "framer-motion";
import LandingCircles from "../landing/LandingCircles";
import "./styles/header.css";

const HeaderSearch = (): ReactElement => {
  const x = useMotionValue(0);

  const color = useMotionValue("rgba(30, 215, 96)");

  x.on("change", (latest) => {
    if (Math.round(latest) >= 45) {
      color.set("rgba(30, 215, 96)");
    } else {
      color.set("rgba(30, 215, 96, 0.5)");
    }
  });

  return (
    <motion.div
      initial={{ y: -75, x: 0 }}
      animate={{
        transition: { delay: 1, duration: 1 },
        transitionEnd: { y: 0, x: 0 },
      }}
      className="d-flex listNavbar"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1.2,
            duration: 1,
          },
          transitionEnd: { opacity: 1 },
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
            delay: 0.5,
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
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
        className="d-flex align-items-end ps-2 pe-2 pb-3 listSpotify"
      >
        <h2 className="fs-6 me-2 mt-3 poweredList text-lowercase">
          powered by
        </h2>
        <motion.i
          style={{ color }}
          className="spotify icon mb-1 pe-1 spotifyIconList"
        ></motion.i>
      </motion.div>
      <LandingCircles x={x} containerStyle={{ bottom: 0, right: "50px" }} />
    </motion.div>
  );
};

export default HeaderSearch;
