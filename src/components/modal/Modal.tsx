import { ReactElement, useContext } from "react";
import ModalLoader from "./ModalLoader";
import ModalError from "./ModalError";
import SearchContext from "../../contexts/searchContext/SearchState";
import "./styles/modal.css";
import { AnimatePresence, Variants, motion } from "framer-motion";

type ModalPropsType = {
  error: Error | null;
  loading: boolean;
  noResults: boolean | null;
  pathname: string;
};

const backgroundVariants: Variants = {
  hidden: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  visible: (error) => ({
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: {
      delay: error ? 0.2 : 0,
      duration: 0.3,
    },
  }),
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: {
      when: "afterChildren",
      duration: 0.2,
    },
  },
};

const Modal = ({
  error,
  loading,
  noResults,
  pathname,
}: ModalPropsType): ReactElement => {
  const { resetModalOrSpotify, emptyProfile, setArtistsOrTracks } =
    useContext(SearchContext);

  const handleClick = () => {
    const artists = sessionStorage.getItem("artists");
    const tracks = sessionStorage.getItem("tracks");

    emptyProfile();
    resetModalOrSpotify("modal");

    if (pathname === "/artists" && artists) {
      setArtistsOrTracks(JSON.parse(artists));
    }

    if (pathname !== "/search" && tracks) {
      setArtistsOrTracks(JSON.parse(tracks));
    }
  };

  return (
    <motion.div
      custom={error}
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-background w-100"
    >
      <AnimatePresence>{loading && <ModalLoader />}</AnimatePresence>
      <AnimatePresence>
        {(error || noResults) && (
          <ModalError error={error} handleClick={handleClick} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Modal;
