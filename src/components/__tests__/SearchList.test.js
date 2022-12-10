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
  artistResults,
  artistResultsFull,
  songResultsNone,
  songResults,
  songResultsDouble,
} from "../../api/mock";
import { selectedItems } from "../../mocks/providers";
import SearchBar from "../SearchBar";

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

const renderComponentSearched = async (query, button, input) => {
  const searchComponentInput = query(input);
  const searchComponentButton = query(button);

  await user.type(searchComponentInput, "hi");
  user.click(searchComponentButton);
};

describe("The SearchList component on the /artists path", () => {
  it("The input in SearchList makes a search and returns artists when there's existing artists", async () => {
    let data = artistAndTrackHandlers(artistResultsFull);
    server.use(...data);

    selectedItems.items = artistResults.artists.items;

    const { getByRole, getAllByRole, debug, findAllByRole } = customContext(
      <SearchList />,
      selectedItems,
      { wrapper: NavigationRouter }
    );

    expect(getAllByRole("artist-card")).toHaveLength(10);

    await renderComponentSearched(
      getByRole,
      "searchList-button",
      "searchList-input"
    );

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
