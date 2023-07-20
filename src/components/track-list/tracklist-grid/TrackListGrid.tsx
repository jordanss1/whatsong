import { ReactElement, memo } from "react";
import TrackListGridTrack from "./TrackListGridTrack";
import { TopTracksDetailsType } from "../../../types";
import { HandleSelectedTrackType } from "../TrackList";
import { motion } from "framer-motion";
import "../styles/track-list.css";

type TrackListGridSelectedProps = {
  tracks: Required<TopTracksDetailsType>[] | null;
  handleSelectedTrack: HandleSelectedTrackType;
  is900: boolean;
};

const TrackListGrid = ({
  tracks,
  handleSelectedTrack,
  is900,
}: TrackListGridSelectedProps): ReactElement => {
  return (
    <motion.div className="d-grid pb-5 w-100 track-list-grid">
      {tracks &&
        tracks.map((track, i) => {
          return (
            <TrackListGridTrack
              key={i}
              index={i}
              track={track}
              hidden={is900}
              handleSelectedTrack={handleSelectedTrack}
            />
          );
        })}
    </motion.div>
  );
};

export default memo(TrackListGrid);
