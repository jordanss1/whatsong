import { type MotionProps, type MotionStyle, motion } from 'motion/react';
import { type ReactElement } from 'react';

interface ImageCardPropsType extends MotionProps {
  onClick?: () => void;
  url?: string;
  icon?: string;
  iconSize?: number;
}

const ImageCard = ({
  onClick,
  url,
  icon,
  iconSize,
  style,
  variants,
  initial,
  animate,
  exit,
  custom,
  whileHover,
}: ImageCardPropsType): ReactElement => {
  const handleClick = onClick ? onClick : () => {};
  icon = icon ?? 'fa-solid fa-user';
  iconSize = iconSize ?? 36;

  return (
    <motion.div
      style={style}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      custom={custom}
      whileHover={whileHover}
      onClick={() => handleClick()}
      className="image d-flex justify-content-center align-items-center"
    >
      {url ? (
        <img src={url} />
      ) : (
        <i style={{ fontSize: `${iconSize}px` }} className={`${icon}`} />
      )}
    </motion.div>
  );
};

export default ImageCard;
