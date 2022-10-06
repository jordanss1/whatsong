import React, { useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import { motion } from "framer-motion";

const SelectedItem = () => {
  const { selectedItem, setSelectedItem, typeString } =
    useContext(SearchContext);

  const classFlex = selectedItem ? "flex-column" : "";

  const durationConvert = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  const renderSong = () => {
    if (!selectedItem) {
      return (
        <div
          className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-evenly`}
        >
          <h2 className="ui header noSongHeader ps-1 mb-5">
            Search spotify songs
            <div className="sub header">
              Selected <b>details</b> will appear here
            </div>
          </h2>
        </div>
      );
    } else {
      const { album, artists, duration_ms, name, track_number } = selectedItem;
      return (
        <div
          className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-evenly`}
        >
          <div className="w-100 d-flex justify-content-end align-items-center mt-2">
            <i
              onClick={() => setSelectedItem(null)}
              className="window close outline icon iconRed fs-4"
            ></i>
          </div>
          <div className="d-flex flex-column ms-0 mb-5 songItem justify-content-evenly">
            <img className="rounded" src={album.images[1].url} />
            <div className="ui items mt-0 description">
              <div className="item">
                <ul className="content d-flex flex-column justify-content-start justify-content-evenly align-content-center contentDescription">
                  <li className=" text-center">{`${name} by ${artists[0].name}`}</li>
                  <li className="text-center">{`${
                    album.album_type === "single" ? "Single:" : "Album:"
                  } ${album.name}`}</li>
                  <div className="text-center ">
                    <li className="">{`Track ${track_number} of ${album.total_tracks}`}</li>
                  </div>
                  <li className="text-center mt-0">
                    Duration {durationConvert(duration_ms)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderArtist = () => {
    return (
      <main className="artistPage">
        <h2>Artist</h2>
      </main>
    );
  };

  return <>{typeString === "track" ? renderSong() : renderArtist()}</>;
};

export default SelectedItem;
