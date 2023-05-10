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
  slicedElements,
  artists,
}: {
  slicedElements: number[];
  artists: ArtistDetailsType[];
}): ReactElement => {
  const {
    spotifyArtistAndAlbum,
    setProfile,
    setAnimateStateList,
    setFilteredAlbum,
    setFilteredTrack,
    albums,
    topTracks,
    navigate,
  } = useContext(SearchContext);

  const idRef = useRef<string | null>(null);

  useEffect(() => {
    setFilteredTrack(0);
    setFilteredAlbum(0);
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

  return (
    <>
      <div className="d-sm-grid d-flex flex-column ms-2 align-items-center justify-content-md-center p-5 p-xl-0 artistGrid">
        {artists
          .slice(slicedElements[0], slicedElements[1])
          .map(({ external_urls, name, images, id }, i) => {
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
