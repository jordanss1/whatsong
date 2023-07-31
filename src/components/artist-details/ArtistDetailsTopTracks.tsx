import { memo } from "react";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import {
  leftSmall,
  leftSmallDisabled,
  rightSmall,
  rightSmallDisabled,
} from "../../styles/inline";
import { TopTracksDetailsType } from "../../types/types";
import { TrackOrAlbumFuncType as SetTopTrackType } from "../../hooks/DetailedArtistResultHooks";
import CircularImage from "../CircularImage";
import { motion, Variants } from "framer-motion";
import "./styles/artist-details.css";

type ArtistDetailsTopTracksPropTypes = {
  topTracks: TopTracksDetailsType[] | null;
  topTrack: TopTracksDetailsType | null;
  setTopTrack: SetTopTrackType;
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
};

const ArtistDetailsTopTracks = ({
  topTracks,
  topTrack,
  setTopTrack,
}: ArtistDetailsTopTracksPropTypes) => {
  const image = topTrack?.album.images[0]?.url;

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
      className="d-flex align-items-center justify-content-center flex-column top-track-container px-3"
    >
      <h2 className="fs-3">Top Tracks</h2>
      <hr className="w-100 mt-1" />
      <div className="item w-100 d-flex top-track-item justify-content-center align-items-center p-1">
        <div className="d-flex justify-content-start smallArrowDiv">
          <LeftArrow
            testId="smallLeft"
            style={
              topTracks && topTracks.length > 1 ? leftSmall : leftSmallDisabled
            }
            func={setTopTrack}
          />
        </div>
        {renderTopTrack}
        <div className="d-flex justify-content-end smallArrowDiv">
          <RightArrow
            testId="smallRight"
            style={
              topTracks && topTracks.length > 1
                ? rightSmall
                : rightSmallDisabled
            }
            func={setTopTrack}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default memo(ArtistDetailsTopTracks);
