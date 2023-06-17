import { memo, ReactElement } from "react";
import { TopTracksDetailsType } from "../../types";
import { HandleSelectedSongType } from "./SongList";
import "./styles/song-list.css";

type PropTypes = {
  song: Required<TopTracksDetailsType>;
  hidden: boolean;
  handleSelectedSong: HandleSelectedSongType;
};

const SongListItem = ({
  song,
  hidden,
  handleSelectedSong,
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
            onClick={() => handleSelectedSong(song)}
            className="ui button"
          >
            Details
          </div>
          <div
            onClick={() => window.open(song.external_urls.spotify, "_blank")}
            className="ui button listen-button"
            title={song.external_urls.spotify}
          >
            Listen
          </div>
        </div>
        {song.album?.images[2]?.url ? (
          <img className="ui avatar image" src={song.album?.images[2].url} />
        ) : (
          <div className="ui avatar image">
            <h6>No album image</h6>
          </div>
        )}
        <h3 className="content fs-4 pt-1">{`${song.artists[0]?.name} - ${song.name}`}</h3>
      </div>
    </div>
  );
};

export default memo(SongListItem);
