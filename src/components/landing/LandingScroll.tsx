import { ReactElement } from "react";
import { Cycle, motion } from "framer-motion";
import SVGFramer from "../../svgs/SVGFramer";
import SVGReact from "../../svgs/SVGReact";
import SVGReactRouter from "../../svgs/SVGReactRouter";
import SVGTypeScript from "../../svgs/SVGTypeScript";
import "./styles/landing.css";

type LandingScrollPropsType = {
  xAnimation: string;
  cycleAnimation: Cycle;
};

const LandingScroll = ({
  xAnimation,
  cycleAnimation,
}: LandingScrollPropsType): ReactElement => {
  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      <motion.div
        onMouseLeave={() => cycleAnimation(0)}
        onMouseEnter={() => cycleAnimation(1)}
        className="ribbon-div"
      >
        <div className="scolling-container d-flex">
          <div className="framer-icon">
            <SVGFramer xAnimation={xAnimation} />
          </div>
          <div className="react-icon">
            <SVGReact xAnimation={xAnimation} />
          </div>
          <div className="router-icon">
            <SVGReactRouter xAnimation={xAnimation} />
          </div>
          <div className="typescript-icon">
            <SVGTypeScript xAnimation={xAnimation} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingScroll;
