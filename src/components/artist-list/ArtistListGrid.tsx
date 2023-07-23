import {
  ReactElement,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import ArtistListGridCard from "./ArtistListGridCard";
import Popout from "../popout/Popout";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { ArtistsType } from "../../types/types";
import SearchContext from "../../contexts/searchContext/SearchState";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import "./styles/artist-list.css";

type ArtistListGridPropsType = {
  artists: ArtistsType[];
};

export type HandleProfileClickType = (id: string) => void;

const popoutContainerVariants: Variants = {
  hidden: {
    y: -50,
    opacity: 0,
    zIndex: 3,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  visible: {
    padding: "20px",
    borderRadius: "20px",
    y: -100,
    x: 50,
    zIndex: 3,
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: 1,
    scale: 1.2,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
  exit: {
    backgroundColor: "rgba(0,0,0,0)",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const popoutVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 1,
      delay: 0.5,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const ArtistListGrid = ({ artists }: ArtistListGridPropsType): ReactElement => {
  const {
    albums,
    topTracks,
    error,
    navigate,
    searched,
    handleArtistDetailSearch,
    setProfile,
    setPopout,
    popout,
  } = useContext(SearchContext);
  const is389 = useMediaQuery(389);

  const idRef = useRef<string | null>(null);

  const gridClass = artists.length < 6 ? "artist-grid-less" : "artist-grid";

  useEffect(() => {
    const visited = sessionStorage.getItem("artist-visited");

    if (visited) return;

    sessionStorage.setItem("artist-visited", "artist-visited");
    setTimeout(() => setPopout(true), 1200);
  }, []);

  useEffect(() => {
    if (albums && topTracks && idRef.current && !error) {
      navigate(`/artists/${idRef.current}`);
      idRef.current = null;
    }

    if (error) {
      idRef.current = null;
    }
  }, [albums, topTracks]);

  const renderPopout = (
    <Popout
      variants={popoutVariants}
      style={{
        width: is389 ? "150px" : "225px",
        fontSize: is389 ? "12px" : "15px",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        gap: "10px",
      }}
    >
      <div>Click an artist to be taken to their details</div>
      <motion.button
        onClick={() => setPopout(false)}
        whileHover={{ scale: 1.05, color: "rgb(255,255,255)" }}
      >
        Ok!
      </motion.button>
    </Popout>
  );

  const handleProfileClick = useCallback<HandleProfileClickType>(
    (id) => {
      idRef.current = id;
      handleArtistDetailSearch(id);
    },
    [setProfile, handleArtistDetailSearch]
  );

  const renderArtists = (
    <>
      {artists.map((artist, i) => {
        return (
          <AnimatePresence key={i} mode="wait">
            {popout && i === 0 ? (
              <motion.div
                variants={popoutContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="popoutContainer"
                className="d-flex flex-column gap-4 align-items-center"
              >
                {renderPopout}
                <ArtistListGridCard
                  key="popout"
                  index={i}
                  artist={artist}
                  handleClick={handleProfileClick}
                  searched={searched}
                />
              </motion.div>
            ) : (
              <ArtistListGridCard
                key={i}
                index={i}
                artist={artist}
                handleClick={handleProfileClick}
                searched={searched}
              />
            )}
          </AnimatePresence>
        );
      })}
    </>
  );

  return (
    <motion.div layout className={`d-grid ${gridClass}`}>
      {renderArtists}
    </motion.div>
  );
};

export default ArtistListGrid;
