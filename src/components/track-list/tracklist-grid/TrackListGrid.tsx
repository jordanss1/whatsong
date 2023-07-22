import { MutableRefObject, ReactElement, memo } from "react";
import TrackListGridTrack from "./TrackListGridTrack";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleSelectedTrackType } from "../TrackList";
import "../styles/track-list.css";

type TrackListGridSelectedProps = {
  searched: boolean;
  tracks: Required<TopTracksDetailsType>[];
  handleSelectedTrack: HandleSelectedTrackType;
  dragRef: MutableRefObject<null>;
};

const TrackListGrid = ({
  searched,
  tracks,
  handleSelectedTrack,
  dragRef,
}: TrackListGridSelectedProps): ReactElement => {
  return (
    <div className="d-grid pb-5 w-100 track-list-grid">
      {tracks.map((track, i) => {
        return (
          <TrackListGridTrack
            key={i}
            searched={searched}
            index={i}
            track={track}
            handleSelectedTrack={handleSelectedTrack}
            dragRef={dragRef}
          />
        );
      })}
    </div>
  );
};

export default memo(TrackListGrid);
