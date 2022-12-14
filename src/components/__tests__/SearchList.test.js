import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor, act } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";
import Search from "../Search";
import SearchList from "../SearchList";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import { server } from "../../mocks/server";
import { history } from "../../../test-utils";
import { artistAndTrackHandlers } from "../../mocks/handlers";
import {
  artistResultsFull,
  songResultsNone,
  songResults,
  songResultsDouble,
  artistResults,
} from "../../mocks/api";

const WrapperComponent = ({ children }) => {
  return (
    <NavigationAndStore store={SearchStore}>{children}</NavigationAndStore>
  );
};

const user = userEvent.setup();

//Search function that executes an automatic search; created to reduce repeated code in tests

const renderComponentSearched = async (queries) => {
  const input = queries[0];
  const button = queries[1];

  await act(async () => await user.type(input, "hi"));
  await act(async () => await user.click(button));
};

describe("The SearchList component on the /artists path", () => {
  it("The input in SearchList makes a search and returns artists when there's existing artists", async () => {
    const {
      getByRole,
      getByText,
      findByPlaceholderText,
      findByRole,
      findAllByRole,
    } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched([
      getByRole("search-all-input"),
      getByRole("search-button-artists"),
    ]);

    expect(await findAllByRole("artist-card")).toHaveLength(10);

    //Page number 4 should be hidden because the array is only 10

    expect(getByText("4")).not.toBeVisible();

    let data = artistAndTrackHandlers(artistResultsFull);
    server.use(...data);

    await renderComponentSearched([
      await findByPlaceholderText("Search artists"),
      await findByRole("searchList-button"),
    ]);

    //Page number 4 should be visible because the array is 37

    expect(getByText("4")).toBeVisible();
  });
});

describe("The SearchList component on the /songs path", () => {
  it("The input in SearchList makes a search and returns songs when there's existing songs", async () => {
    let data = artistAndTrackHandlers(songResults);
    server.use(...data);

    const {
      findByRole,
      findByPlaceholderText,
      getAllByRole,
      getByRole,
      findAllByRole,
    } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched([
      getByRole("search-all-input"),
      getByRole("search-button-songs"),
    ]);

    expect(getAllByRole("song-item")).toHaveLength(5);

    data = artistAndTrackHandlers(songResultsDouble);
    server.use(...data);

    await renderComponentSearched([
      await findByPlaceholderText("Search songs"),
      await findByRole("searchList-button"),
    ]);

    expect(await findAllByRole("song-item")).toHaveLength(10);
  });
});
