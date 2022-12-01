import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import { RouterAndStore, Context } from "../../../test-utils";
import Landing from "../Landing";
import "../../styles/all.css";
import Search from "../Search";

const MemoryWrapper = ({ children }) => {
  return (
    <RouterAndStore store={SearchStore} entry={["/"]}>
      {children}
    </RouterAndStore>
  );
};

const testComponent = (...component) => {
  return <Context context={SearchContext}>{component}</Context>;
};

const routeTest = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/search"} element={<Search />} />
    </Routes>
  );
};

test("On hover the div is visible/class added and the class removed from Nav", async () => {
  const { container } = render(testComponent(<Landing />), {
    wrapper: MemoryWrapper,
  });

  const button = screen.getByRole("button", { name: "Get started!" });
  const div = container.getElementsByClassName("spotifyDiv")[0];
  const nav = screen.getByRole("banner");

  expect(div).not.toHaveClass("spotifyLoad");

  userEvent.hover(button);

  await waitFor(() => {
    expect(div).toHaveClass("spotifyLoad");
    expect(nav).not.toHaveClass("navClassAnimate");
  });
});

test("On click of button, the Search component is mounted", async () => {
  render(testComponent(routeTest()), { wrapper: MemoryWrapper });
  const button = screen.getByRole("button", { name: "Get started!" });

  expect(button).toBeInTheDocument();

  userEvent.click(button);

  screen.debug();
});
