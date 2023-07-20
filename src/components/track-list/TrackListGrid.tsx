import { ReactElement, memo } from "react";
import TrackListGridTrack from "./TrackListGridTrack";
import { TopTracksDetailsType } from "../../types";
import { HandleSelectedTrackType } from "./TrackList";
import TrackListGridSearchBar from "./TrackListGridSearchBar";
import "./styles/track-list.css";

type TrackListGridSelectedProps = {
  tracks: Required<TopTracksDetailsType>[] | null;
  handleSelectedTrack: HandleSelectedTrackType;
  is900: boolean;
  cycle: string;
};

const TrackListGrid = ({
  tracks,
  handleSelectedTrack,
  is900,
  cycle,
}: TrackListGridSelectedProps): ReactElement => {
  return (
    <div className="track-list-container">
      <TrackListGridSearchBar cycle={cycle} />
      <div className="d-grid pb-5">
        {tracks &&
          tracks.map((track, i) => {
            return (
              <TrackListGridTrack
                key={i}
                track={track}
                hidden={is900}
                handleSelectedTrack={handleSelectedTrack}
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(TrackListGrid);
