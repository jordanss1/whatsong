import { ReactElement, useState } from "react";
import { Cycle, motion } from "framer-motion";
import SVGFramer from "../../svgs/SVGFramer";
import SVGReact from "../../svgs/SVGReact";
import SVGReactRouter from "../../svgs/SVGReactRouter";
import SVGTypeScript from "../../svgs/SVGTypeScript";
import "./styles/landing.css";

const LandingScroll = (): ReactElement => {
  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      <motion.div whileHover={{ scale: [null, 1.1] }} className="ribbon-div">
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
    </div>
  );
};

export default LandingScroll;
