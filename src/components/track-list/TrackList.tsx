import {
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
  useMemo,
} from "react";
import {
  Cycle,
  motion,
  PanInfo,
  useCycle,
  useMotionValue,
  useScroll,
  Variants,
} from "framer-motion";
import Header from "../header/Header";
import TrackListSelectedContainer from "./tracklist-selected/TrackListSelectedContainer";
import TrackListGridSearchBar from "./tracklist-grid/TrackListGridSearchBar";
import TrackListGrid from "./tracklist-grid/TrackListGrid";
import SearchContext from "../../contexts/searchContext/SearchState";
import { TopTracksDetailsType } from "../../types/types";
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

export type HandleDragType = (
  e: React.PointerEvent,
  cycleBall: Cycle,
  ref: MutableRefObject<boolean>,
  end?: boolean
) => void;

const TrackList = () => {
  const {
    setSelectedTrack,
    setArtistsOrTracks,
    tracks,
    selectedTrack,
    searched,
  } = useContext(SearchContext);
  const dragRef = useRef(null);

  const [headerCycle, cycleHeader] = useCycle("animate", "transparent");
  const [dragCycle, cycleDrag] = useCycle(false, true);
  const ballX = useMotionValue(0);
  const ballY = useMotionValue(0);
  const coords = { ballX, ballY };

  const ballCoords = useMemo(() => coords, [ballX.get(), ballY.get()]);

  const is850 = useMediaQuery(850);

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

  const handleDrag: HandleDragType = (e, cycleBall, ref, end) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();

    const xDone = left < 188 && left > 40;
    const yDone = top > 250 && top < 403;

    if (ref.current && !end) {
      ballX.set(left);
      ballY.set(top);
      cycleBall(1);
      cycleDrag(1);
    }

    if (!ref.current && end && xDone && yDone) {
      ballX.set(left);
      ballY.set(top);
      console.log(top);
      console.log(left);
    }

    if (!ref.current && end && (!xDone || !yDone)) {
      cycleBall(0);
      cycleDrag(0);
    }
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
          ref={dragRef}
        >
          <Header headerCycle={headerCycle} />
          <div className="filler-div" />
          <section className="w-100 whole-songs-section d-grid">
            {!is850 && (
              <TrackListSelectedContainer
                selectedTrack={selectedTrack}
                handleSelectedTrack={handleSelectedTrack}
                dragCycle={dragCycle}
                ballCoords={ballCoords}
              />
            )}
            <div className="track-list-empty-div" />
            <motion.div className="track-list-container d-flex align-items-center flex-column">
              <TrackListGridSearchBar cycle={headerCycle} />
              <TrackListGrid
                dragRef={dragRef}
                searched={searched}
                handleSelectedTrack={handleSelectedTrack}
                tracks={tracks}
                handleDrag={handleDrag}
              />
              {is850 && (
                <TrackListSelectedContainer
                  selectedTrack={selectedTrack}
                  handleSelectedTrack={handleSelectedTrack}
                  dragCycle={dragCycle}
                  ballCoords={ballCoords}
                />
              )}
            </motion.div>
          </section>
        </motion.main>
      )}
    </>
  );
};

export default TrackList;
