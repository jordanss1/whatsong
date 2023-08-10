import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MainSearch from "../main-search/MainSearch";
import { waitFor } from "@testing-library/react";
import TrackList from "../track-list/TrackList";
import { customRender } from "../../../test-utils/test-utils";
import { artistAndTrackHandlers } from "../../mocks/handlers";
import { changeHandlers } from "./MainSearch.test";
import { searchComponent, WrapperComponent } from "./ArtistList.test";
import {
  songResults,
  songResultsDouble,
  songResultsNone,
} from "../../mocks/api";
import { history } from "../../../test-utils";

const user = userEvent.setup();

describe("The TrackList component on the /songs path", () => {
  it("The input in TrackList makes a search and returns songs when there's existing songs", async () => {
    changeHandlers(songResults, artistAndTrackHandlers);

    const { getByPlaceholderText, getAllByRole, getByRole } = customRender(
      WrapperComponent,
      <>
        <MainSearch />
        <TrackList />
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
      getByRole("TrackList-button") as HTMLButtonElement,
    ]);

    expect(getAllByRole("song-item") as HTMLDivElement[]).toHaveLength(10);
  });

  it("The input in TrackList makes a search and returns no results when there are existing songs", async () => {
    changeHandlers(songResults, artistAndTrackHandlers);

    const { getByPlaceholderText, getAllByRole, getByRole } = customRender(
      WrapperComponent,
      <>
        <MainSearch />
        <TrackList />
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
      getByRole("TrackList-button") as HTMLButtonElement,
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
          <MainSearch />
          <TrackList />
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
      history.push("/tracks");

      const { getByRole } = customRender(
        WrapperComponent,
        <>
          <MainSearch />
          <TrackList />
        </>
      );

      expect(history.location.pathname).toBe("/tracks");

      await user.click(getByRole("link"));

      expect(history.location.pathname).toBe("/search");
    });

    it("Clicking on the listen button opens a tab to spotify", async () => {
      changeHandlers(songResults, artistAndTrackHandlers);

      const windowSpy = jest.spyOn(window, "open").mockImplementation();

      const { getByRole, getAllByTitle } = customRender(
        WrapperComponent,
        <>
          <MainSearch />
          <TrackList />
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
