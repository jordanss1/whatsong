import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";
import { memo, useEffect } from "react";
import { SetAlbumOrTrackType } from "../../hooks/DetailedArtistResultHooks";
import { TopTracksDetailsType } from "../../types/types";
import CircularImage from "../CircularImage";
import LeftArrow from "./Arrows/LeftArrow";
import RightArrow from "./Arrows/RightArrow";
import ArtistDetailsTopTrackItem from "./ArtistDetailsTopTrackItem";
import "./styles/artist-details.css";

type ArtistDetailsTopTracksPropTypes = {
  topTracks: TopTracksDetailsType[] | null;
  topTrack: TopTracksDetailsType | null;
  setTopTrack: SetAlbumOrTrackType;
};

const topTracksVariants: Variants = {
  initial: {
    x: 70,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
  exit: {
    x: -70,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const rightArrowVariants: Variants = {
  hover: (topTracks) =>
    topTracks && topTracks?.length > 1
      ? {
          background:
            "linear-gradient(to right,rgba(255, 255, 255, 0) 25%,rgba(255, 255, 255, 0.22) 100%)",
          scale: [null, 1.1],
        }
      : {},
  tap: (topTracks) =>
    topTracks && topTracks?.length > 1
      ? {
          background:
            "linear-gradient(to right,rgba(255, 255, 255, 0) 60%,rgba(255, 255, 255, 0.15) 100%)",
          scale: [null, 0.8],
        }
      : {},
};

const leftArrowVariants: Variants = {
  hover: (topTracks) =>
    topTracks && topTracks?.length > 1
      ? {
          background:
            "linear-gradient(to right,rgba(255, 255, 255, 0.15) 20%,rgba(255, 255, 255, 0) 70%)",
          scale: [null, 1.1],
        }
      : {},
  tap: (topTracks) =>
    topTracks && topTracks?.length > 1
      ? {
          background:
            "linear-gradient(to right,rgba(255, 255, 255, 0.07) 20%,rgba(255, 255, 255, 0) 60%)",
          scale: [null, 0.8],
        }
      : {},
};

const ArtistDetailsTopTracks = ({
  topTracks,
  topTrack,
  setTopTrack,
}: ArtistDetailsTopTracksPropTypes) => {
  const leftClasses = `small-arrows pb-1 ${
    topTracks && topTracks.length > 1
      ? "left-small-arrow w-100"
      : "left-small-arrow-disabled"
  }`;

  const rightClasses = `small-arrows pb-1 ${
    topTracks && topTracks.length > 1
      ? "justify-content-end  right-small-arrow  w-100"
      : "right-small-arrow-disabled"
  }`;

  const [direction, cycleDirection] = useCycle<"left" | "right">(
    "left",
    "right"
  );

  const [changed, cycleChanged] = useCycle(false, true);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (timer) clearTimeout(timer);

    if (changed) {
      timer = setTimeout(() => {
        cycleChanged(0);
      }, 250);
    }

    return () => clearTimeout(timer);
  }, [changed]);

  const handleTrack = (direction: "left" | "right") => {
    let timer: NodeJS.Timeout;

    if (topTracks && topTracks?.length > 1) {
      cycleDirection(direction === "left" ? 0 : 1);

      timer = setTimeout(() => {
        cycleChanged(1);
        setTopTrack(direction, "track");
      }, 50);
    }

    return () => clearTimeout(timer);
  };

  return (
    <motion.section
      variants={topTracksVariants}
      key="top-tracks"
      className="d-flex align-items-center justify-content-center flex-column top-track-container px-3"
    >
      <h2 className="fs-3">Top Tracks</h2>
      <hr className="w-100 mt-1" />
      <div
        className={`item w-100 d-flex top-track-item justify-content-center align-items-center p-1 ${
          !topTrack && "py-2"
        }`}
      >
        <div className="d-flex justify-content-start small-arrow-div">
          <LeftArrow
            variants={leftArrowVariants}
            custom={topTracks}
            whileHover="hover"
            whileTap="tap"
            setAlbumOrTrack={() => handleTrack("left")}
            testId="smallLeft"
            className={leftClasses}
          />
        </div>
        <motion.div
          className="d-flex align-items-center"
          style={{ minWidth: "227px", height: "50px" }}
        >
          <AnimatePresence mode="wait">
            {!changed && (
              <ArtistDetailsTopTrackItem
                direction={direction}
                topTrack={topTrack}
              />
            )}
          </AnimatePresence>
        </motion.div>
        <div className="d-flex justify-content-end small-arrow-div">
          <RightArrow
            variants={rightArrowVariants}
            custom={topTracks}
            whileHover="hover"
            whileTap="tap"
            setAlbumOrTrack={() => handleTrack("right")}
            testId="smallRight"
            className={rightClasses}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default memo(ArtistDetailsTopTracks);
