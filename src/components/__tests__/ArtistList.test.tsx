import { ReactNode, ReactElement } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, waitFor, fireEvent } from "@testing-library/react";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";
import ArtistDetails from "../artist-details/ArtistDetails";
import App from "../App";
import ArtistList from "../artist-list/ArtistList";
import { SearchStore } from "../../contexts/SearchStore";
import { history } from "../../../test-utils";
import {
  artistAndTrackHandlers,
  artistDetailsHandler,
} from "../../mocks/handlers";
import {
  artistResultsFull,
  artistResults,
  artistResultsNone,
  albumAndTracks,
} from "../../mocks/api";
import { changeHandlers } from "./MainSearch.test";
import "intersection-observer";

type SearchComponentFuncType = (
  getByTestId: (testId: string) => HTMLElement
) => Promise<void>;

export const WrapperComponent = ({
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

export const searchSmallSearchBar: SearchComponentFuncType = async (
  getByTestId
) => {
  const input = getByTestId("small-search-bar");
  const button = getByTestId("search-button");

  await user.type(input, "hi");
  await user.click(button);
};

describe("The ArtistList component on the /artists path", () => {
  beforeEach(() =>
    sessionStorage.setItem(
      "artists",
      JSON.stringify(artistResults.artists.items)
    )
  );

  it("The input in ArtistList makes a search and returns artists", async () => {
    history.push("/artists");

    const { findAllByTitle, getByTestId } = customRender(
      WrapperComponent,
      <ArtistList />
    );

    expect(await findAllByTitle("View artist profile")).toHaveLength(10);

    changeHandlers(artistResultsFull, artistAndTrackHandlers);

    await searchSmallSearchBar(getByTestId);

    await waitFor(
      async () =>
        expect(await findAllByTitle("View artist profile")).toHaveLength(37),
      { timeout: 1000 }
    );
  });

  it("The header is the correct version for the ArtistList/search pages", async () => {
    history.push("/artists");

    const { getByTestId, queryByTestId } = customRender(
      WrapperComponent,
      <App />
    );

    expect(queryByTestId("header-landing")).not.toBeInTheDocument();

    expect(getByTestId("header-search")).toBeInTheDocument();
  });

  describe("Route and history testing on /artist path", () => {
    it("Clicking the Header component logo should route to /search path", async () => {
      history.push("/artists");
      const { getByTestId, queryByTestId } = customRender(
        WrapperComponent,
        <App />
      );
      const header = getByTestId("header-search");

      expect(header).toBeInTheDocument();

      expect(history.location.pathname).toBe("/artists");

      await user.click(header);

      expect(history.location.pathname).toBe("/search");
    });

    it("Clicking on the artist card opens the /artist/:id path", async () => {
      history.push("/artists");

      changeHandlers(albumAndTracks, artistDetailsHandler);

      const { getByText } = customRender(WrapperComponent, <App />);

      expect(history.location.pathname).toBe("/artists");

      await user.click(getByText("Test 1"));

      await waitFor(
        () => expect(history.location.pathname).toBe("/artists/1"),
        { timeout: 2000 }
      );
    });
  });

  describe("Failed network request on ArtistList component on /artists path and no results from search shows modal with error", () => {
    it("Failed request after clicking artist card to retrieve artist details", async () => {
      history.push("/artists");

      const { findByTestId, getByText } = customRender(
        WrapperComponent,
        <App />
      );

      changeHandlers(new Error("get error"), artistDetailsHandler);

      expect(history.location.pathname).toBe("/artists");

      await user.click(getByText("Test 1"));

      expect(await findByTestId("error-message")).toHaveTextContent(
        /^Issue retrieving artist detail: Request failed with status code 401 please search again$/
      );
    });

    it("Failed request after using search input shows error modal on ArtistList component", async () => {
      history.push("/artists");

      const { findByTestId, getByTestId } = customRender(
        WrapperComponent,
        <App />
      );

      changeHandlers(new Error("get error"), artistAndTrackHandlers);

      await user.type(getByTestId("small-search-bar"), "hi");

      await user.click(getByTestId("search-button"));

      expect(await findByTestId("error-message")).toHaveTextContent(
        /^Issue during search: Request failed with status code 401 please search again$/
      );
    });

    it("No results shows no results modal after using search input on ArtistList component", async () => {
      history.push("/artists");

      const { findByTestId, getByTestId } = customRender(
        WrapperComponent,
        <App />
      );

      changeHandlers(artistResultsNone, artistAndTrackHandlers);

      await user.type(getByTestId("small-search-bar"), "hi");

      await user.click(getByTestId("search-button"));

      expect(await findByTestId("error-heading")).toHaveTextContent(
        /^No results found$/
      );
    });
  });
});
