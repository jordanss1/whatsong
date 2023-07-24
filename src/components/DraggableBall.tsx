import { ReactElement } from "react";
import { MotionProps, motion } from "framer-motion";

interface DrabbleBallProps extends MotionProps {
  className?: string;
  invisibleClass?: string;
  onPointerDown?: () => void;
  onPointerUp?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
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
  onPointerUp,
  onPointerDown,
  onPointerMove,
  style,
}: DrabbleBallProps): ReactElement => {
  return (
    <motion.div
      drag
      layout
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove ? (e) => onPointerMove(e) : () => {}}
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
