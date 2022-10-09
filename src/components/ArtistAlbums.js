import React, { useContext, useEffect } from "react";
import LeftArrow from "./Arrows/LeftArrow";
import RightArrow from "./Arrows/RightArrow";
import {
  leftStyle,
  leftDisabledStyle,
  rightStyle,
  rightDisabledStyle,
} from "../styles/inline";
import SearchContext from "../contexts/SearchStore";

const ArtistAlbums = () => {
  const { albums, setAlbums, filteredAlbum, setFilteredAlbum } =
    useContext(SearchContext);

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      console.log(JSON.parse(sessionStorage.getItem("artist-details")));
      setAlbums(JSON.parse(sessionStorage.getItem("artist-details"))[1]);
    }
  }, []);

  const arrowProps = {
    leftClick: () => setFilteredAlbum((prev) => prev - 1),
    rightClick: () => setFilteredAlbum((prev) => prev + 1),
  };

  const renderLeftArrow = () => {
    if (!albums) {
      return <div class="ui active centered inline loader"></div>;
    } else if (filteredAlbum === 0 || albums.noAlbums) {
      return <LeftArrow style={leftDisabledStyle} />;
    } else {
      return <LeftArrow func={arrowProps.leftClick} style={leftStyle} />;
    }
  };

  const renderRightArrow = () => {
    if (!albums) {
      return <div class="ui active centered inline loader"></div>;
    } else if (
      albums[filteredAlbum] === albums[albums.length - 1] ||
      albums.noAlbums
    ) {
      return <RightArrow style={rightDisabledStyle} />;
    } else {
      return <RightArrow func={arrowProps.rightClick} style={rightStyle} />;
    }
  };

  const renderAlbums = () => {
    if (!albums) {
      <div className="ui raised centered card albumCard">
        <div className="image">
          <div class="ui active centered inline loader"></div>
        </div>
        <div className="content"></div>
      </div>;
    } else if (albums.noAlbums) {
      return <h3 className="align-self-center">No albums</h3>;
    } else if (albums.length > 0 && !albums.noAlbums) {
      const { name, images } = albums[filteredAlbum];

      return (
        <div className="ui raised card albumCard">
          <div className="image d-flex justify-content-center pt-1 ps-1">
            {images[1] ? <img src={`${images[1].url}`} /> : <h3>No image</h3>}
          </div>
          <div className="content d-flex align-items-center justify-content-center p-0">
            <h3 className="header fs-5 text-center w-100 px-1">{name}</h3>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly mt-4">
      {renderLeftArrow()}
      {renderAlbums()}
      {renderRightArrow()}
    </section>
  );
};

export default ArtistAlbums;
