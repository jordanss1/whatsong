import { ReactNode, ReactElement } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { waitFor, act } from "@testing-library/react";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";
import Search from "../Search";
import SearchList from "../SearchList";
import SelectedItem from "../SelectedItem";
import { SearchStore } from "../../contexts/SearchStore";
import { history } from "../../../test-utils";
import {
  artistAndTrackHandlers,
  artistAndAlbumHandler,
} from "../../mocks/handlers";
import {
  artistResultsFull,
  songResultsNone,
  songResults,
  songResultsDouble,
  artistResults,
  artistResultsNone,
  albumAndTracks,
} from "../../mocks/api";
import { changeHandlers } from "./Search.test";

type SearchComponentFuncType = (
  queries: (HTMLInputElement | HTMLButtonElement)[]
) => Promise<void>;

const WrapperComponent = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <NavigationAndStore store={SearchStore}>{children}</NavigationAndStore>
  );
};

const user = userEvent.setup();

//Search function that executes an automatic search; created to reduce repeated code in tests

export const searchComponent: SearchComponentFuncType = async (queries) => {
  const input = queries[0];
  const button = queries[1];

  await act(async () => await user.type(input, "hi"));
  await act(async () => await user.click(button));
};

describe("The SearchList component on the /artists path", () => {
  it("The input in SearchList makes a search and returns artists when there's existing artists on page", async () => {
    const { getByRole, getByText, getByPlaceholderText, getAllByRole } =
      customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole(
        "search-button-artists"
      ) as HTMLButtonElement as HTMLButtonElement,
    ]);

    expect(getAllByRole("artist-card")).toHaveLength(10);

    //Page number 4 should be hidden because the array is only 10

    expect(getByText("4")).not.toBeVisible();

    changeHandlers(artistResultsFull, artistAndTrackHandlers);

    await searchComponent([
      getByPlaceholderText("Search artists") as HTMLInputElement,
      getByRole("searchList-button") as HTMLButtonElement,
    ]);

    //Page number 4 should be visible because the array is 37

    expect(getByText("4")).toBeVisible();
  });

  it("The input in SearchList makes a search and can return no results when there's existing artists on page", async () => {
    const { getByRole, getAllByRole, getByPlaceholderText } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    expect(getAllByRole("artist-card")).toHaveLength(10);

    changeHandlers(artistResultsNone, artistAndTrackHandlers);

    await searchComponent([
      getByPlaceholderText("Search artists") as HTMLInputElement,
      getByRole("searchList-button") as HTMLButtonElement,
    ]);

    expect(
      getByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();
  });

  it("SearchList component can change pages when the array of artists is more than 10", async () => {
    changeHandlers(artistResultsFull, artistAndTrackHandlers);

    const { getByRole, getByText } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    const secondPageButton = getByText("2");

    await waitFor(() => expect(secondPageButton).toBeVisible(), {
      timeout: 1500,
    });

    await user.click(secondPageButton);

    expect(getByText("Test 12")).toBeInTheDocument();
  });

  it("When a search is completed the first page is selected", async () => {
    changeHandlers(artistResultsFull, artistAndTrackHandlers);

    const { getByRole, getByText, getByPlaceholderText } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    await user.click(getByText("3"));

    expect(getByText("Test 23")).toBeInTheDocument();

    changeHandlers(artistResults, artistAndTrackHandlers);

    await searchComponent([
      getByPlaceholderText("Search artists") as HTMLInputElement,
      getByRole("searchList-button") as HTMLButtonElement,
    ]);

    expect(getByText("Test 1")).toBeInTheDocument();
  });

  it("The input in SearchList makes a search and returns artists when there's no existing artists on page", async () => {
    changeHandlers(artistResultsNone, artistAndTrackHandlers);

    const { getByRole, getAllByRole, getByPlaceholderText } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    expect(
      getByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();

    changeHandlers(artistResults, artistAndTrackHandlers);

    await searchComponent([
      getByPlaceholderText("Search artists") as HTMLInputElement,
      getByRole("searchList-button") as HTMLButtonElement,
    ]);

    expect(getAllByRole("artist-card")).toHaveLength(10);
  });

  describe("Route and history testing on /artist path", () => {
    it("Clicking the header/NavBar component should route to /search path", async () => {
      history.push("/artists");

      const { getByRole } = customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

      expect(history.location.pathname).toBe("/artists");

      await user.click(getByRole("link"));

      expect(history.location.pathname).toBe("/search");
    });

    it("Clicking on the artist image or profile icon opens the /artist/:id path", async () => {
      history.push("/search");

      const { getByRole, getAllByTitle, getAllByRole } = customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
          <SelectedItem />
        </>
      );

      expect(history.location.pathname).toBe("/search");

      await searchComponent([
        getByRole("search-all-input") as HTMLInputElement,
        getByRole("search-button-artists") as HTMLButtonElement,
      ]);

      expect(history.location.pathname).toBe("/artists");

      changeHandlers(albumAndTracks, artistAndAlbumHandler);

      await user.click(getAllByTitle("View artist profile")[0]);

      //The profile button works

      await waitFor(() => expect(history.location.pathname).toBe("/artists/1"));

      history.push("/artists");

      expect(history.location.pathname).toBe("/artists");

      await user.click(getAllByRole("heading", { name: "No image" })[0]);

      //Clicking on the image works

      await waitFor(() => expect(history.location.pathname).toBe("/artists/1"));
    });

    it("Clicking on the spotify icon opens a tab to spotify", async () => {
      const windowSpy = jest.spyOn(window, "open").mockImplementation();

      const { getByRole, getAllByTitle } = customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

      await searchComponent([
        getByRole("search-all-input") as HTMLInputElement,
        getByRole("search-button-artists") as HTMLButtonElement,
      ]);

      await user.click(getAllByTitle("www.spotify.com")[0]);

      expect(windowSpy).toHaveBeenCalled();
    });
  });
});

