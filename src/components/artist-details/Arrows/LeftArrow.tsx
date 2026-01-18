import { motion, type MotionProps } from 'framer-motion';
import { memo, type ReactElement } from 'react';
import '../styles/artist-details.css';

interface LeftArrowPropsType extends MotionProps {
  setAlbumOrTrack: () => void;
  className: string;
  testId: 'smallLeft' | 'bigLeft';
}

type LeftArrowType = (props: LeftArrowPropsType) => ReactElement;

const LeftArrow: LeftArrowType = ({
  setAlbumOrTrack,
  className,
  testId,
  whileHover,
  whileTap,
  variants,
  custom,
}) => {
  return (
    <motion.div
      variants={variants}
      custom={custom}
      whileHover={whileHover}
      whileTap={whileTap}
      data-testid={testId}
      onClick={setAlbumOrTrack}
      className={`d-flex align-items-center ${className}`}
    >
      <i className="left chevron icon" />
    </motion.div>
  );
};

export default memo(LeftArrow);
