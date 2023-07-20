import {
  ReactElement,
  useContext,
  useRef,
  useCallback,
  useEffect,
  memo,
} from "react";
import { Variants, motion, AnimationScope } from "framer-motion";
import ArtistOrAlbumCard from "../artist-details/ArtistOrAlbumCard";
import SearchContext from "../../contexts/searchContext/SearchState";

import { ArtistsType } from "../../types";
import "./styles/artist-list.css";

export type HandleProfileClickType = (id: string) => void;

type ArtistListGridPropsType = {
  artists: ArtistsType[];
  searched: boolean;
};

const artistGridVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.01,
      when: "afterChildren",
    },
  },
};

const ArtistListGrid = ({
  artists,
  searched,
}: ArtistListGridPropsType): ReactElement => {
  const {
    handleArtistDetailSearch,
    setProfile,
    albums,
    topTracks,
    navigate,
    error,
  } = useContext(SearchContext);

  const idRef = useRef<string | null>(null);

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
    <motion.div
      layout
      variants={artistGridVariants}
      className={`d-grid ${gridClass}`}
    >
      {artists.map((artist, i) => (
        <ArtistOrAlbumCard
          key={i}
          index={i}
          cardType="artist"
          artist={artist}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </motion.div>
  );
};

export default memo(ArtistListGrid);
