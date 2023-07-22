import { ReactElement } from "react";
import { MotionProps, motion } from "framer-motion";

interface DrabbleBallProps extends MotionProps {
  className?: string;
}

const DraggableBall = ({
  dragConstraints,
  initial,
  animate,
  exit,
  onDrag,
  variants,
  className,
  whileDrag,
  whileTap,
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
      className={className}
    />
  );
};

export default DraggableBall;
