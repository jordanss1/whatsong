import React from "react";
import { motion } from "framer-motion";
import SVGFramer from "../../svgs/SVGFramer";
import SVGReact from "../../svgs/SVGReact";
import SVGReactRouter from "../../svgs/SVGReactRouter";
import SVGTypeScript from "../../svgs/SVGTypeScript";
import "./styles/landing.css";

const LandingScroll = () => {
  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <div className="ribbon-div">
        <div className="scolling-container d-flex gap-3">
          <div>
            <SVGFramer />
          </div>
          <div>
            <SVGReact />
          </div>
          <div>
            <SVGReactRouter />
          </div>
          <div>
            <SVGTypeScript />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScroll;
