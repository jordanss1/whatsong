import { type Variants, motion } from 'framer-motion';
import { type ReactElement, useContext, useEffect } from 'react';
import SearchContext from '../../contexts/SearchState';
import { useMediaQuery } from '../../hooks/MediaQueryHook';
import { gradient1, gradient2 } from '../../styles/inline';
import ArtistDetailsAlbums from './ArtistDetailsAlbums';
import ArtistDetailsArtist from './ArtistDetailsArtist';
import ArtistDetailsTopTracks from './ArtistDetailsTopTracks';
import './styles/artist-details.css';

const artistDetailMainVariants: Variants = {
  initial: (isOneColumn) => ({
    background:
      'radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)',
    gridTemplateColumns: isOneColumn ? '0% 0%' : '100% 0%',
    justifyItems: isOneColumn ? '' : 'center',
    alignItems: isOneColumn ? '' : 'center',
  }),
  animate: (isOneColumn) => ({
    background:
      'radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%)',
    gridTemplateColumns: isOneColumn ? '0% 0%' : '50% 50%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      gridTemplateColumns: {
        delay: 1.5,
        duration: 0.8,
      },
      background: {
        when: 'beforeChildren',
        delay: 0.5,
        duration: 0.5,
      },
    },
  }),
  exit: {
    background: [
      'radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%)',
      'radial-gradient(circle at 100% 0%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)',
      'radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)',
    ],
    transition: {
      when: 'afterChildren',
      duration: 1,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

const backgroundVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.5,
    },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

const ArtistDetails = (): ReactElement => {
  const {
    navigate,
    artistDetail,
    album,
    albums,
    topTracks,
    topTrack,
    setProfile,
    setAlbumOrTrack,
  } = useContext(SearchContext);

  const is992 = useMediaQuery(992);

  useEffect(() => {
    let artistDetails = sessionStorage.getItem('artist-details');

    if (artistDetails && typeof artistDetails === 'string') {
      const [artistDetail, albums, topTracks] = JSON.parse(artistDetails);
      setProfile(artistDetail, albums, topTracks);
    }
  }, []);

  const isOneColumn = !artistDetail?.images[0]?.url || is992;

  const containerClasses = isOneColumn
    ? 'artist-page-one-column'
    : 'artist-page';

  const styles = {
    background: `${is992 ? gradient2 : gradient1} url(${
      artistDetail?.images[0]?.url
    }) no-repeat  center 0px/ 0px`,
  };

  return (
    <>
      {artistDetail && (
        <motion.main
          variants={artistDetailMainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout
          custom={isOneColumn}
          className={containerClasses}
        >
          {is992 && (
            <motion.div
              variants={backgroundVariants}
              className="centered-artist"
              style={styles}
            />
          )}
          <ArtistDetailsArtist
            artistDetail={artistDetail}
            isOneColumn={isOneColumn}
            navigate={navigate}
            styles={styles}
          >
            <ArtistDetailsAlbums
              setAlbum={setAlbumOrTrack}
              album={album}
              albums={albums}
            />
            <ArtistDetailsTopTracks
              setTopTrack={setAlbumOrTrack}
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
