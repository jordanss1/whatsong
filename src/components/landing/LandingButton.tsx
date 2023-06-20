import React from "react";
import { Variants, motion } from "framer-motion";

const buttonVariants: Variants = {
  hover: {

    scale: [null, 1.1],
    transition: {
      duration: 0.5,
      type: "spring",
   
    },
  },
};

const LandingButton = () => {
  return (
    <div className="d-flex justify-content-center align-items-end">
      <motion.button
        layout
        variants={buttonVariants}
        whileHover="hover"
        type="button"
        className="fs-4 rounded-pill p-3 px-4 start-button"
      >
        Start searching
      </motion.button>
    </div>
  );
};

export default LandingButton;
