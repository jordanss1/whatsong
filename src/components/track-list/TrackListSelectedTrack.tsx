import { ReactElement, useCallback } from "react";
import { motion } from "framer-motion";
import { TopTracksDetailsType } from "../../types";
import "./styles/track-list.css";
import { HandleSelectedTrackType } from "./TrackList";

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
        <i
          data-testid="x-icon"
          onClick={() => handleSelectedTrack()}
          className="window close outline icon iconRed fs-4"
        />
      </motion.div>
      <motion.div
        layout
        className="d-flex flex-column ms-0 mb-5 songItem w-100 justify-content-evenly"
      >
        {album.images[1].url ? (
          <img className="rounded" src={album.images[1].url} />
        ) : (
          <h3>No album cover</h3>
        )}
        <div className="ui items mt-0 description">
          <div className="item">
            <ul className="content d-flex flex-column justify-content-start  align-content-center contentDescription">
              <li className=" text-center">{`${name} by ${artists[0].name}`}</li>
              <li className="text-center">{`${
                album.album_type === "single" ? "Single:" : "Album:"
              } ${album.name}`}</li>
              <div className="text-center ">
                <li className="">{`Track ${track_number} of ${album.total_tracks}`}</li>
              </div>
              <li className="text-center mt-0">Duration {durationConvert()}</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TrackListSelectedTrack;
