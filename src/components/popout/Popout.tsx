import { type MotionProps, motion } from 'motion/react';
import { type ReactElement, ReactNode } from 'react';
import './styles/popout.css';

interface PopoutPropsType extends MotionProps {
  children: ReactNode;
}

const Popout = ({
  children,
  variants,
  initial,
  animate,
  exit,
  style,
}: PopoutPropsType): ReactElement => {
  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      style={style}
      className="popout"
    >
      {children}
    </motion.div>
  );
};

export default Popout;
