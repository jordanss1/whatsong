import React, { useContext, useEffect } from "react";
import RightArrow from "./Arrows/RightArrow";
import LeftArrow from "./Arrows/LeftArrow";
import {
  leftSmall,
  leftSmallDisabled,
  rightSmall,
  rightSmallDisabled,
} from "../styles/inline";
import SearchContext from "../contexts/SearchStore";

const ArtistTopTracks = () => {
  const { topTracks, setTopTracks, filteredTrack, setFilteredTrack } =
    useContext(SearchContext);

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      setTopTracks(JSON.parse(sessionStorage.getItem("artist-details"))[2]);
    }
  }, []);

  const arrowProps = {
    leftClick: () => setFilteredTrack((prev) => prev - 1),
    rightClick: () => setFilteredTrack((prev) => prev + 1),
  };

  const renderTopTracks = () => {
    if (!topTracks) {
      return (
        <div class="ui placeholder">
          <div class="header">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      );
    } else if (topTracks.noTracks) {
      <h3>No tracks</h3>;
    } else if (topTracks.length > 0 && !topTracks.noTracks) {
      const { album, name } = topTracks[filteredTrack];
      return (
        <div className="item d-flex topTrackItem justify-content-center align-items-center p-1 w-75">
          {filteredTrack === 0 ? (
            <LeftArrow style={leftSmallDisabled} />
          ) : (
            <LeftArrow style={leftSmall} func={arrowProps.leftClick} />
          )}
          {album.images[2] ? (
            <img className="ui avatar image" src={`${album.images[2].url}`} />
          ) : (
            <img className="ui avatar image me-2" src="" />
          )}
          <div className="content topTrackContent">{name}</div>
          {topTracks[filteredTrack] === topTracks[topTracks.length - 1] ? (
            <RightArrow style={rightSmallDisabled} />
          ) : (
            <RightArrow style={rightSmall} func={arrowProps.rightClick} />
          )}
        </div>
      );
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center flex-column topTrackContainer">
      <h2 className="fs-2">Top tracks</h2>
      <hr className="w-25 mt-1" />
      {renderTopTracks()}
    </section>
  );
};

export default ArtistTopTracks;