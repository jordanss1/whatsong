import {
  motion,
  type MotionProps,
  type MotionStyle,
  type Variants,
} from 'motion/react';
import { type ReactElement } from 'react';
import { useScreenSize } from '../hooks/MediaQueryHook';
import { type TopTracksDetailsType } from '../types/types';
import ImageCard from './ImageCard';
import Seperator from './Seperator';
import TrackDetailLine from './TrackDetailLine';

interface TrackDetailPropsType extends MotionProps {
  selectedTrack: Required<TopTracksDetailsType>;
  imageVariants: Variants;
  lineVariants: Variants;
}

const TrackDetail = ({
  selectedTrack,
  imageVariants,
  lineVariants,
}: TrackDetailPropsType): ReactElement => {
  const { album, artists, duration_ms, name, track_number } = selectedTrack;
  const screenWidth = useScreenSize();

  const durationConvert = (): string => {
    const seconds = Math.floor((duration_ms / 1000) % 60);
    const minutes = Math.floor((duration_ms / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  const songLength = durationConvert();

  let artist = artists
    .map((artist) => artist.name)
    .toString()
    .replaceAll(',', ', ');

  const releaseDate = album.release_date.slice(0, 4);
  const trackOf = `Track ${track_number} of ${album.total_tracks}`;
  const albumImage = album.images[0].url;
  const albumType = album.album_type === 'single' ? 'Single' : album.name;
  const albumDetail = album.album_type === 'single' ? releaseDate : trackOf;

  const lineStyle: MotionStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const albumStyle: MotionStyle =
    album.album_type === 'single'
      ? {
          minWidth: '100px',
          textAlign: 'end',
        }
      : {
          maxWidth: screenWidth < 851 ? '350px' : '180px',
          minWidth: '100px',
          textAlign: 'center',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        };

  return (
    <motion.div className="d-flex flex-column song-item w-100 pt-4 align-items-center">
      <ImageCard
        variants={imageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        style={{ borderRadius: '20px' }}
        custom={albumImage}
        url={albumImage}
        iconSize={100}
      />
      <motion.div
        style={{ height: '230px' }}
        className={`pt-4 pb-4 d-flex flex-column justify-content-evenly w-100 ${
          screenWidth < 851 && 'px-4'
        }`}
      >
        <TrackDetailLine variants={lineVariants} custom={0.1}>
          <motion.span
            style={{
              maxWidth: screenWidth < 851 ? '450px' : '379px',
              ...lineStyle,
            }}
            className="fw-bold fs-2 text-center"
          >
            {artist}
          </motion.span>
        </TrackDetailLine>
        <TrackDetailLine variants={lineVariants} custom={0.2}>
          <motion.span
            style={
              screenWidth > 850
                ? {
                    minWidth: '100px',
                    maxWidth: '250px',
                    ...lineStyle,
                  }
                : albumStyle
            }
            className="pe-3"
          >
            {name}
          </motion.span>
          <Seperator sharp={false} width="2px" height="25px" />
          <motion.span style={{ minWidth: '100px' }} className="ps-3">
            {songLength}
          </motion.span>
        </TrackDetailLine>
        <TrackDetailLine variants={lineVariants} custom={0.3}>
          <motion.span
            style={albumStyle}
            className={`pe-${album.album_type === 'album' && 1}`}
          >
            {albumType}
          </motion.span>
          {albumType === 'Single' && (
            <motion.span
              style={{
                minWidth: '30px',
                textAlign: 'center',
              }}
            >
              -
            </motion.span>
          )}
          <motion.span
            style={{
              minWidth: '110px',
              textAlign: albumType === 'Single' ? 'start' : 'center',
            }}
            className={`ps-${album.album_type === 'album' && 3}`}
          >
            {albumDetail}
          </motion.span>
        </TrackDetailLine>
      </motion.div>
    </motion.div>
  );
};

export default TrackDetail;
