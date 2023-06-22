import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import SearchContext from "../../contexts/searchContext/SearchStore";
import {
  AnimatePresence,
  Variants,
  delay,
  motion,
  useAnimate,
  useCycle,
  usePresence,
} from "framer-motion";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import "./styles/landing.css";
import LandingScroll from "./LandingScroll";
import LandingButton from "./LandingButton";
import LandingPowered from "./LandingPowered";
import { exit } from "process";

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
      "radial-gradient(circle at 0 -100px,rgb(0, 5, 133, 1) 1%, rgb(255,255,255, 0),transparent 99%)",
    transition: {
      duration: 0.2,
    },
  },
};

const mainLeaveVariants: Variants = {
  blastOff: {
    background: [
      "radial-gradient(circle at 0px 70px, rgb(0, 5, 133, 1) 0%, rgb(0, 5, 133, 1) 10%,rgb(255,255,255, 1) 11%,transparent 12%)",
      "radial-gradient(circle at 0px 170px, rgb(0, 5, 133, 0) 20%, rgb(0, 5, 133, .5) 30%,rgb(255,255,255, 1) 31%,transparent 32%)",
      "radial-gradient(circle at 0px 170px, rgb(0, 5, 133, 0) 30%, rgb(0, 5, 133, 0) 35%,rgb(255,255,255, 1) 36%,transparent 35%)",
      "radial-gradient(circle at 0px 170px, rgb(0, 5, 133, 0) 60%, rgb(0, 5, 133, 0) 80%,rgb(255,255,255, 0) 81%,transparent 82%)",
    ],
    transition: {
      duration: 2,
    },
  },
};

const Landing = (): ReactElement => {
  const { navigate } = useContext<UseSearchStateContext>(SearchContext);
  const [intro, setIntro] = useState(true);
  const [finalAnimation, setFinalAnimation] = useState(false);

  const [mainCycle, cycleMain] = useCycle("intro", "prepare", "blastOff");
  const [poweredCycle, cyclePowered] = useCycle("hidden", "visible");
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (mainCycle === "prepare") {
      setIntro(false);
      cyclePowered(1);
    }
  }, [mainCycle]);

  useEffect(() => {
    const exitAnimation = async () => {
      cycleMain(2);
    };
    if (finalAnimation) {
      exitAnimation();
      navigate("/search");
    }
  }, [finalAnimation]);

  const handleHover = (hovered: boolean) => {
    if (hovered && !finalAnimation) {
      cycleMain(1);
    } else if (!hovered && !finalAnimation) {
      cycleMain(0);
    }
  };

  return (
    <motion.main
      variants={finalAnimation ? mainLeaveVariants : mainVariants}
      custom={intro}
      initial="initial"
      animate={mainCycle}
      exit={{ x: 500, transition: { duration: 3000 } }}
      className="landing-main"
    >
      <div className="landing-content d-flex flex-column justify-content-center align-items-center">
        <AnimatePresence>
          {!finalAnimation && <LandingPowered poweredCycle={poweredCycle} />}
        </AnimatePresence>
        <div className="flex-grow-1 d-flex flex-column justify-content-center gap-5">
          <AnimatePresence>
            {!finalAnimation && (
              <>
                <LandingButton
                  handleHover={handleHover}
                  setFinalAnimation={setFinalAnimation}
                />
                <LandingScroll />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
