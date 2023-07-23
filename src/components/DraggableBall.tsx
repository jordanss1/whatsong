import { ReactElement } from "react";
import { MotionProps, motion } from "framer-motion";

interface DrabbleBallProps extends MotionProps {
  className?: string;
}

const DraggableBall = ({
  initial,
  animate,
  exit,
  onDrag,
  variants,
  className,
  whileDrag,
  whileTap,
  dragConstraints,
  dragSnapToOrigin,
  dragElastic,
  dragMomentum,
  style,
}: DrabbleBallProps): ReactElement => {
  return (
    <motion.div
      drag
      layout
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      onDrag={onDrag}
      whileDrag={whileDrag}
      whileTap={whileTap}
      dragConstraints={dragConstraints}
      dragSnapToOrigin={dragSnapToOrigin}
      dragElastic={dragElastic}
      dragMomentum={dragMomentum}
      className={className}
      style={style}
    />
  );
};

export default DraggableBall;
