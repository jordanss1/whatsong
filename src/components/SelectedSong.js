import React, { useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import "../styles/body.css";

const SelectedSong = () => {
  const { selectedSong } = useContext(SearchContext);

  const renderSong = () => {
    if (!selectedSong) {
      return (
        <h2 className="ui header noSongHeader ps-2 mb-5">
          Search spotify music
          <div className="sub header">Selected track info will appear here</div>
        </h2>
      );
    }
  };

  return <div>{renderSong()}</div>;
};

export default SelectedSong;
