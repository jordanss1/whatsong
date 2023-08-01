import { memo } from "react";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import CircularImage from "../CircularImage";
import { TopTracksDetailsType } from "../../types/types";
import { SetAlbumOrTrackType } from "../../hooks/DetailedArtistResultHooks";
import { motion, Variants } from "framer-motion";
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

const ArtistDetailsTopTracks = ({
  topTracks,
  topTrack,
  setTopTrack,
}: ArtistDetailsTopTracksPropTypes) => {
  const image = topTrack?.album.images[0]?.url;

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

  const renderTopTrack = (
    <div className="d-flex gap-1 align-items-center justify-content-center track-content-container">
      {topTrack ? (
        <>
          <CircularImage image={image} />
          <div className="content top-track-content">{topTrack.name}</div>
        </>
      ) : (
        <h3 className="fs-5">No tracks</h3>
      )}
    </div>
  );

  return (
    <motion.section
      variants={topTracksVariants}
      key="top-tracks"
      className="d-flex align-items-center justify-content-center flex-column top-track-container px-3"
    >
      <h2 className="fs-3">Top Tracks</h2>
      <hr className="w-100 mt-1" />
      <div className="item w-100 d-flex top-track-item justify-content-center align-items-center p-1">
        <div className="d-flex justify-content-start small-arrow-div">
          <LeftArrow
            setAlbumOrTrack={() => setTopTrack("left", "track")}
            testId="smallLeft"
            className={leftClasses}
          />
        </div>
        {renderTopTrack}
        <div className="d-flex justify-content-end small-arrow-div">
          <RightArrow
            setAlbumOrTrack={() => setTopTrack("right", "track")}
            testId="smallRight"
            className={rightClasses}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default memo(ArtistDetailsTopTracks);
