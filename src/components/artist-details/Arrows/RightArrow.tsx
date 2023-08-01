import { memo, ReactElement } from "react";
import { motion, MotionProps } from "framer-motion";
import "../styles/artist-details.css";

interface RightArrowPropsType extends MotionProps {
  setAlbumOrTrack: () => void;
  className: string;
  testId: "smallRight" | "bigRight";
}

type RightArrowType = (props: RightArrowPropsType) => ReactElement;

const RightArrow: RightArrowType = ({
  setAlbumOrTrack,
  className,
  testId,
  whileHover,
  whileTap,
}) => {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      data-testid={testId}
      onClick={setAlbumOrTrack}
      className={`d-flex align-items-center ${className}`}
    >
      <i className="right chevron icon align-self-center" />
    </motion.div>
  );
};

export default memo(RightArrow);
