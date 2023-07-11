import { ReactElement, useContext } from "react";
import { motion } from "framer-motion";
import "./styles/modal.css";
import SearchContext from "../../contexts/searchContext/SearchState";

const errorVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
    },
  },
};

const ModalError = ({ error }: { error: Error }): ReactElement => {
  const { setArtistsOrTracks } = useContext(SearchContext);

  return (
    <div className="error-container d-flex align-items-center justify-content-center px-5">
      <motion.div
        variants={errorVariants}
        className="error-message d-flex flex-column"
      >
        <h3 className="fw-bold pb-2">{error.name}</h3>
        <span className="pb-3">{error.message}</span>
        <motion.button
          onClick={() => setArtistsOrTracks(undefined, undefined, undefined)}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          whileTap={{ scale: 1 }}
          className="error-button"
        >
          Retry
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ModalError;
