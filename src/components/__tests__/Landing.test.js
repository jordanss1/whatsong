import React from "react";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext from "../../contexts/SearchStore";
import Landing from "../Landing";

test("On hover the classes are added to the spotify div", () => {
  const navigate = useNavigate();
  render(
    <SearchContext.Provider value={navigate}>
      <Landing />
    </SearchContext.Provider>
  );
  screen.debug();
});
