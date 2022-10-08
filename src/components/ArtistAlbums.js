import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";

const ArtistAlbums = () => {
  const { albums, setAlbums, filteredElement, setFilteredElement } =
    useContext(SearchContext);

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      console.log(JSON.parse(sessionStorage.getItem("artist-details")));
      setAlbums(JSON.parse(sessionStorage.getItem("artist-details"))[1]);
    }
  }, []);

  const renderAlbums = () => {
    if (!albums) {
      <div className="ui raised centered card albumCard">
        <div className="image">
          <div class="ui active centered inline loader"></div>
        </div>
        <div className="content"></div>
      </div>;
    } else if (albums.noAlbums) {
      return;
    } else if (albums.length > 0) {
      console.log(albums);
      const { name, images } = albums[filteredElement];
      return (
        <div className="ui raised card albumCard">
          <div className="image d-flex justify-content-center pt-1 ps-1">
            <img src={`${images[1].url}`} />
          </div>
          <div className="content d-flex align-items-center justify-content-center p-0">
            <h3 className="header text-center w-100">{name}</h3>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly">
      <div className="h-100 d-flex align-items-center">
        <i className="left chevron icon  mb-5"></i>
      </div>
      {renderAlbums()}
      <div className="h-100 d-flex align-items-center">
        <i className="right chevron icon align-self-center mb-5"></i>
      </div>
    </section>
  );
};

export default ArtistAlbums;
