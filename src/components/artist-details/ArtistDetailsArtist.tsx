import { ReactNode } from "react";
import { ArtistDetailsType } from "../../types";
import { NavigateFunction } from "react-router-dom";

type PropTypes = {
  artistDetail: ArtistDetailsType;
  isWidth992: boolean;
  navigate: NavigateFunction;
  styles: { background: string };
  children: ReactNode;
};

const ArtistDetailsArtist = ({
  artistDetail,
  isWidth992,
  navigate,
  styles,
  children,
}: PropTypes) => {
  const { external_urls, name, followers, images } = artistDetail;

  const imageExistsOrWidth992: boolean = !images[0]?.url || isWidth992;

  return (
    <>
      <section
        className={`w-100 artistLeft ${
          imageExistsOrWidth992 ? "d-none" : ""
        } d-flex
                 justify-content-end`}
      >
        <div className="artistBg w-100 h-100" style={styles}></div>
      </section>
      <section className={`w-100 h-100 d-grid artistRight`}>
        <div className="d-flex flex-column align-items-center justify-content-center artistHeading">
          <div className="w-100 d-flex justify-content-end pe-5">
            <i
              data-testid="red-x"
              onClick={() => navigate("artists")}
              className="window close outline icon iconRed fs-1"
            ></i>
          </div>
          <h1 className="fs-1">{name}</h1>
          <hr className="w-50 mt-1" />
          <div className="d-flex flex-row w-75 justify-content-center ms-5">
            <i
              title={external_urls.spotify}
              onClick={() => window.open(external_urls.spotify, "_blank")}
              className="spotify icon fs-1 pe-5 me-3"
            ></i>
            <div className="vl"></div>
            <h2 className="fs-5 pt-1 ps-4">{`${followers.total.toLocaleString(
              "US"
            )} followers`}</h2>
          </div>
        </div>
        {children}
      </section>
    </>
  );
};

export default ArtistDetailsArtist;
