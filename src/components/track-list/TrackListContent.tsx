import { ReactElement, memo } from "react";
import SearchBar from "../searchbar/SearchBar";
import TrackListContentTrack from "./TrackListContentTrack";
import { TopTracksDetailsType } from "../../types";
import "./styles/track-list.css";
import { HandleSelectedTrackType } from "./TrackList";

type TrackListContentSelectedProps = {
  tracks: Required<TopTracksDetailsType>[] | null;
  handleSelectedTrack: HandleSelectedTrackType;
  is900: boolean;
};

const TrackListContent = ({
  tracks,
  handleSelectedTrack,
  is900,
}: TrackListContentSelectedProps): ReactElement => {
  return (
    <div className="track-list-container">
      <div className="d-flex align-items-center justify-content-end search-list-div">
        <SearchBar />
      </div>
      <div className="d-grid pb-5">
        {tracks &&
          tracks.map((track, i) => {
            return (
              <TrackListContentTrack
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

export default memo(TrackListContent);
