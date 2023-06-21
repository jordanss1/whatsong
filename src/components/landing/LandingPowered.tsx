import {
  Cycle,
  Variants,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import LandingCircles from "./LandingCircles";
import { ReactElement } from "react";

const boxVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
    border: "1px solid rgb(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    y: [null, 0],
    border: "1px solid rgb(255,255,255, .7)",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const poweredVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const LandingPowered = ({
  poweredCycle,
}: {
  poweredCycle: string;
}): ReactElement => {
  const x = useMotionValue(0);
  const color = useMotionValue("rgba(30, 215, 96)");

  x.on("change", (latest) => {
    if (Math.round(latest) >= 45) {
      color.set("rgba(30, 215, 96)");
    } else {
      color.set("rgba(30, 215, 96, 0.5)");
    }
  });

  return (
    <div className="d-flex align-items-end flex-grow-1">
      <motion.div
        layout
        initial="hidden"
        variants={boxVariants}
        animate={poweredCycle}
        className="d-flex border rounded-3 p-5 pt-3 pb-3 spotify-div"
      >
        <motion.h2
          variants={poweredVariants}
          className="fs-4 me-2 mt-2 powered"
        >
          Powered by
        </motion.h2>
        <motion.i
          layout
          style={{ color }}
          variants={poweredVariants}
          className="spotify icon fs-1 spotify-nav"
        ></motion.i>
        <LandingCircles x={x} />
      </motion.div>
    </div>
  );
};

export default LandingPowered;
