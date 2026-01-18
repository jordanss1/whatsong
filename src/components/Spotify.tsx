import { type MotionProps, motion } from 'motion/react';
import { type ReactElement } from 'react';

interface SpotifyPropsType extends MotionProps {
  url?: string;
  size?: number;
  className?: string;
}

const Spotify = ({
  url,
  size,
  className,
  style,
  variants,
  initial,
  animate,
  exit,
}: SpotifyPropsType): ReactElement => {
  size = size ?? 1;

  return (
    <motion.i
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      style={style}
      title={url ? url : ''}
      onClick={() => (url ? window.open(url, '_blank') : {})}
      className={`spotify icon fs-${size} ${className}`}
      data-testid="spotify-icon"
    />
  );
};

export default Spotify;
