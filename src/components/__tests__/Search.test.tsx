import React, { ReactNode } from "react";
import { fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SearchStore } from "../../contexts/SearchStore";
import Search from "../Search";
import SearchList from "../SearchList";
import { server } from "../../mocks/server";
import {
  ArtistAndTrackHandlersType,
  HandlerUnion,
  artistAndTrackHandlers,
} from "../../mocks/handlers";
import { history } from "../../../test-utils";
import {
  artistResultsNone,
  songResultsNone,
  songResults,
  AllTestResultsUnionType,
  ArtistResultsTestType,
  SongResultsTestType,
  AlbumAndTracksTestType,
} from "../../mocks/api";
import {
  NavigationAndStore,
  customRender,
} from "../../../test-utils/test-utils";

type ChangeHandlerFuncType = (
  array: AllTestResultsUnionType,
  handlers: HandlerUnion
) => void;

const WrapperComponent = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationAndStore store={SearchStore}>{children}</NavigationAndStore>
  );
};

const user = userEvent.setup();

//Search function that executes an automatic search; created to reduce repeated code in tests

const renderComponentSearched = async (
  query: (role: string) => HTMLElement,
  button: string
): Promise<void> => {
  const input = query("search-all-input") as HTMLInputElement;
  const submitButton = query(button) as HTMLButtonElement;

  await act(async () => {
    await user.type(input, "hi");
  });

  await act(async () => {
    await user.click(submitButton);
  });
};

const isHandlerArtistAndTrackHandler = (
  handler: HandlerUnion
): handler is ArtistAndTrackHandlersType => {
  return handler.name === "ArtistAndTrackHandler";
};

export const changeHandlers: ChangeHandlerFuncType = (array, handlers) => {
  if (isHandlerArtistAndTrackHandler(handlers)) {
    let data = handlers(array as ArtistResultsTestType | SongResultsTestType);
    server.use(...data);
  } else {
    let data = handlers(array as AlbumAndTracksTestType);
    server.use(...data);
  }
};

beforeEach(() => history.push("/search"));

test("Each Artists and Songs button disabled on render but enabled after entering text", () => {
  const { getByRole, getAllByPlaceholderText } = customRender(
    WrapperComponent,
    <Search />
  );

  const input = getByRole("search-all-input") as HTMLInputElement;
  const buttons = getAllByPlaceholderText("button") as HTMLButtonElement[];

  buttons.forEach((button) => expect(button).toBeDisabled());
  fireEvent.change(input, { target: { value: "hi" } });
  buttons.forEach((button) => expect(button).toBeEnabled());
});

describe("All possibilities where artists are returned from the Search component", () => {
  it("On click of Artists button, the SearchList component is mounted and the pathname is /artists", async () => {
    const { getByRole } = customRender(WrapperComponent, <Search />);

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

    expect(
      (await findAllByRole("artist-card")) as HTMLDivElement[]
    ).toHaveLength(10);
  });
});

describe("All possibilities where no artists are returned", () => {
  beforeEach(() => {
    changeHandlers(artistResultsNone, artistAndTrackHandlers);
  });

  it("When a search term is entered, submitted, no artists were returned and the component displays this", async () => {
    const { getByRole, findByRole } = customRender(
      WrapperComponent,
      <>
        <Search />
        <SearchList />
      </>
    );

    await renderComponentSearched(getByRole, "search-button-artists");

    expect(
      (await findByRole("heading", {
        name: "No results found",
      })) as HTMLHeadingElement
    ).toBeInTheDocument();
  });
});

describe("All possibilities where song results are returned from Search component", () => {
  beforeEach(() => {
    changeHandlers(songResults, artistAndTrackHandlers);
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
    changeHandlers(songResultsNone, artistAndTrackHandlers);
  });

  it("On click of Songs button, the SearchList component is mounted and Songs JSX rendered", async () => {
    const { getByRole } = customRender(WrapperComponent, <Search />);

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
