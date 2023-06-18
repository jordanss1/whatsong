import { useRef, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

//591.25 from the right is the end of animation
//347.23 from the left is the start of animation

const SVGFramer = () => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [0, 70, 130, 145, 175], [0.5, 1, 1, 0.7, 0]);
  const scale = useTransform(x, [0, 70, 175], [0.9, 1.3, 0.9]);
  const shadowSize = useTransform(x, [0, 70, 175], [4, 6, 4]);

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.svg
      layout
      ref={ref}
      style={{
        x,
        opacity,
        scale,
        filter: useMotionTemplate`drop-shadow(${shadowSize}px ${shadowSize}px 2px rgb(0 0 0 / 0.7))`,
      }}
      onAnimationComplete={(e) => {
        console.log(e);
      }}
      animate={{ x: [0, 180], transition: { duration: 5 } }}
      fill="#000000"
      width="60px"
      height="60px"
      viewBox="0 0 24 24"
      id="framer"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
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

export default SVGFramer;
