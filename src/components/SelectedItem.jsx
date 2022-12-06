import React, { useCallback, useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";
import ArtistAlbums from "./ArtistAlbums";
import ArtistTopTracks from "./ArtistTopTracks";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { gradient1, gradient2, gradient3 } from "../styles/inline";

const SelectedItem = () => {
  const {
    selectedItem,
    setSelectedItem,
    artist,
    albums,
    filteredTrack,
    topTracks,
    filteredAlbum,
    setFilteredAlbum,
    setFilteredTrack,
    setProfile,
    typeString,
    navigate,
    setAnimateStateList,
  } = useContext(SearchContext);

  const classFlex = selectedItem ? "flex-column" : "";

  const responsiveFunc = (image) => {
    if (!image || window.innerWidth < 992) {
      return "d-none";
    }
  };

  const animations = {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      const [artist, albums, topTracks] = JSON.parse(
        sessionStorage.getItem("artist-details")
      );
      setProfile(artist, albums, topTracks);
    }
    setAnimateStateList({ x: 300, opacity: 0 }, { x: 300, opacity: 0 });
  }, []);

  const durationConvert = useCallback(
    (milliseconds) => {
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

      return [
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");
    },
    [selectedItem]
  );

  const oneColumnWidth = (image) => {
    if (!image && window.innerWidth > 576) {
      return "w-75";
    } else if (image && window.innerWidth > 1200) {
      return "w-100";
    }
  };

  const renderSong = () => {
    if (!selectedItem) {
      return (
        <div
          className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-evenly`}
        >
          <h2 className="ui header noSongHeader ps-1 mb-5">
            Search spotify songs
            <div className="sub header">
              Selected <b>details</b> will appear here
            </div>
          </h2>
        </div>
      );
    } else {
      const { album, artists, duration_ms, name, track_number } = selectedItem;
      return (
        <div
          className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-evenly`}
        >
          <div className="w-100 d-flex justify-content-end align-items-center mt-2 pb-3">
            <i
              onClick={() => setSelectedItem(null)}
              className="window close outline icon iconRed fs-4"
            ></i>
          </div>
          <div className="d-flex flex-column ms-0 mb-5 songItem justify-content-evenly">
            {album.images[1].url ? (
              <img className="rounded" src={album.images[1].url} />
            ) : (
              <h3>No album cover</h3>
            )}
            <div className="ui items mt-0 description">
              <div className="item">
                <ul className="content d-flex flex-column justify-content-start justify-content-evenly align-content-center contentDescription">
                  <li className=" text-center">{`${name} by ${artists[0].name}`}</li>
                  <li className="text-center">{`${
                    album.album_type === "single" ? "Single:" : "Album:"
                  } ${album.name}`}</li>
                  <div className="text-center ">
                    <li className="">{`Track ${track_number} of ${album.total_tracks}`}</li>
                  </div>
                  <li className="text-center mt-0">
                    Duration {durationConvert(duration_ms)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderArtist = () => {
    if (!artist) {
      return (
        <main className="artistPage d-grid">
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
        </main>
      );
    } else {
      const { external_urls, name, followers, images } = artist;

      const styles = {
        background: `${
          window.innerWidth > 992
            ? `${gradient1} url(${images[0]?.url})`
            : `${window.innerHeight < 1025 ? gradient2 : gradient3} url(${
                images[0]?.url
              })`
        }
         no-repeat ${
           window.innerWidth > 992
             ? "50px"
             : `center ${window.innerHeight > 1000 ? "230px" : "130px"}`
         }/ ${window.innerWidth > 992 ? "640px" : "400px"}`,
      };

      return (
        <motion.main
          variants={animations}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className={`${
            !images[0]?.url || window.innerWidth < 992
              ? "artistPageOneColumn d-flex flex-column align-items-center"
              : "artistPage d-grid"
          } `}
          style={window.innerWidth < 992 ? styles : {}}
        >
          <section
            className={`w-100 artistLeft ${responsiveFunc(
              images[0]?.url
            )} d-flex
             justify-content-end`}
          >
            <div className="artistBg w-100 h-100" style={styles}></div>
          </section>
          <section className={`w-100 h-100 d-grid artistRight`}>
            <div className="d-flex flex-column align-items-center justify-content-center artistHeading">
              <div className="w-100 d-flex justify-content-end pe-5">
                <i
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
            <ArtistAlbums
              albums={albums}
              filteredAlbum={filteredAlbum}
              setFilteredAlbum={setFilteredAlbum}
            />
            <ArtistTopTracks
              topTracks={topTracks}
              filteredTrack={filteredTrack}
              setFilteredTrack={setFilteredTrack}
            />
          </section>
        </motion.main>
      );
    }
  };

  return <>{typeString === "track" ? renderSong() : renderArtist()}</>;
};

export default SelectedItem;
