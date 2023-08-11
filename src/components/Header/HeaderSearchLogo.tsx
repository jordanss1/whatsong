import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";
import LandingCircles from "../landing/LandingCircles";
import { useMediaQuery } from "../../hooks/MediaQueryHook";

const HeaderSearchLogo = (): ReactElement => {
  const is468 = useMediaQuery(468);

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
    <NavLink className="text-uppercase text-decoration-none" to={"/search"}>
      <motion.div
        style={{ scale: is468 ? 0.8 : 0.9, maxWidth: is468 ? 240 : 260 }}
        whileHover={{ scale: is468 ? 0.85 : 0.95 }}
        className="d-flex listNavbar"
        data-testid="header-search"
        layout
      >
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
        </motion.div>
        <motion.i
          initial={{ y: 30 }}
          animate={{ y: 30 }}
          style={{ color }}
          className="spotify icon mb-1 pe-1 spotifyIconList"
        ></motion.i>
        <LandingCircles x={x} containerStyle={{ bottom: 0, right: "45px" }} />
      </motion.div>
    </NavLink>
  );
};

export default HeaderSearchLogo;
