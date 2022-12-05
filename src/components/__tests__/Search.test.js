import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavigationAndStore } from "../../../test-utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import Search from "../Search";
import SearchList from "../SearchList";
import { artistServer } from "../../mocks/servers";
import { artistHandlers } from "../../mocks/handlers";
import { history } from "../../../test-utils";
import { artistResultsNone } from "../../api/mock";

beforeAll(() => artistServer.listen());

afterEach(() => artistServer.resetHandlers());

afterAll(() => artistServer.close());

const WrapperComponent = ({ children }) => {
  return (
    <NavigationAndStore context={SearchContext} store={SearchStore}>
      {children}
    </NavigationAndStore>
  );
};

const customRender = (wrapper, components) => {
  return render(components, { wrapper: wrapper });
};

test("Each Artists and Songs button disabled on render but enabled after entering text", () => {
  const { getAllByRole, getByRole } = customRender(
    WrapperComponent,
    <Search />
  );

  const input = getByRole("search-all-input");
  const buttons = getAllByRole("button");

  buttons.forEach((button) => expect(button).toBeDisabled());
  fireEvent.change(input, { target: { value: "hi" } });
  buttons.forEach((button) => expect(button).toBeEnabled());
});

test("When a search term is entered, submitted and the API call is successful (array of artists)", async () => {
  const user = userEvent.setup();

  const { getByRole, findAllByRole } = customRender(
    WrapperComponent,
    <>
      <Search />
      <SearchList />
    </>
  );

  const input = getByRole("search-all-input");
  const submitButton = getByRole("button", { name: "Artists" });

  await user.type(input, "hi");

  user.click(submitButton);

  expect(await findAllByRole("artist-card")).toHaveLength(10);
});

test("When the API call is successful but no results are returned", async () => {
  artistServer.use(...artistHandlers(artistResultsNone));

  const user = userEvent.setup();

  const { getByRole, findByRole } = customRender(
    WrapperComponent,
    <>
      <Search />
      <SearchList />
    </>
  );

  const input = getByRole("search-all-input");
  const submitButton = getByRole("button", { name: "Artists" });

  await user.type(input, "hi");

  user.click(submitButton);

  expect(
    await findByRole("heading", { name: "No results found" })
  ).toBeInTheDocument();
});
