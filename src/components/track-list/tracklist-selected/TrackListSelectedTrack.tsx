import { ReactElement, useCallback } from "react";
import { motion, MotionStyle, Variants } from "framer-motion";
import Exit from "../../Exit";
import ImageCard from "../../ImageCard";
import TrackDetailLine from "../../TrackDetailLine";
import { TopTracksDetailsType } from "../../../types/types";
import { HandleSelectedTrackType } from "../TrackList";

import "../styles/track-list.css";

type TrackListSelectedProps = {
  selectedTrack: Required<TopTracksDetailsType>;
  handleSelectedTrack: HandleSelectedTrackType;
};

const exitVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1,
  },
};

const imageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -50,
    boxShadow: "0px 0px 2px 1px rgba(222, 90, 174, 0)",
  },
  animate: (albumImage) => ({
    opacity: 1,
    x: 0,
    boxShadow: albumImage && "0px 0px 20px 1px rgba(222, 90, 174, .7)",
    transition: {
      duration: 0.3,
      delay: 0.7,
      boxShadow: {
        duration: 0.1,
        delay: 0.1,
      },
    },
  }),
  exit: {
    opacity: 0,
    x: 50,
    boxShadow: "0px 0px 2px 1px rgba(222, 90, 174, 0)",
    transition: {
      duration: 0.3,
    },
  },
  hover: (albumImage) => ({
    boxShadow: albumImage && [null, "0px 0px 30px 3px rgba(222, 90, 174, .7)"],
    scale: 1.05,
  }),
};

const lineVariants: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: (order) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.7 + order,
    },
  }),
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.3,
    },
  },
};

const TrackListSelectedTrack = ({
  selectedTrack,
  handleSelectedTrack,
}: TrackListSelectedProps): ReactElement => {
  const { album, artists, duration_ms, name, track_number } = selectedTrack;

  let artist = artists
    .map((artist) => artist.name)
    .toString()
    .replaceAll(",", ", ");

  const releaseDate = album.release_date.slice(0, 4);
  const trackOf = `Track ${track_number} of ${album.total_tracks}`;
  const albumImage = album.images[0].url;
  const albumType = album.album_type;
  const albumName = album.name;

  const durationConvert = useCallback((): string => {
    const seconds = Math.floor((duration_ms / 1000) % 60);
    const minutes = Math.floor((duration_ms / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }, [selectedTrack?.id]);

  const songLength = durationConvert();

  const saveSpaceStyle: MotionStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <>
      <motion.div
        variants={exitVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-100 d-flex justify-content-end align-items-center pt-4 pb-2"
      >
        <Exit size={3} handleClick={() => handleSelectedTrack()} />
      </motion.div>
      <motion.div className="d-flex flex-column song-item w-100 pt-4 align-items-center">
        <ImageCard
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          style={{ borderRadius: "20px" }}
          custom={albumImage}
          url={albumImage}
          iconSize={100}
        />
        <motion.div
          style={{ height: "230px" }}
          className="pt-4 d-flex flex-column justify-content-evenly w-100"
        >
          <motion.div
            variants={lineVariants}
            custom={0.1}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              maxWidth: "379px",
              ...saveSpaceStyle,
            }}
            className="fw-bold fs-2 text-center"
          >
            {artist}
          </motion.div>
          <TrackDetailLine
            variants={lineVariants}
            custom={0.2}
            initial="initial"
            animate="animate"
            exit="exit"
            seperator
            style={{
              maxWidth: "250px",
              ...saveSpaceStyle,
            }}
            firstTitle={name}
            secondTitle={songLength}
            firstPadding={3}
            secondPadding={3}
          />
          <TrackDetailLine
            variants={lineVariants}
            custom={0.3}
            initial="initial"
            animate="animate"
            exit="exit"
            firstTitle={albumType === "single" ? "Single -" : albumName}
            secondTitle={albumType === "single" ? releaseDate : trackOf}
            style={
              albumType === "album"
                ? {
                    maxWidth: "180px",
                    textAlign: "center",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : {}
            }
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default TrackListSelectedTrack;
