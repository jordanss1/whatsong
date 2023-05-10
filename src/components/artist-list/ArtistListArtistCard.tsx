import { ReactElement } from "react";
import { HandleProfileClickType } from "./ArtistList";

type PropsType = {
  url: string;
  name: string;
  image: { height: number; url: string; width: number };
  id: string;
  handleProfileClick: HandleProfileClickType;
};

const ArtistListArtistCard = ({
  url,
  name,
  image,
  id,
  handleProfileClick,
}: PropsType): ReactElement => {
  return (
    <div role="artist-card" className="artistContainer">
      <article className="ui fluid card">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleProfileClick(id)}
          className="image"
        >
          {image ? (
            <img className="artistImage p-1" src={image.url} />
          ) : (
            <div className="artistImage d-flex align-items-center justify-content-center">
              <h3>No image</h3>
            </div>
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
            title={url}
            onClick={() => window.open(url, "_blank")}
            className="spotify icon fs-4"
          ></i>
        </div>
      </article>
    </div>
  );
};

export default ArtistListArtistCard;
