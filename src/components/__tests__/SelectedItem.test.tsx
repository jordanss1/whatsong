import { ReactNode, ReactElement } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { waitFor, act } from "@testing-library/react";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";
import Search from "../main-search/MainSearch";
import SearchList from "../SearchList";
import { searchComponent } from "./SearchList.test";
import { SearchStore } from "../../contexts/SearchStore";
import { history } from "../../../test-utils";
import { changeHandlers } from "./Search.test";
import { artistAndAlbumHandler } from "../../mocks/handlers";
import { albumAndTracks, albumAndTracksNoResults } from "../../mocks/api";
import ArtistDetails from "../artist-details/ArtistDetails";

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

describe("SelectedItem component when there are albums and songs", () => {
  it("The artist's name, followers, albums and top tracks are displayed", async () => {
    const { getByRole, getByText, findByText, getAllByTitle } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
        <ArtistDetails />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracks, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    //Name and followers

    expect(await findByText("Name")).toBeInTheDocument();

    expect(getByText("1,000 followers")).toBeInTheDocument();

    //Albums and top tracks

    expect(getByText("Album 1")).toBeInTheDocument();

    expect(getByText("Track 1")).toBeInTheDocument();
  });

  it("The arrows can change the artists and albums arrays and remove previous item", async () => {
    const {
      getByRole,
      findByText,
      queryByText,
      getAllByTitle,
      getByTestId,
      debug,
    } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
        <ArtistDetails />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracks, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    //The current album and top-track

    expect(await findByText("Album 1")).toBeInTheDocument();
    expect(await findByText("Track 1")).toBeInTheDocument();

    //Clicking the arrows to change the album and track

    await user.click(getByTestId("bigRight"));
    await user.click(getByTestId("smallRight"));

    //The new album and track, the old ones are null

    expect(await findByText("Album 2")).toBeInTheDocument();
    expect(await findByText("Track 2")).toBeInTheDocument();

    expect(queryByText("Album 1")).toBeNull();
    expect(queryByText("Track 1")).toBeNull();

    //Vice-versa above process

    await user.click(getByTestId("bigLeft"));
    await user.click(getByTestId("smallLeft"));

    expect(await findByText("Album 1")).toBeInTheDocument();
    expect(await findByText("Track 1")).toBeInTheDocument();

    expect(queryByText("Album 2")).toBeNull();
    expect(queryByText("Track 2")).toBeNull();
  });

  it("The arrows change between first and last albums/tracks", async () => {
    const { getByRole, getByText, findByText, getAllByTitle, getByTestId } =
      customRender(
        WrapperComponent,
        <>
          <Search />
          <SearchList />
          <ArtistDetails />
        </>
      );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracks, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    const album1 = await findByText("Album 1");

    const track1 = getByText("Track 1");

    const leftAlbumArrow = getByTestId("bigLeft");
    const leftTrackArrow = getByTestId("smallLeft");
    const rightAlbumArrow = getByTestId("bigRight");
    const rightTrackArrow = getByTestId("smallRight");

    expect(album1).toBeInTheDocument();

    expect(track1).toBeInTheDocument();

    //Clicking left arrow goes to last album

    await user.click(leftAlbumArrow);
    await user.click(leftTrackArrow);

    expect(await findByText("Album 3")).toBeInTheDocument();
    expect(getByText("Track 3")).toBeInTheDocument();

    // Back to first album

    await user.click(rightAlbumArrow);
    await user.click(rightTrackArrow);

    expect(album1).toBeInTheDocument();

    expect(track1).toBeInTheDocument();
  });
});

describe("SelectedItem component when there are no albums and songs", () => {
  it("The artist's name and followers appear but 'no albums' and 'no tracks' displayed", async () => {
    const { getByRole, getByText, findByText, getAllByTitle } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
        <ArtistDetails />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracksNoResults, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    expect(await findByText("Name")).toBeInTheDocument();

    expect(getByText("1,000 followers")).toBeInTheDocument();

    expect(getByText("No albums")).toBeInTheDocument();

    expect(getByText("No tracks")).toBeInTheDocument();
  });

  it("The arrows are rendered disabled and have no effect when clicked", async () => {
    const {
      getByRole,
      getByText,
      findByText,
      getByTestId,
      findByTestId,
      getAllByTitle,
    } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
        <ArtistDetails />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracksNoResults, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    expect(await findByText("No albums")).toBeInTheDocument();

    expect(getByText("No tracks")).toBeInTheDocument();

    //Disabled arrows

    expect(await findByTestId("bigLeft")).toHaveClass("leftArrowDisabled");
    expect(getByTestId("smallLeft")).toHaveClass("leftSmallArrowDisabled");
    expect(getByTestId("bigRight")).toHaveClass("rightArrowDisabled");
    expect(getByTestId("smallRight")).toHaveClass("rightSmallArrowDisabled");

    //Clicking them does nothing

    await user.click(getByTestId("bigLeft"));
    await user.click(getByTestId("smallLeft"));
    await user.click(getByTestId("bigRight"));
    await user.click(getByTestId("smallRight"));

    expect(getByText("No albums")).toBeInTheDocument();

    expect(getByText("No tracks")).toBeInTheDocument();
  });
});

describe("Route, history and window testing in SelectedItem component", () => {
  it("Pressing the 'X' icon should route back to /artists path", async () => {
    const { getByRole, getByTestId, getAllByTitle } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
        <ArtistDetails />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracks, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    await waitFor(() => expect(history.location.pathname).toBe("/artists/1"));

    await user.click(getByTestId("red-x"));

    await waitFor(() => expect(history.location.pathname).toBe("/artists"));
  });

  it("Clicking on the spotify icon opens a tab to spotify", async () => {
    const windowSpy = jest.spyOn(window, "open").mockImplementation();

    const { getByRole, findByTitle, getAllByTitle } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
        <ArtistDetails />
      </>
    );

    await searchComponent([
      getByRole("search-all-input") as HTMLInputElement,
      getByRole("search-button-artists") as HTMLButtonElement,
    ]);

    changeHandlers(albumAndTracks, artistAndAlbumHandler);

    await user.click(getAllByTitle("View artist profile")[0]);

    await user.click(await findByTitle("www.spotify.com/1"));

    expect(windowSpy).toHaveBeenCalled();
  });
});
