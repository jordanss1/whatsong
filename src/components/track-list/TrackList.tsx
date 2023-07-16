import { useContext, useCallback, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import TrackListSelectedContainer from "./TrackListSelectedContainer";
import TrackListContent from "./TrackListContent";
import SearchContext from "../../contexts/searchContext/SearchState";
import { TopTracksDetailsType } from "../../types";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import "./styles/track-list.css";

export type HandleSelectedTrackType = (
  track?: Required<TopTracksDetailsType>
) => void;

const trackContainerVariants: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 100% 50%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%), radial-gradient(circle at 0% 50%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 100%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%)",
    transition: {
      duration: 0.5,
    },
  },
};

const TrackList = () => {
  const { setSelectedTrack, setArtistsOrTracks, tracks, selectedTrack } =
    useContext(SearchContext);

  const location = useLocation();

  const is900 = useMediaQuery(900);

  useEffect(() => {
    let tracks = sessionStorage.getItem("tracks");

    if (tracks && typeof tracks === "string") {
      setArtistsOrTracks(undefined, JSON.parse(tracks));
    }
  }, []);

  const handleSelectedTrack = (track?: Required<TopTracksDetailsType>) => {
    if (track) setSelectedTrack(track);
    else setSelectedTrack(null);
  };

  return (
    <motion.main
      variants={trackContainerVariants}
      initial="initial"
      animate="animate"
    >
      <Header path={location.pathname} />
      <div className="filler-div" />
      <section className="w-100 whole-songs-container d-grid">
        {!is900 && (
          <TrackListSelectedContainer
            selectedTrack={selectedTrack}
            handleSelectedTrack={handleSelectedTrack}
          />
        )}
        <div className="track-list-empty-div" />
        <TrackListContent
          handleSelectedTrack={handleSelectedTrack}
          is900={is900}
          tracks={tracks}
        />
      </section>
    </motion.main>
  );
};

export default TrackList;
