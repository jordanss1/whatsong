import { ReactElement } from "react";
import { MotionProps, motion } from "framer-motion";
import Seperator from "./Seperator";

interface TrackDetailLinePropsType extends MotionProps {
  seperator?: boolean;
  size?: number;
  firstPadding?: number;
  secondPadding?: number;
  firstTitle: string;
  secondTitle: string;
}

const TrackDetailLine = ({
  seperator,
  size,
  firstPadding,
  secondPadding,
  firstTitle,
  secondTitle,
  style,
  variants,
  initial,
  animate,
  exit,
  whileHover,
  custom,
}: TrackDetailLinePropsType): ReactElement => {
  size = size ?? 3;
  firstPadding = firstPadding ?? 1;
  secondPadding = secondPadding ?? 1;
  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      whileHover={whileHover}
      custom={custom}
      className={`d-flex fs-${size} align-items-center gap-1 justify-content-center`}
    >
      <motion.span style={style} className={`pe-${firstPadding}`}>
        {firstTitle}
      </motion.span>
      {seperator && (
        <Seperator
          style={{ backgroundColor: "white", borderRadius: "50%" }}
          width="5px"
          height="25px"
        />
      )}
      <span className={`ps-${secondPadding}`}>{secondTitle}</span>
    </motion.div>
  );
};

export default TrackDetailLine;
