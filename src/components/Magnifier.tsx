import { motion, type Variants } from 'motion/react';
import { type ReactElement } from 'react';

type MagniferPropsType = {
  size: number;
  searchTerm?: string;
  handleClick: () => void;
};

const searchIconVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.2 } },
  exit: { opacity: 0 },
  hover: {
    color: 'rgba(255, 255, 255)',
  },
};

const emptyVariant = {
  hover: {},
};

const Magnifier = ({
  searchTerm,
  handleClick,
  size,
}: MagniferPropsType): ReactElement => {
  return (
    <motion.i
      layout
      key="search"
      initial="initial"
      animate="animate"
      variants={searchTerm === undefined ? searchIconVariant : emptyVariant}
      onClick={() => handleClick()}
      whileHover="hover"
      className={`search icon fs-${size}`}
    />
  );
};

export default Magnifier;
