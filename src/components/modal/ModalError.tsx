import { ReactElement } from "react";
import { motion } from "framer-motion";
import "./styles/modal.css";
import { ResetModelOrSpotifyType } from "../../hooks/ArtistsAndTracksHook";

export const errorVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

type ModalErrorPropTypes = {
  error: Error | null;
  handleClick: () => void;
};

const ModalError = ({
  error,
  handleClick,
}: ModalErrorPropTypes): ReactElement => {
  const heading = error ? error.name : "No results found";
  const message = error ? error.message : "Please try to search again";
  const button = error ? "Retry" : "Search again";

  return (
    <div className="error-container d-flex align-items-center justify-content-center px-5">
      <motion.div
        variants={errorVariants}
        className="error-message w-100 d-flex flex-column"
      >
        <h3 className="fw-bold pb-2">{heading}</h3>
        <span className="pb-3">{message}</span>
        <motion.button
          onClick={() => handleClick()}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          whileTap={{ scale: 1 }}
          className="error-button"
        >
          {button}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ModalError;
