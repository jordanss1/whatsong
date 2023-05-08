import { ReactElement } from "react";
import { HandleProfileClickType } from "./SearchList";
import { ArtistDetailsType } from "../types";

const ArtistList = ({
  handleProfileClick,
  slicedElements,
  artists,
}: {
  handleProfileClick: HandleProfileClickType;
  slicedElements: number[];
  artists: ArtistDetailsType[];
}): ReactElement => {
  return (
    <>
      <div className="d-sm-grid d-flex flex-column ms-2 align-items-center justify-content-md-center p-5 p-xl-0 artistGrid">
        {artists
          .slice(slicedElements[0], slicedElements[1])
          .map(({ external_urls, name, images, id }, i) => {
            return (
              <div role="artist-card" className="artistContainer" key={i}>
                <article className="ui fluid card">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleProfileClick(id)}
                    className="image"
                  >
                    {!images[0] ? (
                      <div className="artistImage d-flex align-items-center justify-content-center">
                        <h3>No image</h3>
                      </div>
                    ) : (
                      <img
                        className="artistImage p-1"
                        src={images ? images[0].url : ""}
                      />
                    )}
                  </div>
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
