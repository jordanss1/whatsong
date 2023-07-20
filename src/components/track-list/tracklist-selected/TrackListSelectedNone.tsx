import { ReactElement } from "react";
import "../styles/track-list.css";

const TrackListSelectedNone = (): ReactElement => {
  return (
    <div className="no-selected-song">
      <p className="mb-0">Drag a song here</p>
      <div className="">
        <i className="frown outline icon face-icon" />
      </div>
    </div>
  );
};

export default TrackListSelectedNone;
