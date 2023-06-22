import { ReactElement, useState } from "react";
import { AnimatePresence, Cycle, motion } from "framer-motion";
import SVGFramer from "../../svgs/SVGFramer";
import SVGReact from "../../svgs/SVGReact";
import SVGReactRouter from "../../svgs/SVGReactRouter";
import SVGTypeScript from "../../svgs/SVGTypeScript";
import "./styles/landing.css";

const LandingScroll = (): ReactElement => {
  return (
    <motion.div
      exit={{
        opacity: [1, 0, 0],
        x: 300,
        transition: { duration: 5 },
      }}
      whileHover={{ scale: [null, 1.1] }}
      className="ribbon-div"
    >
      <div className="scolling-container d-flex">
        <div className="framer-icon">
          <SVGFramer />
        </div>
        <div className="react-icon">
          <SVGReact />
        </div>
        <div className="router-icon">
          <SVGReactRouter />
        </div>
        <div className="typescript-icon">
          <SVGTypeScript />
        </div>
      </div>
    </motion.div>
  );
};

export default LandingScroll;
