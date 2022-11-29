import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext from "../../contexts/SearchStore";
import Landing from "../Landing";

test("On hover the classes are added to the spotify div", () => {
  render(<Landing />);
  screen.debug();
});
