import {
  ReactElement,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import ArtistListGridCard from "./ArtistListGridCard";
import { ArtistsType } from "../../types/types";
import SearchContext from "../../contexts/searchContext/SearchState";
import "./styles/artist-list.css";

type ArtistListGridPropsType = {
  artists: ArtistsType[];
};

export type HandleProfileClickType = (id: string) => void;

const ArtistListGrid = ({ artists }: ArtistListGridPropsType): ReactElement => {
  const {
    albums,
    topTracks,
    error,
    navigate,
    searched,
    handleArtistDetailSearch,
    setProfile,
  } = useContext(SearchContext);

  const idRef = useRef<string | null>(null);

  const gridClass = artists.length < 6 ? "artist-grid-less" : "artist-grid";

  useEffect(() => {
    if (albums && topTracks && idRef.current && !error) {
      navigate(`/artists/${idRef.current}`);
      idRef.current = null;
    }

    if (error) {
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

  return (
    <div className={`d-grid ${gridClass}`}>
      {artists.map((artist, i) => (
        <ArtistListGridCard
          key={i}
          index={i}
          artist={artist}
          handleClick={handleProfileClick}
          searched={searched}
        />
      ))}
    </div>
  );
};

export default ArtistListGrid;
