import { type MotionProps, motion } from 'motion/react';
import { type ReactElement, ReactNode } from 'react';

interface TrackDetailLinePropsType extends MotionProps {
  size?: number;
  className?: string;
  children: ReactNode;
}

const TrackDetailLine = ({
  size,
  className,
  variants,
  custom,
  children,
}: TrackDetailLinePropsType): ReactElement => {
  size = size ?? 3;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      custom={custom}
      className={`d-flex fs-${size} align-items-center gap-1 justify-content-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TrackDetailLine;
