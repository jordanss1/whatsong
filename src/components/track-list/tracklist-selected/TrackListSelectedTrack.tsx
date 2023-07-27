import { ReactElement } from "react";
import { motion, Variants } from "framer-motion";
import Exit from "../../Exit";
import TrackDetail from "../../TrackDetail";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleSelectedTrackType } from "../TrackList";
import "../styles/track-list.css";

type TrackListSelectedProps = {
  selectedTrack: Required<TopTracksDetailsType>;
  handleSelectedTrack: HandleSelectedTrackType;
};

const exitVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1,
  },
};

const imageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -50,
    boxShadow: "0px 0px 2px 1px rgba(222, 90, 174, 0)",
  },
  animate: (albumImage) => ({
    opacity: 1,
    x: 0,
    boxShadow: albumImage && "0px 0px 20px 1px rgba(222, 90, 174, .7)",
    transition: {
      duration: 0.3,
      delay: 0.7,
      boxShadow: {
        duration: 0.3,
        delay: 0.3,
      },
    },
  }),
  exit: {
    opacity: 0,
    x: -50,
    boxShadow: "0px 0px 2px 1px rgba(222, 90, 174, 0)",
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  hover: (albumImage) => ({
    boxShadow: albumImage && [null, "0px 0px 30px 3px rgba(222, 90, 174, .7)"],
    scale: 1.05,
  }),
};

const lineVariants: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: (order) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.7 + order,
    },
  }),
  exit: (order) => ({
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.2,
      delay: 0.1 + order,
    },
  }),
};

const TrackListSelectedTrack = ({
  selectedTrack,
  handleSelectedTrack,
}: TrackListSelectedProps): ReactElement => {
  return (
    <>
      <motion.div
        variants={exitVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-100 d-flex justify-content-end align-items-center pt-4 pb-2"
      >
        <Exit size={3} handleClick={() => handleSelectedTrack()} />
      </motion.div>
      <TrackDetail
        selectedTrack={selectedTrack}
        lineVariants={lineVariants}
        imageVariants={imageVariants}
      />
    </>
  );
};

export default TrackListSelectedTrack;
