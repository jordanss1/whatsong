import { MutableRefObject, ReactElement, memo } from "react";
import TrackListGridItem from "./TrackListGridItem";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleDragType, HandleSelectedTrackType } from "../TrackList";
import "../styles/track-list.css";

type TrackListGridSelectedProps = {
  searched: boolean;
  tracks: Required<TopTracksDetailsType>[];
  handleSelectedTrack: HandleSelectedTrackType;
  dragRef: MutableRefObject<null>;
  handleDrag: HandleDragType;
};

const TrackListGrid = ({
  searched,
  tracks,
  handleSelectedTrack,
  dragRef,
  handleDrag,
}: TrackListGridSelectedProps): ReactElement => {
  return (
    <div className="d-grid pb-5 w-100 track-list-grid">
      {tracks.map((track, i) => {
        return (
          <TrackListGridItem
            key={i}
            searched={searched}
            index={i}
            track={track}
            handleSelectedTrack={handleSelectedTrack}
            dragRef={dragRef}
            handleDrag={handleDrag}
          />
        );
      })}
    </div>
  );
};

export default memo(TrackListGrid);
