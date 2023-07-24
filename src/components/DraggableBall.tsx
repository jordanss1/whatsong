import { ReactElement } from "react";
import { MotionProps, motion } from "framer-motion";

interface DrabbleBallProps extends MotionProps {
  className?: string;
  invisibleClass?: string;
}

const DraggableBall = ({
  initial,
  animate,
  exit,
  onDrag,
  onDragEnd,
  variants,
  className,
  whileDrag,
  whileTap,
  dragConstraints,
  dragSnapToOrigin,
  dragElastic,
  dragMomentum,
  dragPropagation,
  invisibleClass,
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
      onDragEnd={onDragEnd}
      whileDrag={whileDrag}
      whileTap={whileTap}
      dragConstraints={dragConstraints}
      dragSnapToOrigin={dragSnapToOrigin}
      dragElastic={dragElastic}
      dragMomentum={dragMomentum}
      dragPropagation={dragPropagation}
      className={className}
      style={style}
    >
      <motion.div className={invisibleClass} />
    </motion.div>
  );
};

export default DraggableBall;
