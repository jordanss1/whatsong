import { ReactElement, useCallback } from "react";
import { motion } from "framer-motion";
import Exit from "../../Exit";
import { TopTracksDetailsType } from "../../../types";
import { HandleSelectedTrackType } from "../TrackList";
import "../styles/track-list.css";

type TrackListSelectedProps = {
  selectedTrack: Required<TopTracksDetailsType>;
  handleSelectedTrack: HandleSelectedTrackType;
};

const TrackListSelectedTrack = ({
  selectedTrack,
  handleSelectedTrack,
}: TrackListSelectedProps): ReactElement => {
  const { album, artists, duration_ms, name, track_number } = selectedTrack;

  const durationConvert = useCallback((): string => {
    const seconds = Math.floor((duration_ms / 1000) % 60);
    const minutes = Math.floor((duration_ms / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }, [selectedTrack?.id]);

  return (
    <>
      <motion.div
        layout
        className="w-100 d-flex justify-content-end align-items-center mt-2 pb-3"
      >
        <Exit size={4} handleClick={() => handleSelectedTrack()} />
      </motion.div>
      <motion.div
        layout
        className="d-flex flex-column ms-0 mb-5 song-item w-100 justify-content-evenly"
      >
        {album.images[1].url ? (
          <img className="rounded" src={album.images[1].url} />
        ) : (
          <h3>No album cover</h3>
        )}
      </motion.div>
    </>
  );
};

export default TrackListSelectedTrack;
