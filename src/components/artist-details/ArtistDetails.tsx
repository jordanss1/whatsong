import { useContext, ReactElement, useEffect } from "react";
import Loader from "../Loader";
import SearchContext from "../../contexts/SearchState";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import { gradient1, gradient2, gradient3 } from "../../styles/inline";
import ArtistDetailsAlbums from "./ArtistDetailsAlbums";
import ArtistDetailsTopTracks from "./ArtistDetailsTopTracks";
import { motion } from "framer-motion";
import ArtistDetailsArtist from "./ArtistDetailsArtist";

const ArtistDetails = (): ReactElement => {
  const {
    navigate,
    artistDetail,
    album,
    setAlbum,
    setAlbumIndex,
    totalAlbums,
    topTracks,
    totalTopTracks,
    filteredTrack,
    setFilteredTrack,
    setProfile,
    setAnimateStateList,
  } = useContext(SearchContext);

  const isWidth992 = useMediaQuery(992);
  const isHeight1025 = useMediaQuery(1025, true);

  useEffect(() => {
    let artistDetails = sessionStorage.getItem("artist-details");

    if (artistDetails && typeof artistDetails === "string") {
      const [artistDetail, albums, topTracks] = JSON.parse(artistDetails);
      setProfile(artistDetail, albums, topTracks);
    }

    setAnimateStateList({ x: 300, opacity: 0 }, { x: 300, opacity: 0 });
  }, []);

  const animations = {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  const imageExistsOrWidth992: boolean =
    !artistDetail?.images[0]?.url || isWidth992;

  const styles = {
    background: `${
      !isWidth992
        ? `${gradient1} url(${artistDetail?.images[0]?.url})`
        : `${isHeight1025 ? gradient2 : gradient3} url(${
            artistDetail?.images[0]?.url
          })`
    }
             no-repeat ${
               !isWidth992
                 ? "50px"
                 : `center ${!isHeight1025 ? "230px" : "130px"}`
             }/ ${!isWidth992 ? "640px" : "400px"}`,
  };

  const renderArtist = () => {
    if (!artistDetail) {
      return (
        <div className="artistPage d-grid w-100">
          <section className="w-100 artistLeft d-flex justify-content-end align-items-center">
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
            setAlbumIndex={setAlbumIndex}
            album={album}
            totalAlbums={totalAlbums}
          />
          <ArtistDetailsTopTracks
            topTracks={topTracks}
            totalTopTracks={totalTopTracks}
            filteredTrack={filteredTrack}
            setFilteredTrack={setFilteredTrack}
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
        imageExistsOrWidth992
          ? "artistPageOneColumn d-flex flex-column align-items-center"
          : "artistPage d-grid"
      } `}
      style={isWidth992 ? styles : {}}
    >
      {renderArtist()}
    </motion.main>
  );
};

export default ArtistDetails;
