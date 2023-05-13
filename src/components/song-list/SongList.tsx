import { memo, useContext, useCallback } from "react";
import SearchBar from "../SearchBar";
import { TopTracksDetailsType } from "../../types";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import SearchContext from "../../contexts/SearchState";
import SongListItem from "./SongListItem";

export type HandleSelectedSongType = (
  track: Required<TopTracksDetailsType>
) => void;

const SongList = ({ tracks }: { tracks: Required<TopTracksDetailsType>[] }) => {
  const { setSelectedSong } = useContext(SearchContext);
  const is900 = useMediaQuery(900);

  const handleSelectedSong = useCallback<HandleSelectedSongType>(
    (track) => {
      setSelectedSong(track);
    },
    [setSelectedSong]
  );

  return (
    <div className="d-grid  song-list-container">
      <div className="d-flex align-items-center justify-content-center justify-content-between  search-list-div border rounded-3">
        <h2 className="ms-4 fs-3 pt-1 typeHeader">Songs</h2>
        <SearchBar />
      </div>
      <div className="d-grid songListGrid">
        {tracks.map((song, i) => {
          return (
            <SongListItem
              key={i}
              song={song}
              hidden={is900}
              handleSelectedSong={handleSelectedSong}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(SongList);
