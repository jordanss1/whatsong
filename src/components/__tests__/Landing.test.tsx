import { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SearchStore } from "../../contexts/SearchStore";
import { NavigationAndStore } from "../../../test-utils/test-utils";
import { history } from "../../../test-utils";
import Landing from "../landing/Landing";
import App from "../App";

const WrapperComponent = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationAndStore store={SearchStore}>{children}</NavigationAndStore>
  );
};

const user = userEvent.setup();

test("On hover the 'powered by' div is visible", async () => {
  const { getByRole, container } = render(<Landing />, {
    wrapper: WrapperComponent,
  });

  const button = getByRole("button", { name: "Start searching" });
  const div = container.getElementsByClassName("spotify-div")[0];

  expect(div).not.toBeVisible();

  await user.hover(button);

  expect(div).toBeVisible();
});

test("On click of button, the Search component is mounted", async () => {
  const { getByRole } = render(<Landing />, { wrapper: WrapperComponent });
  const button = getByRole("button", { name: "Start searching" });

  expect(history.location.pathname).toBe("/");

  user.click(button);

  await waitFor(() => expect(history.location.pathname).toBe("/search"));
});

test("The header is the correct version for the Landing pages", async () => {
  history.push("/");

  const { getByTestId, queryByTestId } = render(<App />, {
    wrapper: WrapperComponent,
  });

  expect(queryByTestId("header-search")).not.toBeInTheDocument();

  expect(getByTestId("header-landing")).toBeInTheDocument();
});
