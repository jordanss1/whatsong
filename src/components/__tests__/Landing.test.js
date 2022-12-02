import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import { NavigationAndStore, Context } from "../../../test/test-utils";
import { history } from "../../../test";
import Landing from "../Landing";
import Search from "../Search";

const MemoryWrapper = ({ children }) => {
  return (
    <NavigationAndStore
      pathname={history.location}
      history={history}
      store={SearchStore}
    >
      {children}
    </NavigationAndStore>
  );
};

const testComponent = (components) => {
  return <Context context={SearchContext}>{components}</Context>;
};

const routeTest = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/search"} element={<Search />} />
    </Routes>
  );
};

beforeEach(() => {
  history.push("/");
});

test("On hover the div is visible/class added and the class removed from Nav", async () => {
  const { container } = render(
    testComponent(
      <Routes>
        <Route path={"/"} element={<Landing />} />
      </Routes>
    ),
    {
      wrapper: MemoryWrapper,
    }
  );

  const button = screen.getByRole("button", { name: "Get started!" });
  const div = container.getElementsByClassName("spotifyDiv")[0];
  const nav = screen.getByRole("banner");

  expect(div).not.toHaveClass("spotifyLoad");

  await userEvent.hover(button);

  expect(div).toHaveClass("spotifyLoad");
  expect(nav).not.toHaveClass("navClassAnimate");
});

test("On click of button, the Search component is mounted", async () => {
  render(testComponent(routeTest()), { wrapper: MemoryWrapper });
  const button = screen.getByRole("button", { name: "Get started!" });

  expect(history.location.pathname).toBe("/");

  userEvent.click(button);

  await waitFor(
    () => {
      expect(history.location.pathname).toBe("/search");
    },
    { timeout: 1500 }
  );
});
