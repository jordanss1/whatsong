import {
  ReactElement,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import SearchContext from "../../contexts/searchContext/SearchState";
import { ArtistsType } from "../../types";
import ArtistOrAlbumCard from "../artist-details/ArtistOrAlbumCard";
import "./styles/artist-list.css";

export type HandleProfileClickType = (id: string) => void;

type ArtistListGridPropsType = {
  artists: ArtistsType[];
  searched: boolean;
  setSearched: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArtistListGrid = ({
  artists,
  searched,
  setSearched,
}: ArtistListGridPropsType): ReactElement => {
  const {
    handleArtistDetailSearch,
    setProfile,
    albums,
    topTracks,
    navigate,
    error,
  } = useContext(SearchContext);

  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const idRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await animate(
          ".artist-image",
          {
            x: 100,
            opacity: 0,
          },
          {
            duration: 1,
          }
        );
        safeToRemove();
      };
      console.log("first");
      exitAnimation();
    }
  }, [isPresent]);

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

  const gridClass = artists.length < 6 ? "artist-grid-less" : "artist-grid";

  return (
    <motion.div layout className={`d-grid ${gridClass}`}>
      {artists.map((artist, i) => {
        return (
          <div key={i} ref={scope}>
            <ArtistOrAlbumCard
              key={i}
              index={i}
              cardType="artist"
              artist={artist}
              handleProfileClick={handleProfileClick}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default ArtistListGrid;
