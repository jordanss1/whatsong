import { ReactElement } from "react";
import "./styles/track-list.css";

const TrackListSelectedNone = (): ReactElement => {
  return (
    <h2 className="ui header noSongHeader">
      <p className="mb-0">Search spotify songs</p>
      <div className="sub header">
        <p>
          Selected <b>details</b> will appear here
        </p>
      </div>
    </h2>
  );
};

export default TrackListSelectedNone;
