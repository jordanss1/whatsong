import { useContext, useEffect } from "react";
import { motion, useCycle, useScroll, Variants } from "framer-motion";
import Header from "../header/Header";
import TrackListSelectedContainer from "./tracklist-selected/TrackListSelectedContainer";
import TrackListGridSearchBar from "./tracklist-grid/TrackListGridSearchBar";
import TrackListGrid from "./tracklist-grid/TrackListGrid";
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
      "radial-gradient(circle at 110% 50%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%), radial-gradient(circle at -10% 50%,rgba(222, 90, 174, .2) 0%,rgba(222, 90, 174, .2) 15%,transparent 50%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 100% 10%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%), radial-gradient(circle at 0% 100%,rgba(222, 90, 174, .3) 0%,rgba(222, 90, 174, 0) 15%,transparent 90%)",
    transition: {
      delay: 0.5,
      duration: 0.5,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%)",
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.02,
    },
  },
};

const TrackList = () => {
  const {
    setSelectedTrack,
    setArtistsOrTracks,
    tracks,
    selectedTrack,
    searched,
  } = useContext(SearchContext);

  const [headerCycle, cycleHeader] = useCycle("animate", "transparent");

  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.on("change", async () => {
      if (scrollY.get() > 55) {
        cycleHeader(1);
      } else {
        cycleHeader(0);
      }
    });

    return () => scrollY.clearListeners();
  }, []);

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
    <>
      {tracks && (
        <motion.main
          variants={trackContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="whole-songs-container"
        >
          <Header headerCycle={headerCycle} />
          <div className="filler-div" />
          <section className="w-100 whole-songs-section d-grid">
            {!is900 && (
              <TrackListSelectedContainer
                selectedTrack={selectedTrack}
                handleSelectedTrack={handleSelectedTrack}
              />
            )}
            <div className="track-list-empty-div" />
            <motion.div className="track-list-container d-flex align-items-center flex-column">
              <TrackListGridSearchBar cycle={headerCycle} />
              <TrackListGrid
                handleSelectedTrack={handleSelectedTrack}
                is900={is900}
                tracks={tracks}
              />
            </motion.div>
          </section>
        </motion.main>
      )}
    </>
  );
};

export default TrackList;
