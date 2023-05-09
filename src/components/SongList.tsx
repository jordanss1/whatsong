import React, { memo } from "react";
import SearchBar from "./SearchBar";
import { TopTracksDetailsType } from "../types";
import { HandleSelectedSongType } from "./SearchList";

const SongList = ({
  tracks,
  handleSelectedSong,
}: {
  tracks: Required<TopTracksDetailsType>[];
  handleSelectedSong: HandleSelectedSongType;
}) => {
  const hidden = window.innerWidth < 992 ? true : false;

  return (
    <div className="d-grid pt-1 mt-3 mt-xl-0 songListContainer">
      <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row searchListDiv align-self-lg-end border rounded-3">
        <h2 className="ms-4 fs-3 pt-1 typeHeader">Songs</h2>
        <SearchBar />
      </div>
      <div className="d-grid  songListGrid">
        {tracks.map((song, i) => {
          return (
            <div
              key={i}
              role="song-item"
              className="ui middle aligned selection divided list d-flex justify-content-center trackItemContainer"
            >
              <div className="item trackItem border rounded-3 p-3">
                <div className="right floated content d-flex align-items-center">
                  <div
                    hidden={hidden}
                    onClick={() => handleSelectedSong(song)}
                    className="ui button"
                  >
                    Details
                  </div>
                  <div
                    onClick={() =>
                      window.open(song.external_urls.spotify, "_blank")
                    }
                    className="ui button"
                    title={song.external_urls.spotify}
                  >
                    Listen
                  </div>
                </div>
                {song.album?.images[2]?.url ? (
                  <img
                    className="ui avatar image"
                    src={song.album?.images[2].url}
                  />
                ) : (
                  <div className="ui avatar image">
                    <h6>No album image</h6>
                  </div>
                )}
                <h3
                  key={i + 1}
                  className="content fs-4 pt-1"
                >{`${song.artists[0]?.name} - ${song.name}`}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(SongList);
