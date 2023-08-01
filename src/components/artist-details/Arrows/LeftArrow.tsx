import { memo, ReactElement } from "react";
import { motion, MotionProps } from "framer-motion";
import "../styles/artist-details.css";

interface LeftArrowPropsType extends MotionProps {
  setAlbumOrTrack: () => void;
  className: string;
  testId: "smallLeft" | "bigLeft";
}

type LeftArrowType = (props: LeftArrowPropsType) => ReactElement;

const LeftArrow: LeftArrowType = ({ setAlbumOrTrack, className, testId }) => {
  return (
    <motion.div
      data-testid={testId}
      onClick={setAlbumOrTrack}
      className={`d-flex align-items-center ${className}`}
    >
      <i className="left chevron icon" />
    </motion.div>
  );
};

export default memo(LeftArrow);
