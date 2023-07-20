import { memo, ReactElement } from "react";
import { TopTracksDetailsType } from "../../types";
import { HandleSelectedTrackType } from "./TrackList";
import "./styles/track-list.css";

type PropTypes = {
  track: Required<TopTracksDetailsType>;
  hidden: boolean;
  handleSelectedTrack: HandleSelectedTrackType;
};

const TrackListGridTrack = ({
  track,
  hidden,
  handleSelectedTrack,
}: PropTypes): ReactElement => {
  return (
    <div
      role="song-item"
      className="ui middle aligned selection divided list d-flex justify-content-center w-100"
    >
      <div className="item trackItem border rounded-3 p-3">
        <div className="right floated content d-flex align-items-center">
          <div
            hidden={hidden}
            onClick={() => handleSelectedTrack(track)}
            className="ui button"
          >
            Details
          </div>
          <div
            onClick={() => window.open(track.external_urls.spotify, "_blank")}
            className="ui button listen-button"
            title={track.external_urls.spotify}
          >
            Listen
          </div>
        </div>
        {track.album?.images[2]?.url ? (
          <img className="ui avatar image" src={track.album?.images[2].url} />
        ) : (
          <div className="ui avatar image">
            <h6>No album image</h6>
          </div>
        )}
        <h3 className="content fs-4 pt-1">{`${track.artists[0]?.name} - ${track.name}`}</h3>
      </div>
    </div>
  );
};

export default memo(TrackListGridTrack);
