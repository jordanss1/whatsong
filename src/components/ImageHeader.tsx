import { motion, type MotionStyle } from 'motion/react';
import { type ReactElement } from 'react';

type ImageHeaderPropsType = {
  motionStyle?: MotionStyle;
  onClick?: () => void;
  text: string;
  size?: number;
};

const ImageHeader = ({
  motionStyle,
  onClick,
  text,
  size,
}: ImageHeaderPropsType) => {
  const handleClick = onClick ? onClick : () => {};
  size = size ?? 5;

  return (
    <motion.h3
      style={motionStyle}
      onClick={() => handleClick()}
      className={`header fs-${size} text-center w-100 pt-3`}
    >
      {text}
    </motion.h3>
  );
};

export default ImageHeader;
