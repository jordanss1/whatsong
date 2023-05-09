import React, { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import { NavigationAndStore } from "../../../test-utils/test-utils";
import { history } from "../../../test-utils";
import Landing from "../Landing";

const WrapperComponent = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationAndStore store={SearchStore}>{children}</NavigationAndStore>
  );
};

test("On hover the div is visible/class added and the class removed from Nav", async () => {
  const user = userEvent.setup();

  const { getByRole, container } = render(<Landing />, {
    wrapper: WrapperComponent,
  });

  const button = getByRole("button", { name: "Get started!" });
  const div = container.getElementsByClassName("spotifyDiv")[0];
  const nav = getByRole("banner");

  expect(div).not.toHaveClass("spotifyLoad");

  await user.hover(button);

  expect(div).toHaveClass("spotifyLoad");
  expect(nav).not.toHaveClass("navClassAnimate");
});

test("On click of button, the Search component is mounted", async () => {
  const user = userEvent.setup();

  const { getByRole } = render(<Landing />, { wrapper: WrapperComponent });
  const button = getByRole("button", { name: "Get started!" });

  expect(history.location.pathname).toBe("/");

  user.click(button);

  await waitFor(
    () => {
      expect(history.location.pathname).toBe("/search");
    },
    { timeout: 1500 }
  );
});
