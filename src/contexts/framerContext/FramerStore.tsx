import { ReactNode } from "react";
import FramerState, { FramerContext } from "./FramerState";

const FramerStore = ({ children }: { children: ReactNode }) => {
  const state = FramerState();

  return (
    <FramerContext.Provider value={state}>{children}</FramerContext.Provider>
  );
};

export default FramerStore;
