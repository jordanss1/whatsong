import React from "react";
import { motion } from "framer-motion";

const MainSearchInput = () => {
  return (
    <form className="form-container d-flex justify-content-center w-100 h-50 flex-grow-1">
      <motion.div className="input-container w-100 d-flex align-items-center justify-content-center">
        <div className="main-input">
          <input type="text" />
        </div>
      </motion.div>
    </form>
  );
};

export default MainSearchInput;
