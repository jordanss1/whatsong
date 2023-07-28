import { MutableRefObject, ReactElement, useContext, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import TrackListGridItem from "./TrackListGridItem";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleDragType } from "../TrackList";
import Popout from "../../popout/Popout";
import { useMediaQuery } from "../../../hooks/MediaQueryHook";
import SearchContext from "../../../contexts/searchContext/SearchState";
import "../styles/track-list.css";

type TrackListGridSelectedProps = {
  tracks: Required<TopTracksDetailsType>[];
  dragRef: MutableRefObject<null>;
  handleDrag: HandleDragType;
  expandCycle: string;
};

export const popoutContainerVariants: Variants = {
  hidden: {
    y: -20,
    opacity: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  visible: (is850) => ({
    padding: "20px",
    borderRadius: "20px",
    y: is850 ? 0 : -70,
    x: 0,
    maxWidth: is850 ? "500px" : "650px",
    zIndex: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: 1,
    scale: 1.2,
    transition: {
      ease: "easeOut",
      type: "tween",
      duration: 0.5,
    },
  }),
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
      type: "tween",
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

const TrackListGrid = ({
  tracks,
  dragRef,
  handleDrag,
  expandCycle,
}: TrackListGridSelectedProps): ReactElement => {
  const { setPopout, popout, searched } = useContext(SearchContext);
  const is850 = useMediaQuery(850);

  useEffect(() => {
    const visited = localStorage.getItem("tracks-visited");

    if (visited) return;

    localStorage.setItem("tracks-visited", "tracks-visited");
    setTimeout(() => setPopout(true), 1200);
  }, []);

  const renderPopout = (
    <Popout
      variants={popoutVariants}
      style={{
        maxWidth: is850 ? "250px" : "350px",
        width: "100%",
        fontSize: is850 ? "14px" : "15px",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        gap: "10px",
      }}
    >
      <div>
        Mouse over tracks to reveal orbs. On mobile, click on tracks to reveal
        orbs.
      </div>
      <motion.button
        onClick={() => setPopout(false)}
        whileHover={{ scale: 1.05, color: "rgb(255,255,255)" }}
      >
        Ok!
      </motion.button>
    </Popout>
  );

  const renderTracks = (
    <>
      {tracks.map((track, i) => {
        return (
          <AnimatePresence key={i} mode="wait">
            {popout && i === 0 ? (
              <motion.div
                variants={popoutContainerVariants}
                custom={is850}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="popoutContainer"
                className="d-flex flex-column w-100 justify-content-center gap-4 align-items-center"
              >
                {renderPopout}
                <TrackListGridItem
                  key={i}
                  searched={searched}
                  index={i}
                  track={track}
                  dragRef={dragRef}
                  expandCycle={expandCycle}
                  style={{
                    x: is850 ? 0 : -35,
                    maxWidth: "650px",
                    width: "100%",
                    minWidth: is850 ? "285px" : "auto",
                  }}
                />
              </motion.div>
            ) : (
              <TrackListGridItem
                key={i}
                searched={searched}
                index={i}
                track={track}
                dragRef={dragRef}
                handleDrag={handleDrag}
                expandCycle={expandCycle}
              />
            )}
          </AnimatePresence>
        );
      })}
    </>
  );

  return (
    <motion.div className="d-grid pb-5 w-100 track-list-grid">
      {renderTracks}
    </motion.div>
  );
};

export default TrackListGrid;
