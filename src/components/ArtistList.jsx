import React from "react";

const ArtistList = ({ handleProfileClick, slicedElements, items }) => {
  return (
    <>
      <div className="d-sm-grid d-flex flex-column ms-2 align-items-center justify-content-md-center p-5 p-xl-0 artistGrid">
        {items
          .slice(slicedElements[0], slicedElements[1])
          .map(({ external_urls, name, images, id }, i) => {
            return (
              <div role="artist-card" className="artistContainer" key={i}>
                <article className="ui fluid card">
                  {!images[0] ? (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProfileClick(id)}
                      className="image p-5"
                    >
                      <h3>No image</h3>
                    </div>
                  ) : (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProfileClick(id)}
                      className="image pb-0"
                    >
                      <img
                        className="artistImage p-1"
                        src={images ? images[0].url : ""}
                      />
                    </div>
                  )}
                  <div className="content artistContent ps-2 pt-1 d-flex justify-content-center justify-content-evenly align-content-center p-0">
                    <i
                      onClick={() => handleProfileClick(id)}
                      title="View artist profile"
                      className="user icon fs-4"
                    ></i>
                    <a href="" className="header text-center fs-5 pt-2">
                      {name}
                    </a>
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
