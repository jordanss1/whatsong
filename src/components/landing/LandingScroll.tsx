import { ReactElement, memo } from "react";
import { motion } from "framer-motion";
import SVGFramer from "./LandingSVGFramer";
import SVGReact from "./LandingSVGReact";
import SVGReactRouter from "./LandingSVGReactRouter";
import SVGTypeScript from "./LandingSVGTypeScript";
import "./styles/landing.css";

const LandingScroll = (): ReactElement => {
  return (
    <motion.div
      whileHover={{ scale: [null, 1.1] }}
      className="ribbon-div w-100 d-flex justify-content-center"
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
