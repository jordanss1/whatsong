import { ReactElement } from "react";
import { MotionProps, motion } from "framer-motion";

interface SeperatorPropsType extends MotionProps {
  width: string;
  height: string;
  className?: string;
}

const Seperator = ({
  width,
  height,
  variants,
  style,
  initial,
  animate,
  exit,
  custom,
  className,
}: SeperatorPropsType): ReactElement => {
  return (
    <div>
      <motion.div
        style={{ ...style, width, height }}
        variants={variants}
        custom={custom}
        animate={animate}
        initial={initial}
        exit={exit}
        className={className}
      />
    </div>
  );
};

export default Seperator;
