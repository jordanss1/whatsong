import { type MotionProps, motion } from 'motion/react';
import { type ReactElement } from 'react';

interface DrabbleBallProps extends MotionProps {
  index: number;
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
  custom,
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
  index,
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
      whileTap={whileTap}
      dragConstraints={dragConstraints}
      dragSnapToOrigin={dragSnapToOrigin}
      dragElastic={dragElastic}
      dragMomentum={dragMomentum}
      dragPropagation={dragPropagation}
      className={className}
      custom={custom}
      style={style}
      data-testid={`draggable-ball-${index}`}
    >
      <motion.div layout className={invisibleClass} />
    </motion.div>
  );
};

export default DraggableBall;
