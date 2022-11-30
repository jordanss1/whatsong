import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import Landing from "../Landing";
import "../../styles/all.css";

test("On hover the div is visible and the class removed from Nav", () => {
  const TestComponent = () => {
    const { navigate } = useContext(SearchContext);

    return (
      <SearchContext.Provider value={navigate}>
        <Landing />
      </SearchContext.Provider>
    );
  };

  render(
    <Router>
      <SearchStore>
        <TestComponent />
      </SearchStore>
    </Router>
  );

  screen.debug();
  const button = screen.getByRole("button", { name: "Get started!" });
  const div = screen.getByTestId("div-powered");
  const nav = screen.getByRole("banner");
  screen.debug(div);

  expect(div).not.toBeVisible();
});
