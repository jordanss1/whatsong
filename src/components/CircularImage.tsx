import { ReactElement } from "react";
import { motion } from "framer-motion";

type CircularImagePropsType = {
  image?: string;
  size?: number;
  icon?: string;
  iconSize?: number;
};

const CircularImage = ({
  image,
  size,
  icon,
  iconSize,
}: CircularImagePropsType): ReactElement => {
  size = size ?? 2;
  icon = icon ?? "fa-solid fa-user";

  if (image) {
    return (
      <img
        className={`ui avatar image fs-${size} border border-white`}
        src={image}
      />
    );
  } else {
    return (
      <motion.i style={{ fontSize: iconSize }} className={`${icon} fs-1`} />
    );
  }
};

export default CircularImage;
