import React from "react";
import { fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import Search from "../Search";
import SearchList from "../SearchList";
import { server } from "../../mocks/server";
import { artistAndTrackHandlers } from "../../mocks/handlers";
import { history } from "../../../test-utils";
import {
  artistResultsNone,
  songResultsNone,
  songResultsSuccess,
} from "../../api/mock";

const WrapperComponent = ({ children }) => {
  return (
    <NavigationAndStore context={SearchContext} store={SearchStore}>
      {children}
    </NavigationAndStore>
  );
};

beforeEach(() => history.push("/search"));

const returnInputAndButton = (query, button) => {
  return {
    input: query("search-all-input"),
    submitButton: query(button),
  };
};

const user = userEvent.setup();

test("Each Artists and Songs button disabled on render but enabled after entering text", () => {
  const { getAllByRole, getByRole, getAllByPlaceholderText } = customRender(
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
  it("On click of Artists button, the SearchList component is mounted and Artist JSX rendered", async () => {
    const { getByRole } = customRender(
      WrapperComponent,
      <Routes>
        <Route path={"/search"} element={<Search />} />
      </Routes>
    );

    const { input, submitButton } = returnInputAndButton(
      getByRole,
      "search-button-artists"
    );

    expect(history.location.pathname).toBe("/search");

    user.click(submitButton);

    await user.type(input, "hi");

    user.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/artists");
    });
  });

  it("When a search term is entered, submitted and the API call is successful and artists are returned", async () => {
    const { getByRole, findAllByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    const { input, submitButton } = returnInputAndButton(
      getByRole,
      "search-button-artists"
    );

    await user.type(input, "hi");

    user.click(submitButton);

    expect(await findAllByRole("artist-card")).toHaveLength(10);
  });
});

describe("All possibilities where no artists are returned", () => {
  beforeEach(() => {
    let data = artistAndTrackHandlers(artistResultsNone);
    server.use(...data);
  });

  test("When a search term is entered, submitted and the API call is successful and no artists are returned", async () => {
    const { getByRole, findByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    const { input, submitButton } = returnInputAndButton(
      getByRole,
      "search-button-artists"
    );

    await user.type(input, "hi");

    user.click(submitButton);

    expect(
      await findByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();
  });
});

describe("All possibilities where song results are returned from Search component", () => {
  beforeEach(() => {
    let data = artistAndTrackHandlers(songResultsSuccess);
    server.use(...data);
  });

  it("When a search term is entered, submitted and the API call is successful and songs are returned", async () => {
    const { getByRole, findAllByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    const { input, submitButton } = returnInputAndButton(
      getByRole,
      "search-button-songs"
    );

    await user.type(input, "hi");

    user.click(submitButton);

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

    const { input, submitButton } = returnInputAndButton(
      getByRole,
      "search-button-songs"
    );

    expect(history.location.pathname).toBe("/search");

    await act(async () => {
      await user.type(input, "hi");
    });

    await act(async () => {
      await user.click(submitButton);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe("/songs");
    });
  });

  it("A search term is entered, a search is made and no songs are returned", async () => {
    const { getByRole, findByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    const { input, submitButton } = returnInputAndButton(
      getByRole,
      "search-button-songs"
    );

    await user.type(input, "hi");

    user.click(submitButton);

    expect(
      await findByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();
  });
});
