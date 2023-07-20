import { ReactElement } from "react";
import { motion } from "framer-motion";

const Caret = ({ handleClick }: { handleClick: () => void }): ReactElement => {
  return (
    <motion.i
      key="caret"
      onClick={() => handleClick()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
      whileHover={{
        color: "rgba(255,255,255)",
      }}
      className="caret down icon caret-icon fs-4"
    />
  );
};

export default Caret;
