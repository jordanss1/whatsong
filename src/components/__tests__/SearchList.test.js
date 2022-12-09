import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor, render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";
import SearchList from "../SearchList";
import Search from "../Search";
import SelectedItem from "../SelectedItem";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import { server } from "../../mocks/server";
import { history } from "../../../test-utils";
import { artistAndTrackHandlers } from "../../mocks/handlers";
import {
  artistResultsNone,
  artistResultsSuccessFull,
  songResultsNone,
  songResultsSuccess,
} from "../../api/mock";

const WrapperComponent = ({ children }) => {
  return (
    <NavigationAndStore store={SearchStore} context={SearchContext}>
      {children}
    </NavigationAndStore>
  );
};

const user = userEvent.setup();

const renderComponentSearched = async (query, button, input) => {
  const searchComponentInput = query(input);
  const searchComponentButton = query(button);

  await user.type(searchComponentInput, "hi");
  user.click(searchComponentButton);
};

describe("The SearchList component on the /artists path", () => {
  describe("All tests where there are artists rendered", () => {
    it("The input makes a search and returns artists when there are already previous received", async () => {
      const { getByRole, debug, findAllByRole } = customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

      //First search from the default handlers

      await renderComponentSearched(
        getByRole,
        "search-button-artists",
        "search-all-input"
      );

      expect(await findAllByRole("artist-card")).toHaveLength(10);

      //Change handlers to receive different mocked results

      const data = artistAndTrackHandlers(artistResultsSuccessFull);
      server.use(...data);

      //Make new search for the changed response

      await renderComponentSearched(
        getByRole,
        "searchList-button",
        "searchList-input"
      );

      //The new handler should respond with an array of length 37
      //expect(await findAllByRole("artist-card")).toHaveLength(37);
    });
  });
});
