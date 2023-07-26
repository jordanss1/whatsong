import {
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
  useMemo,
  useCallback,
} from "react";
import {
  Cycle,
  motion,
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
import { useMediaQuery, useScreenWidth } from "../../hooks/MediaQueryHook";
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
  end?: boolean,
  track?: Required<TopTracksDetailsType>
) => void;

const TrackList = () => {
  const {
    setSelectedTrack,
    setArtistsOrTracks,
    tracks,
    selectedTrack,
    navigate,
    searched,
    noResults,
    setModal,
    modal,
  } = useContext(SearchContext);
  const is850 = useMediaQuery(850);

  const screenWidth = useScreenWidth();

  const dragRef = useRef(null);

  const { scrollY } = useScroll();

  const [headerCycle, cycleHeader] = useCycle("animate", "transparent");
  const [dragCycle, cycleDrag] = useCycle(false, true);
  const [expandCycle, cycleExpand] = useCycle("normal", "expanded");

  const ballX = useMotionValue(100000);
  const ballY = useMotionValue(100000);
  const coords = { ballX, ballY };

  const x = ballX.get();
  const y = ballY.get();

  const ballCoords = useMemo(() => coords, [x, y]);

  useEffect(() => {
    scrollY.on("change", async () => {
      if (scrollY.get() > 55) {
        cycleHeader(1);
      } else {
        cycleHeader(0);
      }
    });

    return () => scrollY.clearListeners();
  }, [cycleHeader, scrollY]);

  useEffect(() => {
    if (!modal && selectedTrack) {
      cycleExpand(0);
      setSelectedTrack(null);
    }
  }, [modal, selectedTrack]);

  useEffect(() => {
    let tracks = sessionStorage.getItem("tracks");

    if (!tracks) {
      navigate("/search");
    }
  }, []);

  useEffect(() => {
    let tracks = sessionStorage.getItem("tracks");

    if (tracks && typeof tracks === "string" && !noResults) {
      setArtistsOrTracks(undefined, JSON.parse(tracks));
    }
  }, [noResults]);

  const handleSelectedTrack = useCallback(
    (track?: Required<TopTracksDetailsType>) => {
      if (track) {
        setModal(true);
        setSelectedTrack(track);
        cycleDrag(0);
        return;
      }

      setModal(false);
      cycleExpand(0);
      setSelectedTrack(null);
    },
    [setSelectedTrack, tracks]
  );

  const handleDrag: HandleDragType = useCallback(
    (e, cycleBall, ref, end, track) => {
      const { top, left } = e.currentTarget.getBoundingClientRect();

      const rightAllowance =
        screenWidth > 610 ? 0.6 : screenWidth > 400 ? 0.66 : 0.71;

      const leftAllowance =
        screenWidth > 700
          ? 0.35
          : screenWidth > 500
          ? 0.32
          : screenWidth > 420
          ? 0.25
          : screenWidth > 375
          ? 0.21
          : 0.15;

      const insideGoalMobile =
        left < screenWidth * rightAllowance &&
        left > screenWidth * leftAllowance;

      const xDone = is850 ? insideGoalMobile : left < 200 && left > 21;
      const yDone = is850 ? top > 565 : top > 235 && top < 422;

      if (ref.current) {
        ballX.set(left);
        ballY.set(top);
        cycleBall(1);
        cycleDrag(1);
      }

      if (end && xDone && yDone) {
        cycleExpand(1);
        cycleBall(0);
        handleSelectedTrack(track);
      }

      if (end && (!xDone || !yDone)) {
        cycleBall(0);
        cycleDrag(0);
      }
    },
    [ballX, ballY, cycleDrag, cycleExpand]
  );

  const gridVariants = {
    normal: {
      gridTemplateColumns: "250px auto",
      transition: {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      },
    },
    expanded: {
      gridTemplateColumns: "400px auto",
      transition: {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      },
    },
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
          <motion.section
            animate={
              expandCycle === "normal"
                ? gridVariants.normal
                : gridVariants.expanded
            }
            layout
            layoutDependency={dragCycle}
            className="w-100 whole-songs-section d-grid"
          >
            {(!is850 || (is850 && dragCycle) || selectedTrack) && (
              <TrackListSelectedContainer
                selectedTrack={selectedTrack}
                handleSelectedTrack={handleSelectedTrack}
                dragCycle={dragCycle}
                ballCoords={ballCoords}
                expandCycle={expandCycle}
              />
            )}
            {!is850 && <motion.div className="track-list-empty-div" />}
            <motion.div className="track-list-container d-flex align-items-center flex-column">
              <TrackListGridSearchBar searched={searched} cycle={headerCycle} />
              <TrackListGrid
                dragRef={dragRef}
                tracks={tracks}
                handleDrag={handleDrag}
                expandCycle={expandCycle}
              />
            </motion.div>
          </motion.section>
        </motion.main>
      )}
    </>
  );
};

export default TrackList;
