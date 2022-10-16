import React, { useContext } from "react";
import SearchContext from "../contexts/SearchStore";
import SearchBar from "./SearchBar";
import { spotifyArtistAndAlbum } from "../api";

const ArtistList = () => {
  const {
    slicedElements,
    items,
    navigate,
    setAnimateStateList,
    setAlbums,
    setArtist,
    setTopTracks,
  } = useContext(SearchContext);

  const handleProfileClick = (id) => {
    spotifyArtistAndAlbum(id, [setArtist, setAlbums, setTopTracks]);
    setAnimateStateList({
      initial: { x: 300, opacity: 0 },
      exit: { x: 300, opacity: 0 },
    });
    setTimeout(() => {
      navigate(`/artists/${id}`);
    }, 200);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row searchListDiv align-self-lg-end border rounded-3">
        <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Artists</h2>
        <SearchBar />
      </div>
      <div className="d-sm-grid d-flex flex-column ms-2 align-items-center justify-content-md-center p-5 p-xl-0 artistGrid">
        {items
          .slice(slicedElements[0], slicedElements[1])
          .map(({ external_urls, name, images, id }, i) => {
            return (
              <div className="artistContainer" key={i}>
                <article className="ui fluid card">
                  {!images.length ? (
                    <div className="image p-5">
                      <h3>No image</h3>
                    </div>
                  ) : (
                    <div style={{ cursor: "pointer" }} className="image pb-0">
                      <img
                        className="artistImage p-1"
                        src={images ? images[0].url : ""}
                      />
                    </div>
                  )}
                  <div className="content artistContent ps-2 pt-1  d-flex justify-content-center justify-content-evenly align-content-center p-0">
                    <i
                      onClick={() => handleProfileClick(id)}
                      title="View artist profile"
                      className="user icon fs-4"
                    ></i>
                    <a className="header text-center fs-5 pt-2">{name}</a>
                    <i
                      title={external_urls.spotify}
                      onClick={() =>
                        window.open(external_urls.spotify, "_blank")
                      }
                      className="spotify icon fs-4"
                    ></i>
                  </div>
                </article>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ArtistList;
