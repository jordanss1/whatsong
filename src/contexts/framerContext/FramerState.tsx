import { useCycle } from "framer-motion";
import { createContext } from "react";

const FramerState = () => {
  const [headerCycle, cycleHeader] = useCycle("visible", "morph");

  return { headerCycle, cycleHeader };
};

type FramerStateReturnType = ReturnType<typeof FramerState>;

const framerInitState: FramerStateReturnType = {
  headerCycle: "",
  cycleHeader: () => {},
};

export const FramerContext =
  createContext<FramerStateReturnType>(framerInitState);

export default FramerState;
