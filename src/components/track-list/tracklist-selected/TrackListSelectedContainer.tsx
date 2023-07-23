import { ReactElement } from "react";
import { Variants, motion } from "framer-motion";
import { TopTracksDetailsType } from "../../../types/types";
import TrackListSelectedTrack from "./TrackListSelectedTrack";
import TrackListSelectedNone from "./TrackListSelectedNone";
import "../styles/track-list.css";
import { HandleSelectedTrackType } from "../TrackList";

const selectedContainerVariant: Variants = {
  initial: {
    opacity: 0,
    x: -150,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    x: -150,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

type TrackListSelectedProps = {
  selectedTrack: Required<TopTracksDetailsType> | null;
  handleSelectedTrack: HandleSelectedTrackType;
};

const TrackListSelectedContainer = ({
  selectedTrack,
  handleSelectedTrack,
}: TrackListSelectedProps): ReactElement => {
  return (
    <motion.div
      variants={selectedContainerVariant}
      layout
      className="selected-container"
    >
      <motion.div
        className={`selected-inner d-flex align-items-center flex-column justify-content-evenly`}
      >
        {selectedTrack ? (
          <TrackListSelectedTrack
            selectedTrack={selectedTrack}
            handleSelectedTrack={handleSelectedTrack}
          />
        ) : (
          <TrackListSelectedNone dragging={false} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default TrackListSelectedContainer;