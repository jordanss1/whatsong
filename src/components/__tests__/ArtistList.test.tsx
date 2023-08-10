import { ReactNode, ReactElement } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, waitFor } from "@testing-library/react";
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

  await act(async () => await user.type(input, "hi"));
  await act(async () => await user.click(button));
};

describe("The ArtistList component on the /artists path", () => {
  beforeEach(() =>
    sessionStorage.setItem(
      "artists",
      JSON.stringify(artistResults.artists.items)
    )
  );

  // it("The input in ArtistList makes a search and returns artists", async () => {
  //   history.push("/artists");

  //   const { findAllByTitle, getByTestId } = customRender(
  //     WrapperComponent,
  //     <>
  //       <ArtistList />
  //     </>
  //   );

  //   expect(await findAllByTitle("View artist profile")).toHaveLength(10);

  //   changeHandlers(artistResultsFull, artistAndTrackHandlers);

  //   await searchSmallSearchBar(getByTestId);

  //   await waitFor(
  //     async () =>
  //       expect(await findAllByTitle("View artist profile")).toHaveLength(37),
  //     { timeout: 100 }
  //   );
  // });

  it("The header is the shortened version for the ArtistList page", async () => {
    history.push("/artists");

    const { getByRole, findAllByTitle, getByPlaceholderText } = customRender(
      WrapperComponent,
      <>
        <App />
      </>
    );

    expect(await findAllByTitle("View artist profile")).toHaveLength(10);
  });

  // it("The search input is added into the header when the user scrolls down the page", async () => {});

  // describe("Route and history testing on /artist path", () => {
  //   it("Clicking the Header component logo should route to /search path", async () => {
  //     history.push("/artists");

  //     const { getByRole } = customRender(
  //       WrapperComponent,
  //       <>
  //         <MainSearch />
  //         <ArtistList />
  //       </>
  //     );

  //     expect(history.location.pathname).toBe("/artists");

  //     await user.click(getByRole("link"));

  //     expect(history.location.pathname).toBe("/search");
  //   });

  //   it("Clicking on the artist card opens the /artist/:id path", async () => {
  //     history.push("/search");

  //     const { getByRole, getByText } = customRender(
  //       WrapperComponent,
  //       <>
  //         <MainSearch />
  //         <ArtistList />
  //         <ArtistDetails />
  //       </>
  //     );

  //     expect(history.location.pathname).toBe("/search");

  //     await searchComponent([
  //       getByRole("search-all-input") as HTMLInputElement,
  //       getByRole("search-button-artists") as HTMLButtonElement,
  //     ]);

  //     expect(history.location.pathname).toBe("/artists");

  //     changeHandlers(albumAndTracks, artistDetailsHandler);

  //     await user.click(getByText("Test 1"));

  //     await waitFor(() => expect(history.location.pathname).toBe("/artists/1"));
  //   });
  // });
});

// describe("Failed network request on ArtistList component on /artists path and no results from search shows modal with error", () => {
//   it("Failed request after clicking artist card to retrieve artist details", async () => {
//     const { getByRole, getByText } = customRender(
//       WrapperComponent,
//       <>
//         <MainSearch />
//         <ArtistList />
//       </>
//     );

//     const alert = jest.spyOn(window, "alert").mockImplementation(() => {});

//     await searchComponent([
//       getByRole("search-all-input") as HTMLInputElement,
//       getByRole("search-button-artists") as HTMLButtonElement,
//     ]);

//     changeHandlers(new Error("get"), artistDetailsHandler);

//     expect(history.location.pathname).toBe("/artists");

//     await user.click(getByText("Test 1"));

//     expect(alert).toHaveBeenCalledWith(
//       `Issue retrieving artist detail: Request failed with status code 401 please search again`
//     );
//   });

//   it("Failed request shows error modal after using search input on ArtistList component", async () => {
//     const { getByRole, getByText } = customRender(
//       WrapperComponent,
//       <>
//         <MainSearch />
//         <ArtistList />
//       </>
//     );
//   });

//   it("No results shows no results modal after using search input on ArtistList component", async () => {
//     const { getByRole, getByText } = customRender(
//       WrapperComponent,
//       <>
//         <MainSearch />
//         <ArtistList />
//       </>
//     );
//   });
// });
