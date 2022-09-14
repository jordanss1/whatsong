import React, { useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import "../styles/body.css";

const SelectedSong = () => {
  const { selectedSong, setSelectedSong } = useContext(SearchContext);

  const classFlex = selectedSong ? "flex-column" : "";

  const durationConvert = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  const renderSong = () => {
    if (!selectedSong) {
      return (
        <h2 className="ui header noSongHeader ps-3 mb-5">
          Search spotify songs
          <div className="sub header">
            Selected <b>details</b> will appear here
          </div>
        </h2>
      );
    } else {
      const { album, artists, duration_ms, name, track_number } = selectedSong;
      return (
        <div className="d-flex flex-column ms-2 mb-5 songItem justify-content-evenly">
          <img className="rounded" src={album.images[1].url} />
          <div className="ui items mt-0 description">
            <div className="item">
              <ul className="content d-flex flex-column justify-content-start align-content-center contentDescription">
                <li className="mb-2 text-center">{`${name} by ${artists[0].name}`}</li>
                <br />
                <li className="text-center mb-2">{`${
                  album.album_type === "single" ? "Single:" : "Album:"
                } ${album.name}`}</li>
                <div className="text-center mb-2">
                  <li className="">{`Track ${track_number} of ${album.total_tracks}`}</li>
                </div>
                <li className="text-center mt-0">
                  Duration {durationConvert(duration_ms)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-between`}
    >
      {selectedSong ? (
        <div className="w-100 d-flex justify-content-end align-items-center mt-2">
          <i
            onClick={() => setSelectedSong(null)}
            className="window close outline icon iconRed fs-4"
          ></i>
        </div>
      ) : (
        ""
      )}
      {renderSong()}
    </div>
  );
};

export default SelectedSong;
