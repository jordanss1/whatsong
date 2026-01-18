import { type MotionProps, motion } from 'motion/react';
import { type ReactElement } from 'react';

interface SeperatorPropsType extends MotionProps {
  width: string;
  height: string;
  color?: string;
  sharp?: boolean;
  className?: string;
}

const Seperator = ({
  color,
  sharp,
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
  const backgroundColor = color ?? 'rgb(255,255,255)';
  const borderRadius = sharp ? '0' : '10px';

  return (
    <div>
      <motion.div
        style={{ ...style, width, height, backgroundColor, borderRadius }}
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