describe("The SearchList component on the /songs path", () => {
  it("The input in SearchList makes a search and returns songs when there's existing songs", async () => {
    changeHandlers(songResults, artistAndTrackHandlers);

    const { getByPlaceholderText, getAllByRole, getByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-songs") as HTMLButtonElement,
    ]);

    expect(getAllByRole("song-item") as HTMLDivElement[]).toHaveLength(5);

    changeHandlers(songResultsDouble, artistAndTrackHandlers);

    await searchComponent([
      getByPlaceholderText("Search songs") as HTMLInputElement,
      getByRole("searchList-button") as HTMLButtonElement,
    ]);

    expect(getAllByRole("song-item") as HTMLDivElement[]).toHaveLength(10);
  });

  it("The input in SearchList makes a search and returns no results when there are existing songs", async () => {
    changeHandlers(songResults, artistAndTrackHandlers);

    const { getByPlaceholderText, getAllByRole, getByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-songs") as HTMLButtonElement,
    ]);

    expect(getAllByRole("song-item") as HTMLDivElement[]).toHaveLength(5);

    changeHandlers(songResultsNone, artistAndTrackHandlers);

    await searchComponent([
      getByPlaceholderText("Search songs") as HTMLInputElement,
      getByRole("searchList-button") as HTMLButtonElement,
    ]);

    expect(
      getByRole("heading", { name: "No results found" })
    ).toBeInTheDocument();
  });

  it("Pressing the details button shows expanded track details and the X icon removes the details", async () => {
    changeHandlers(songResults, artistAndTrackHandlers);

    const { getAllByText, queryByText, queryByRole, queryByTestId } =
      customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

    await searchComponent([
      queryByRole("search-all-input") as HTMLInputElement,
      queryByRole("search-button-songs") as HTMLButtonElement,
    ]);

    //Details hasn't been selected yet

    expect(
      queryByRole("heading", { name: "No album cover" }) as HTMLHeadingElement
    ).toBeNull();

    expect(queryByText("Search spotify songs")).not.toBeNull();

    await user.click(getAllByText("Details")[0]);

    //Details are selected and you can see them

    expect(queryByText("Search spotify songs")).toBeNull();

    expect(
      queryByRole("heading", { name: "No album cover" }) as HTMLHeadingElement
    ).not.toBeNull();

    await user.click(queryByTestId("x-icon") as HTMLElement);

    //The X icon has been clicked and no details again

    expect(queryByText("Search spotify songs")).not.toBeNull();

    expect(
      queryByRole("heading", { name: "No album cover" }) as HTMLHeadingElement
    ).toBeNull();
  });

  describe("Route and history testing on /songs path", () => {
    it("Clicking the header/NavBar component should route to /search path", async () => {
      history.push("/songs");

      const { getByRole } = customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

      expect(history.location.pathname).toBe("/songs");

      await user.click(getByRole("link"));

      expect(history.location.pathname).toBe("/search");
    });

    it("Clicking on the listen button opens a tab to spotify", async () => {
      changeHandlers(songResults, artistAndTrackHandlers);

      const windowSpy = jest.spyOn(window, "open").mockImplementation();

      const { getByRole, getAllByTitle } = customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
        </>
      );

      await searchComponent([
        getByRole("search-all-input") as HTMLInputElement,
        getByRole("search-button-songs") as HTMLButtonElement,
      ]);

      await user.click(getAllByTitle("www.spotify.com")[0]);

      expect(windowSpy).toHaveBeenCalled();
    });
  });
});
