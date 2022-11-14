import React, { useEffect, memo, useCallback } from "react";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import {
  leftSmall,
  leftSmallDisabled,
  rightSmall,
  rightSmallDisabled,
} from "../styles/inline";

const ArtistTopTracks = ({ topTracks, filteredTrack, setFilteredTrack }) => {
  useEffect(() => {
    setFilteredTrack(0);
  }, []);

  const arrowProps = {
    leftClick: useCallback(() => setFilteredTrack((prev) => prev - 1), []),
    rightClick: useCallback(() => setFilteredTrack((prev) => prev + 1), []),
  };

  const renderLeftArrow = () => {
    return (
      <div className="d-flex justify-content-start smallArrowDiv">
        {filteredTrack === 0 ? (
          <LeftArrow style={leftSmallDisabled} />
        ) : (
          <LeftArrow style={leftSmall} func={arrowProps.leftClick} />
        )}
      </div>
    );
  };

  const renderRightArrow = () => {
    return (
      <div className="d-flex justify-content-end smallArrowDiv">
        {filteredTrack === topTracks.length - 1 ? (
          <RightArrow style={rightSmallDisabled} />
        ) : (
          <RightArrow style={rightSmall} func={arrowProps.rightClick} />
        )}
      </div>
    );
  };

  const renderTopTracks = () => {
    if (!topTracks) {
      return (
        <div className="ui placeholder">
          <div className="header">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      );
    } else if (topTracks.noTracks) {
      return <h3>No tracks</h3>;
    } else if (topTracks.length > 0 && !topTracks.noTracks) {
      const { album, name } = topTracks[filteredTrack];
      return (
        <div className="d-flex align-items-center">
          {album.images[2] ? (
            <img
              className="ui avatar image me-2"
              src={`${album.images[2].url}`}
            />
          ) : (
            <img className="ui avatar image" src="" />
          )}
          <div className="content topTrackContent">{name}</div>
        </div>
      );
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center flex-column topTrackContainer">
      <h2 className="fs-2">Top tracks</h2>
      <hr className="w-25 mt-1" />
      <div className="item d-flex topTrackItem justify-content-center align-items-center w-50 p-1">
        {renderLeftArrow()}
        {renderTopTracks()}
        {renderRightArrow()}
      </div>
    </section>
  );
};

export default memo(ArtistTopTracks);
