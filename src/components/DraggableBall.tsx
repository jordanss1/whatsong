import { ReactElement, useEffect, useState } from "react";
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
}: DrabbleBallProps): ReactElement => {
  const [allowScroll, setAllowScroll] = useState(false);

  useEffect(() => {
    if (allowScroll) {
      const handleTouch = (event) => {
        event.stopPropagation();
        console.log(event.type);
      };

      document.documentElement.addEventListener("touchmove", handleTouch);
      return () =>
        document.documentElement.removeEventListener("touchmove", handleTouch);
    }
  }, [allowScroll]);

  return (
    <motion.div
      drag
      layout
      onDragStart={(e, i) =>
        setAllowScroll(Math.abs(i.delta.y) > Math.abs(i.delta.x))
      }
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
      custom={custom}
      style={style}
    >
      <motion.div layout className={invisibleClass} />
    </motion.div>
  );
};

export default DraggableBall;
