import React from "react";
import { Variants, motion } from "framer-motion";
import LandingCircles from "./LandingCircles";

const boxVariants: Variants = {};

const LandingPowered = () => {
  return (
    <div className="d-flex align-items-end flex-grow-1">
      <motion.div className="d-flex border rounded-3 p-5 pt-3 pb-3 spotify-div">
        <h2 className="fs-5 me-2 mt-2 powered">Powered by</h2>
        <i className="spotify icon fs-1 spotify-nav"></i>
        <LandingCircles />
      </motion.div>
    </div>
  );
};

export default LandingPowered;
