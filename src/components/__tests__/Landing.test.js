import React, { useContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import Landing from "../Landing";
import "../../styles/all.css";

const TestComponent = () => {
  const { navigate } = useContext(SearchContext);

  return (
    <SearchContext.Provider value={navigate}>
      <Landing />
    </SearchContext.Provider>
  );
};

test("On hover the div is visible/class added and the class removed from Nav", async () => {
  const { container } = render(
    <Router>
      <SearchStore>
        <TestComponent />
      </SearchStore>
    </Router>
  );

  const button = screen.getByRole("button", { name: "Get started!" });
  const div = container.getElementsByClassName("spotifyDiv")[0];
  const nav = screen.getByRole("banner");

  userEvent.hover(button);

  await waitFor(() => {
    expect(div).toHaveClass("spotifyLoad");
    expect(nav).not.toHaveClass("navClassAnimate");
  });
});

test("On click of button, the component is unmounted", () => {
  render(
    <Router>
      <SearchStore>
        <TestComponent />
      </SearchStore>
    </Router>
  );

  const button = screen.getByRole("button", { name: "Get started!" });

  userEvent.click(button);

  screen.debug();
});
