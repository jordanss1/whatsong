import React from "react";
import { fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import Search from "../Search";
import SearchList from "../SearchList";
import { server } from "../../mocks/server";
import { artistAndTrackHandlers } from "../../mocks/handlers";
import { history } from "../../../test-utils";
import {
  artistResultsNone,
  songResultsNone,
  songResults,
} from "../../api/mock";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";

const WrapperComponent = ({ children }) => {
  return (
    <NavigationAndStore context={SearchContext} store={SearchStore}>
      {children}
    </NavigationAndStore>
  );
};

beforeEach(() => history.push("/search"));

const user = userEvent.setup();

//Search function that executes an automatic search; created to reduce repeated code in tests

const renderComponentSearched = async (query, button) => {
  const input = query("search-all-input");
  const submitButton = query(button);

  await act(async () => {
    await user.type(input, "hi");
  });

  await act(async () => {
    await user.click(submitButton);
  });
};

test("Each Artists and Songs button disabled on render but enabled after entering text", () => {
  const { getByRole, getAllByPlaceholderText } = customRender(
    WrapperComponent,
    <Search />
  );

  const input = getByRole("search-all-input");
  const buttons = getAllByPlaceholderText("button");

  buttons.forEach((button) => expect(button).toBeDisabled());
  fireEvent.change(input, { target: { value: "hi" } });
  buttons.forEach((button) => expect(button).toBeEnabled());
});

describe("All possibilities where artists are returned from the Search component", () => {
  it("On click of Artists button, the SearchList component is mounted and the pathname is /artists", async () => {
    const { getByRole } = customRender(
      WrapperComponent,
      <Routes>
        <Route path={"/search"} element={<Search />} />
      </Routes>
    );

    expect(history.location.pathname).toBe("/search");

    await renderComponentSearched(getByRole, "search-button-artists");

    await waitFor(() => {
      expect(history.location.pathname).toBe("/artists");
    });
  });

  it("When a search term is entered, submitted, artists are returned and the user can see them", async () => {
    const { getByRole, findAllByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched(getByRole, "search-button-artists");

    expect(await findAllByRole("artist-card")).toHaveLength(10);
  });
});

describe("All possibilities where no artists are returned", () => {
  beforeEach(() => {
    let data = artistAndTrackHandlers(artistResultsNone);
    server.use(...data);
  });

  test("When a search term is entered, submitted, no artists were returned and the component displays this", async () => {
    const { getByRole, findByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched(getByRole, "search-button-artists");

    expect(
      await findByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();
  });
});

describe("All possibilities where song results are returned from Search component", () => {
  beforeEach(() => {
    let data = artistAndTrackHandlers(songResults);
    server.use(...data);
  });

  it("When a search term is entered, submitted, songs are returned and the user can see these", async () => {
    const { getByRole, findAllByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched(getByRole, "search-button-songs");

    const cards = await findAllByRole("song-item");

    expect(cards).toHaveLength(5);
  });
});

describe("All possibilities when no song results are returned from Search component", () => {
  beforeEach(() => {
    const data = artistAndTrackHandlers(songResultsNone);
    server.use(...data);
  });

  it("On click of Songs button, the SearchList component is mounted and Songs JSX rendered", async () => {
    const { getByRole } = customRender(
      WrapperComponent,
      <Routes>
        <Route path={"/search"} element={<Search />} />
      </Routes>
    );

    expect(history.location.pathname).toBe("/search");

    await renderComponentSearched(getByRole, "search-button-songs");

    await waitFor(() => {
      expect(history.location.pathname).toBe("/songs");
    });
  });

  it("A search term is entered, no songs are returned and the component displays this", async () => {
    const { getByRole, findByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched(getByRole, "search-button-songs");

    expect(
      await findByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();
  });
});
