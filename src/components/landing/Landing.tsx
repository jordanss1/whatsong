import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import { Variants, delay, motion, useCycle } from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import "./styles/landing.css";
import LandingScroll from "./LandingScroll";
import LandingButton from "./LandingButton";
import LandingPowered from "./LandingPowered";

const mainVariants: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 0 0,rgb(0, 5, 133, .5)5%, rgb(255,255,255, 0),transparent 90%)",
  },
  intro: (intro) => ({
    background:
      "radial-gradient(circle at 0 70px,rgb(0, 5, 133, 1) 10%, rgb(255,255,255, 0),transparent 90%)",
    transition: {
      duration: intro ? 1.5 : 0.5,
      delay: intro ? 0.5 : 0,
    },
  }),
  prepare: {
    background:
      "radial-gradient(circle at 0 20px,rgb(0, 5, 133, 1) 2%, rgb(255,255,255, 0),transparent 98%)",
    transition: {
      duration: 0.2,
    },
  },
  blastOff: {
    background: [
      "radial-gradient(circle at 0px 70px, rgb(0, 5, 133, 1) 0%, rgb(0, 5, 133, 1) 10%,rgb(255,255,255, 1) 11%,transparent 12%)",
      "radial-gradient(circle at 0px 170px, rgb(0, 5, 133, 0) 20%, rgb(0, 5, 133, .5) 30%,rgb(255,255,255, 1) 31%,transparent 32%)",
      "radial-gradient(circle at 0px 170px, rgb(0, 5, 133, 0) 30%, rgb(0, 5, 133, 0) 35%,rgb(255,255,255, 1) 36%,transparent 35%)",
      "radial-gradient(circle at 0px 170px, rgb(0, 5, 133, 0) 60%, rgb(0, 5, 133, 0) 80%,rgb(255,255,255, 0) 81%,transparent 82%)",
      "radial-gradient(circle at 100px 170px, rgb(0, 5, 133, 1) 10%, rgb(0, 5, 133, .5) 20%,rgb(255,255,255, 0) 81%,transparent 82%)",
    ],
    transition: {
      duration: 1.5,
    },
  },
};

const Landing = (): ReactElement => {
  const { navigate } = useContext<UseSearchStateContext>(SearchContext);
  const [intro, setIntro] = useState(true);
  const [mainCycle, cycleMain] = useCycle("intro", "prepare", "blastOff");
  const [poweredCycle, cyclePowered] = useCycle("hidden", "visible");

  useEffect(() => {
    if (mainCycle === "prepare") {
      setIntro(false);
      cyclePowered(1);
    }
  }, [mainCycle]);

  return (
    <motion.main
      variants={mainVariants}
      custom={intro}
      initial="initial"
      animate={mainCycle}
      className="landing-main"
    >
      <div className="landing-content d-flex flex-column justify-content-center align-items-center">
        <LandingPowered poweredCycle={poweredCycle} />
        <div className="flex-grow-1 d-flex flex-column justify-content-center gap-5">
          <LandingButton cycleMain={cycleMain} />
          <LandingScroll />
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
