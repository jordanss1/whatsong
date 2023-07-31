import { ReactNode } from "react";
import { ArtistsType } from "../../types/types";
import { NavigateFunction } from "react-router-dom";
import Spotify from "../Spotify";
import Exit from "../Exit";
import "./styles/artist-details.css";
import Seperator from "../Seperator";

type PropTypes = {
  artistDetail: ArtistsType;
  isOneColumn: boolean;
  navigate: NavigateFunction;
  styles: { background: string };
  children: ReactNode;
};

const ArtistDetailsArtist = ({
  artistDetail,
  isOneColumn,
  navigate,
  styles,
  children,
}: PropTypes) => {
  const { external_urls, name, followers } = artistDetail;

  const renderArtistHeader = (
    <>
      {followers.total ? (
        <>
          <h1 className="fs-1">{name}</h1>
        </>
      ) : (
        <div className="d-flex align-items-baseline">
          <h1 className="fs-1">{name}</h1>
          <Spotify url={external_urls.spotify} size={2} className="ps-3" />
        </div>
      )}
    </>
  );

  const renderFollowers = (
    <div className="d-flex w-100 justify-content-center">
      <Spotify className="pe-5 me-3" url={external_urls.spotify} />
      <Seperator
        style={{ backgroundColor: "rgb(255,255,255,.5)", borderRadius: "10px" }}
        width="1px"
        height="100%"
      />
      <h2 className="fs-5 pt-1 ps-4">
        {followers.total?.toLocaleString("US")} followers
      </h2>
    </div>
  );

  return (
    <>
      <section
        className={`w-100 d-flex
        justify-content-end ${isOneColumn ? "d-none" : ""}`}
      >
        <div className="artist-bg w-100 h-100" style={styles}></div>
      </section>
      <section className={`w-100 h-100 d-grid artist-right`}>
        <div className="d-flex flex-column align-items-center justify-content-center artist-heading">
          <div className="w-100 d-flex justify-content-end pe-5">
            <Exit handleClick={() => navigate("artists")} size={1} />
          </div>
          {renderArtistHeader}
          <hr className="w-50 mt-1" />
          {followers.total && renderFollowers}
        </div>
        {children}
      </section>
    </>
  );
};

export default ArtistDetailsArtist;
