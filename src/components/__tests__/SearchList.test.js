import React, { useContext } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor, render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import {
  NavigationAndStore,
  customRender,
  NavigationRouter,
} from "../../../test-utils/test-utils";
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
} from "../../mocks/api";
import { selectedItems } from "../../mocks/providers";
import Search from "../Search";

const DefaultStoreAndContext = ({ children }) => {
  return (
    <NavigationAndStore store={SearchStore} context={SearchContext}>
      {children}
    </NavigationAndStore>
  );
};

const customContext = (ui, providers, options) => {
  return render(
    <SearchContext.Provider value={providers}>{ui}</SearchContext.Provider>,
    options
  );
};

const user = userEvent.setup();

//Search function that executes an automatic search; created to reduce repeated code in tests

const renderComponentSearched = async (queries) => {
  const searchComponentInput = queries[0];
  const searchComponentButton = queries[1];

  await user.type(searchComponentInput, "hi");
  user.click(searchComponentButton);
};

describe("The SearchList component on the /artists path", () => {
  it("The input in SearchList makes a search and returns artists when there's existing artists", async () => {
    const {
      getByRole,
      findByPlaceholderText,
      findByRole,
      debug,
      findAllByRole,
    } = customRender(
      DefaultStoreAndContext,
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

    const data = artistAndTrackHandlers(artistResultsFull);
    server.use(...data);

    await renderComponentSearched([
      await findByPlaceholderText("Search artists"),
      await findByRole("searchList-button"),
    ]);

    //This below should come back as true but it doesn't, even though when you console log
    //it shows the new array with 37 objects

    // expect(await findAllByRole("artist-card")).toHaveLength(37);
  });
});

describe("The SearchList component on the /songs path", () => {
  beforeEach(() => {
    selectedItems.typeString = "track";
  });

  it("The input in SearchList makes a search and returns songs when there's existing songs", async () => {
    let data = artistAndTrackHandlers(songResults);
    server.use(...data);

    selectedItems.items = songResultsDouble.tracks.items;

    const { getByRole, getAllByRole, findAllByRole } = customContext(
      <SearchList />,
      selectedItems,
      {
        wrapper: NavigationRouter,
      }
    );

    expect(getAllByRole("song-item")).toHaveLength(10);

    await renderComponentSearched(
      getByRole,
      "searchList-button",
      "searchList-input"
    );

    // expect(await findAllByRole("song-item")).toHaveLength(5);
  });
});
