import { ReactElement, useContext } from "react";
import ModalLoader from "./ModalLoader";
import ModalError from "./ModalError";
import SearchContext from "../../contexts/SearchState";
import "./styles/modal.css";
import { AnimatePresence, Variants, motion } from "framer-motion";

type ModalPropsType = {
  error: Error | null;
  loading: boolean;
  popout: boolean;
  noResults: boolean | null;
  pathname: string;
};

const errorVariants: Variants = {
  hidden: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  visible: (error) => ({
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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

const popoutVariants: Variants = {
  hidden: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 3,
  },
  visible: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 3,
    transition: {
      delay: 0,
      duration: 0.3,
    },
  },
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: {
      duration: 0.2,
    },
  },
};

const Modal = ({
  error,
  loading,
  popout,
  noResults,
  pathname,
}: ModalPropsType): ReactElement => {
  const {
    resetModalOrSpotify,
    emptyProfile,
    setArtistsOrTracks,
    setModal,
    setPopout,
    setSelectedTrack,
  } = useContext(SearchContext);

  const zIndex = error || noResults ? 4 : 3;

  const handleClick = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e && e.target !== e.currentTarget) || loading) return;

    if (popout) {
      const key =
        pathname === "/artists" ? "artists-visited" : "tracks-visited";
      localStorage.setItem(key, key);
      setPopout(false);
      return;
    }

    const artists = sessionStorage.getItem("artists");
    const tracks = sessionStorage.getItem("tracks");

    emptyProfile();
    resetModalOrSpotify("modal");
    setModal(false);

    if (pathname === "/artists" && artists) {
      setArtistsOrTracks(JSON.parse(artists));
    }

    if (pathname !== "/tracks" && tracks) {
      setArtistsOrTracks(JSON.parse(tracks));
      setSelectedTrack(null);
    }
  };

  return (
    <motion.div
      custom={error}
      variants={popout ? popoutVariants : errorVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ zIndex }}
      className="modal-background w-100"
      onClick={(e) => handleClick(e)}
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
