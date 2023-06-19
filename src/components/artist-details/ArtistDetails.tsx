import { useContext, ReactElement, useEffect } from "react";
import Loader from "../modal/ModalLoader";
import SearchContext from "../../contexts/searchContext/SearchState";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import { gradient1, gradient2 } from "../../styles/inline";
import ArtistDetailsAlbums from "./ArtistDetailsAlbums";
import ArtistDetailsTopTracks from "./ArtistDetailsTopTracks";
import { motion } from "framer-motion";
import ArtistDetailsArtist from "./ArtistDetailsArtist";
import "./styles/artist-details.css";

const ArtistDetails = (): ReactElement => {
  const {
    navigate,
    artistDetail,
    album,
    albums,
    setAlbum,
    topTracks,
    topTrack,
    setProfile,
    setTopTrack,
  } = useContext(SearchContext);

  const isWidth992 = useMediaQuery(992);

  useEffect(() => {
    let artistDetails = sessionStorage.getItem("artist-details");

    if (artistDetails && typeof artistDetails === "string") {
      const [artistDetail, albums, topTracks] = JSON.parse(artistDetails);
      setProfile(artistDetail, albums, topTracks);
    }
  }, []);

  const animations = {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  const noArtistImageOrWidth992: boolean =
    !artistDetail?.images[0]?.url || isWidth992;

  const styles = {
    background: `${!isWidth992 ? gradient1 : gradient2} url(${
      artistDetail?.images[0]?.url
    }) no-repeat  center 0px/ 0px`,
  };

  const renderArtist = () => {
    if (!artistDetail) {
      return (
        <div className="artistPage d-grid w-100">
          <section className="w-100 d-flex justify-content-end align-items-center">
            <Loader />
          </section>
          <section className="w-100 h-100 d-grid artistRight">
            <div className="d-flex flex-column align-items-center justify-content-end artistHeading">
              <div className="w-100 d-flex justify-content-end pe-5">
                <i
                  onClick={() => navigate("artists")}
                  className="window close outline icon iconRed fs-1"
                ></i>
              </div>
              <Loader />
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <ArtistDetailsArtist
          artistDetail={artistDetail}
          isWidth992={isWidth992}
          navigate={navigate}
          styles={styles}
        >
          <ArtistDetailsAlbums
            setAlbum={setAlbum}
            album={album}
            albums={albums}
          />
          <ArtistDetailsTopTracks
            setTopTrack={setTopTrack}
            topTracks={topTracks}
            topTrack={topTrack}
          />
        </ArtistDetailsArtist>
      );
    }
  };

  return (
    <motion.main
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className={`${
        noArtistImageOrWidth992
          ? "artistPageOneColumn d-flex flex-column align-items-center"
          : "artistPage d-grid"
      } `}
    >
      {isWidth992 && <div className="centered-artist" style={styles} />}
      {renderArtist()}
    </motion.main>
  );
};

export default ArtistDetails;
