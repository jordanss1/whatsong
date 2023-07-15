import { memo, useContext, useCallback } from "react";
import SearchBar from "../search-list/SearchListSearchBar";
import { TopTracksDetailsType } from "../../types";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import SearchContext from "../../contexts/searchContext/SearchState";
import SongListItem from "./SongListItem";
import "./styles/song-list.css";

export type HandleSelectedSongType = (
  track: Required<TopTracksDetailsType>
) => void;

const SongList = ({ tracks }: { tracks: Required<TopTracksDetailsType>[] }) => {
  const { setSelectedSong } = useContext(SearchContext);
  const is900 = useMediaQuery(900);

  const containerClass = tracks.length
    ? "song-list-container-results"
    : "song-list-container-none";

  const handleSelectedSong = useCallback<HandleSelectedSongType>(
    (track) => {
      setSelectedSong(track);
    },
    [setSelectedSong]
  );

  return (
    <div className={containerClass}>
      <div className="d-flex align-items-center justify-content-end search-list-div">
        <SearchBar />
      </div>
      <div className="d-grid pb-5">
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
