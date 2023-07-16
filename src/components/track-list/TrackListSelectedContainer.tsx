import { ReactElement } from "react";
import { motion } from "framer-motion";
import { TopTracksDetailsType } from "../../types";
import TrackListSelectedTrack from "./TrackListSelectedTrack";
import TrackListSelectedNone from "./TrackListSelectedNone";
import "./styles/track-list.css";
import { HandleSelectedTrackType } from "./TrackList";

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
      layout
      className={`selectedDiv d-flex align-items-center ${
        selectedTrack ? "flex-column" : ""
      } justify-content-evenly`}
    >
      {selectedTrack ? (
        <TrackListSelectedTrack
          selectedTrack={selectedTrack}
          handleSelectedTrack={handleSelectedTrack}
        />
      ) : (
        <TrackListSelectedNone />
      )}
    </motion.div>
  );
};

export default TrackListSelectedContainer;
