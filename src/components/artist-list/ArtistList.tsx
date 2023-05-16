import {
  ReactElement,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import ArtistCard from "./ArtistListArtistCard";
import SearchContext from "../../contexts/SearchState";
import { ArtistDetailsType } from "../../types";

export type HandleProfileClickType = (id: string) => void;

const ArtistList = ({
  artists,
}: {
  artists: ArtistDetailsType[];
}): ReactElement => {
  const {
    spotifyArtistAndAlbum,
    setProfile,
    setAnimateStateList,
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
      spotifyArtistAndAlbum(id, setProfile);
      setAnimateStateList({ x: 300, opacity: 0 }, { x: 300, opacity: 0 });
    },
    [setAnimateStateList, setProfile, spotifyArtistAndAlbum]
  );

  const gridClass = artists.length < 6 ? "artist-grid-less" : "artist-grid";

  return (
    <>
      <div className={`d-grid ${gridClass}`}>
        {artists.map(({ external_urls, name, images, id }, i) => {
          return (
            <ArtistCard
              key={i}
              url={external_urls.spotify}
              name={name}
              image={images[0]}
              id={id}
              handleProfileClick={handleProfileClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default ArtistList;
