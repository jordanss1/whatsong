import { AnimatePresence, motion, useCycle, type Variants } from 'motion/react';
import { memo, type ReactElement, useEffect } from 'react';
import { type SetAlbumOrTrackType } from '../../hooks/DetailedArtistResultHooks';
import { type AlbumDetailsType } from '../../types/types';
import LeftArrow from './Arrows/LeftArrow';
import RightArrow from './Arrows/RightArrow';
import ArtistDetailsAlbumCard from './ArtistDetailsAlbumCard';
import './styles/artist-details.css';

type ArtistDetailsAlbumsPropsType = {
  album: AlbumDetailsType | null;
  setAlbum: SetAlbumOrTrackType;
  albums: AlbumDetailsType[] | null;
};

const albumsVariants: Variants = {
  initial: {
    x: -70,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeOut',
    },
  },
  exit: {
    x: 70,
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

const rightArrowVariants: Variants = {
  hover: (albums) =>
    albums && albums?.length > 1
      ? {
          background:
            'linear-gradient(to right,rgba(255, 255, 255, 0) 20%,rgba(255, 255, 255, 0.35)100%)',
          scale: [null, 1.1],
        }
      : {},
  tap: (albums) =>
    albums && albums?.length > 1
      ? {
          background:
            'linear-gradient(to right,rgba(255, 255, 255, 0) 70%,rgba(255, 255, 255, 0.1)100%)',
          scale: [null, 0.8],
        }
      : {},
};

const leftArrowVariants: Variants = {
  hover: (albums) =>
    albums && albums?.length > 1
      ? {
          background:
            'linear-gradient(to left, rgba(255, 255, 255, 0) 10%,rgba(255, 255, 255, 0.35) 100%)',
          scale: [null, 1.1],
        }
      : {},
  tap: (albums) =>
    albums && albums?.length > 1
      ? {
          background:
            'linear-gradient(to left,rgba(255, 255, 255, 0) 70%,rgba(255, 255, 255, 0.1) 100%)',
          scale: [null, 0.8],
        }
      : {},
};

const ArtistDetailsAlbums = ({
  setAlbum,
  album,
  albums,
}: ArtistDetailsAlbumsPropsType): ReactElement => {
  const leftClasses = `justify-content-start arrows ${
    album && albums ? 'left-arrow' : 'left-arrow-disabled'
  }`;

  const rightClasses = `justify-content-end arrows ${
    album && albums ? 'right-arrow' : 'right-arrow-disabled'
  }`;

  const [direction, cycleDirection] = useCycle<'left' | 'right'>(
    'left',
    'right'
  );

  const [changed, cycleChanged] = useCycle(false, true);

  useEffect(() => {
    let timer: number | ReturnType<typeof setTimeout> | undefined;

    if (timer) clearTimeout(timer);

    if (changed) {
      timer = setTimeout(() => {
        cycleChanged(0);
      }, 250);
    }

    return () => clearTimeout(timer);
  }, [changed]);

  const handleAlbum = (direction: 'left' | 'right') => {
    let timer: ReturnType<typeof setTimeout>;

    if (albums && albums?.length > 1) {
      cycleDirection(direction === 'left' ? 0 : 1);

      timer = setTimeout(() => {
        cycleChanged(1);
        setAlbum(direction, 'album');
      }, 50);
    }

    return () => clearTimeout(timer);
  };

  return (
    <motion.section
      key="albums"
      variants={albumsVariants}
      className="d-flex flex-row justify-content-center align-items-center justify-content-evenly album-container"
    >
      <LeftArrow
        variants={leftArrowVariants}
        custom={albums}
        whileHover="hover"
        whileTap="tap"
        setAlbumOrTrack={() => handleAlbum('left')}
        testId="bigLeft"
        className={leftClasses}
      />
      <motion.div style={{ minWidth: '170px' }}>
        <AnimatePresence mode="wait">
          {!changed && (
            <ArtistDetailsAlbumCard direction={direction} album={album} />
          )}
        </AnimatePresence>
      </motion.div>
      <RightArrow
        variants={rightArrowVariants}
        custom={albums}
        whileHover="hover"
        whileTap="tap"
        setAlbumOrTrack={() => handleAlbum('right')}
        testId="bigRight"
        className={rightClasses}
      />
    </motion.section>
  );
};

export default memo(ArtistDetailsAlbums);
