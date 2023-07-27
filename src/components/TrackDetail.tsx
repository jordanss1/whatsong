import { ReactElement } from "react";
import { motion, MotionProps, MotionStyle, Variants } from "framer-motion";
import { TopTracksDetailsType } from "../types/types";
import Seperator from "./Seperator";
import ImageCard from "./ImageCard";
import TrackDetailLine from "./TrackDetailLine";

interface TrackDetailPropsType extends MotionProps {
  selectedTrack: Required<TopTracksDetailsType>;
  imageVariants: Variants;
  lineVariants: Variants;
}

const TrackDetail = ({
  selectedTrack,
  imageVariants,
  lineVariants,
}: TrackDetailPropsType): ReactElement => {
  const { album, artists, duration_ms, name, track_number } = selectedTrack;

  const durationConvert = (): string => {
    const seconds = Math.floor((duration_ms / 1000) % 60);
    const minutes = Math.floor((duration_ms / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  const songLength = durationConvert();

  let artist = artists
    .map((artist) => artist.name)
    .toString()
    .replaceAll(",", ", ");

  const releaseDate = album.release_date.slice(0, 4);
  const trackOf = `Track ${track_number} of ${album.total_tracks}`;
  const albumImage = album.images[0].url;
  const albumType = album.album_type === "single" ? "Single -" : album.name;
  const albumDetail = album.album_type === "single" ? releaseDate : trackOf;

  const lineStyle: MotionStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const albumStyle: MotionStyle =
    album.album_type === "single"
      ? {}
      : {
          maxWidth: "180px",
          textAlign: "center",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        };

  return (
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
        <TrackDetailLine
          variants={lineVariants}
          custom={0.1}
          style={{
            maxWidth: "379px",
            ...lineStyle,
          }}
        >
          <span className="fw-bold fs-2 text-center">{artist}</span>
        </TrackDetailLine>
        <TrackDetailLine
          variants={lineVariants}
          custom={0.2}
          style={{
            maxWidth: "250px",
            ...lineStyle,
          }}
        >
          <motion.span
            style={{
              maxWidth: "250px",
              ...lineStyle,
            }}
            className="pe-3"
          >
            {name}
          </motion.span>
          <Seperator
            style={{ backgroundColor: "white", borderRadius: "50%" }}
            width="5px"
            height="25px"
          />
          <span className="ps-3">{songLength}</span>
        </TrackDetailLine>
        <TrackDetailLine variants={lineVariants} custom={0.3}>
          <motion.span style={albumStyle} className="pe-1">
            {albumType}
          </motion.span>
          <span className="ps-1">{albumDetail}</span>
        </TrackDetailLine>
      </motion.div>
    </motion.div>
  );
};

export default TrackDetail;
