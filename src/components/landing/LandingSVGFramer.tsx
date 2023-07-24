import { ReactElement } from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
  useMotionValue,
} from "framer-motion";
import "./styles/landing.css";

const LandingSVGFramer = (): ReactElement => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [0, 62, 135, 187, 270], [0, 0, 1, 1, 0]);
  const scale = useTransform(x, [0, 135, 270], [0.8, 1, 0.8]);
  const shadowSize = useTransform(x, [0, 135, 270], [3, 5, 3]);

  return (
    <motion.svg
      style={{
        x,
        opacity,
        scale,
        filter: useMotionTemplate`drop-shadow(${shadowSize}px ${shadowSize}px 2px rgb(0 0 0 / 0.7))`,
      }}
      animate={{
        x: [null, 300],
        transition: { duration: 4, repeat: Infinity, repeatDelay: 2 },
      }}
      fill="#000000"
      width="90px"
      height="90px"
      viewBox="0 0 24 24"
      id="framer"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="secondary"
        d="M6.75,3H19V9H12ZM12,9H5v6l6,6V15h6.25Z"
        strokeWidth="1"
        fill="rgb(44, 169, 188)"
      ></path>
      <path
        id="primary"
        d="M6.75,3H19V9H12ZM12,9H5v6l6,6V15h6.25Z"
        fill="none"
        strokeWidth="rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
      ></path>
    </motion.svg>
  );
};

export default LandingSVGFramer;
