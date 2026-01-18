import { motion, type MotionStyle, type Variants } from 'motion/react';
import { type ReactElement } from 'react';
import { useScreenSize } from '../../../hooks/MediaQueryHook';
import { type TopTracksDetailsType } from '../../../types/types';
import CircularImage from '../../CircularImage';
import Track from '../../Track';

type TrackListGridItemTrackPropsType = {
  isMobile: boolean;
  index: number;
  style: MotionStyle;
  track: Required<TopTracksDetailsType>;
};

const trackVariant: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: (index) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
  exit: (index) => ({
    x: 100,
    opacity: 0,
    transition: { duration: 0.1, delay: 0.1 * index },
  }),
};

const trackMobileVariant: Variants = {
  initial: {
    x: -50,
    opacity: 0,
  },
  animate: (index) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
  exit: (index) => ({
    x: 50,
    opacity: 0,
    transition: { duration: 0.1, delay: 0.1 * index },
  }),
};

const TrackListGridItemTrack = ({
  isMobile,
  index,
  style,
  track,
}: TrackListGridItemTrackPropsType): ReactElement => {
  const width = useScreenSize();

  const image = track.album?.images?.[0]?.url;
  const artist = `${track.artists[0]?.name} - `;
  let artistSize = 2;
  let trackSize = 3;

  if (width < 851) {
    artistSize += 1;
    trackSize += 1;
  }

  if (width < 600) {
    artistSize += 1;
    trackSize += 1;
  }

  if (width < 480) {
    artistSize += 1;
    trackSize += 1;
  }

  return (
    <motion.div
      layout
      variants={isMobile ? trackMobileVariant : trackVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      key={index}
      data-testid="song-item"
      className="track-item-container w-100"
    >
      <motion.div
        layout
        style={style}
        className="track-item d-grid align-items-center p-3"
      >
        <CircularImage image={image} size={1} />
        <Track
          artist={artist}
          track={track.name}
          artistSize={artistSize}
          trackSize={trackSize}
        />
      </motion.div>
    </motion.div>
  );
};

export default TrackListGridItemTrack;
