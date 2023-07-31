import { useContext, ReactElement, useEffect } from "react";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import { gradient1, gradient2 } from "../../styles/inline";
import ArtistDetailsArtist from "./ArtistDetailsArtist";
import ArtistDetailsAlbums from "./ArtistDetailsAlbums";
import ArtistDetailsTopTracks from "./ArtistDetailsTopTracks";
import SearchContext from "../../contexts/searchContext/SearchState";
import { motion } from "framer-motion";
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

  const is992 = useMediaQuery(992);

  useEffect(() => {
    let artistDetails = sessionStorage.getItem("artist-details");

    if (artistDetails && typeof artistDetails === "string") {
      const [artistDetail, albums, topTracks] = JSON.parse(artistDetails);
      setProfile(artistDetail, albums, topTracks);
    }
  }, []);

  const isOneColumn = !artistDetail?.images[0]?.url || is992;

  const containerClasses = isOneColumn
    ? "artist-page-one-column"
    : "artist-page";

  const styles = {
    background: `${is992 ? gradient2 : gradient1} url(${
      artistDetail?.images[0]?.url
    }) no-repeat  center 0px/ 0px`,
  };

  return (
    <>
      {artistDetail && (
        <motion.main className={containerClasses}>
          {is992 && <div className="centered-artist" style={styles} />}
          <ArtistDetailsArtist
            artistDetail={artistDetail}
            isOneColumn={isOneColumn}
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
        </motion.main>
      )}
    </>
  );
};

export default ArtistDetails;
