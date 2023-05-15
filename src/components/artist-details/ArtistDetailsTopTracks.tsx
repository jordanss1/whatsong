import { memo } from "react";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import {
  leftSmall,
  leftSmallDisabled,
  rightSmall,
  rightSmallDisabled,
} from "../../styles/inline";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import { TopTracksDetailsType } from "../../types";
import { TrackOrAlbumFuncType as SetTopTrackType } from "../../hooks/DetailedArtistResultHooks";

const ArtistDetailsTopTracks = ({
  topTracks,
  topTrack,
  setTopTrack,
}: {
  topTracks: TopTracksDetailsType[];
  topTrack: TopTracksDetailsType | null;
  setTopTrack: SetTopTrackType;
}) => {
  const isWidth992 = useMediaQuery(992);

  const containerWidth = () => {
    if (!topTracks && isWidth992) {
      return "w-50";
    }
    return "w-75";
  };

  const renderTopTrack = () => {
    if (!topTrack) {
      return <h3 className="fs-4">No tracks</h3>;
    } else {
      return (
        <div className="d-flex align-items-center justify-content-center trackContentContainer">
          <img
            className={`ui avatar image ${topTrack.album.images[2] && "me2"}`}
            src={`${topTrack.album.images[2] && topTrack.album.images[2].url}`}
          />
          <div className="content topTrackContent">{topTrack.name}</div>
        </div>
      );
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center flex-column topTrackContainer">
      <h2 className="fs-2">Top tracks</h2>
      <hr className="w-25 mt-1" />
      <div
        className={`item d-flex topTrackItem justify-content-center align-items-center ${containerWidth()}  p-1`}
      >
        <div className="d-flex justify-content-start smallArrowDiv">
          <LeftArrow
            testId="smallLeft"
            style={topTracks.length > 1 ? leftSmall : leftSmallDisabled}
            func={setTopTrack}
          />
        </div>
        {renderTopTrack()}
        <div className="d-flex justify-content-end smallArrowDiv">
          <RightArrow
            testId="smallRight"
            style={topTracks.length > 1 ? rightSmall : rightSmallDisabled}
            func={setTopTrack}
          />
        </div>
      </div>
    </section>
  );
};

export default memo(ArtistDetailsTopTracks);
