import { ReactElement } from "react";
import { MotionStyle, motion } from "framer-motion";

type ImageCardPropsType = {
  motionStyle?: MotionStyle;
  onClick?: () => void;
  url?: string;
  icon?: string;
  iconSize?: number;
};

const ImageCard = ({
  motionStyle,
  onClick,
  url,
  icon,
  iconSize,
}: ImageCardPropsType): ReactElement => {
  const handleClick = onClick ? onClick : () => {};
  icon = icon ?? "fa-solid fa-user";
  iconSize = iconSize ?? 36;

  return (
    <motion.div
      style={motionStyle}
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
