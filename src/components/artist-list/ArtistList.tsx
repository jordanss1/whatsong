import {
  ReactElement,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import SearchContext from "../../contexts/SearchState";
import { ArtistDetailsType } from "../../types";
import ArtistOrAlbumCard from "../artist-details/ArtistOrAlbumCard";
import "./styles/artist-list.css";

export type HandleProfileClickType = (id: string) => void;

const ArtistList = ({
  artists,
}: {
  artists: ArtistDetailsType[];
}): ReactElement => {
  const {
    handleArtistDetailSearch,
    setProfile,
    setFilteredTrack,
    albums,
    topTracks,
    navigate,
  } = useContext(SearchContext);

  const idRef = useRef<string | null>(null);

  useEffect(() => {
    setFilteredTrack(0);
  }, []);

  useEffect(() => {
    if (albums && topTracks && idRef.current) {
      navigate(`/artists/${idRef.current}`);
      idRef.current = null;
    }
  }, [albums, topTracks]);

  const handleProfileClick = useCallback<HandleProfileClickType>(
    (id) => {
      idRef.current = id;
      handleArtistDetailSearch(id);
    },
    [setProfile, handleArtistDetailSearch]
  );

  const gridClass = artists.length < 6 ? "artist-grid-less" : "artist-grid";

  return (
    <>
      <div className={`d-grid ${gridClass}`}>
        {artists.map((artist, i) => {
          return (
            <ArtistOrAlbumCard
              key={i}
              cardType="artist"
              artist={artist}
              handleProfileClick={handleProfileClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default ArtistList;
