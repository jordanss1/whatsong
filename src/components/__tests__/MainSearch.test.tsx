import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'intersection-observer';
import { type ReactNode } from 'react';
import { history } from '../../../test-utils';
import {
  NavigationAndStore,
  customRender,
} from '../../../test-utils/test-utils';
import App from '../../App';
import { SearchStore } from '../../contexts/SearchStore';
import {
  AllTestResultsUnionType,
  artistResultsNone,
  songResults,
} from '../../mocks/api';
import { HandlerUnion, artistAndTrackHandlers } from '../../mocks/handlers';
import server from '../../mocks/server';
import {
  ArtistAndTrackHandlerDataType,
  ArtistAndTrackHandlersType,
  ArtistDetailsHandlerDataType,
} from '../../types/types';
import ArtistList from '../artist-list/ArtistList';
import MainSearch from '../main-search/MainSearch';
import TrackList from '../track-list/TrackList';

type ChangeHandlerFuncType = (
  arrayOrError: AllTestResultsUnionType,
  handler: HandlerUnion
) => void;

const WrapperComponent = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationAndStore store={SearchStore}>{children}</NavigationAndStore>
  );
};

const user = userEvent.setup();

//Search function that executes an automatic search; created to reduce repeated code in tests

export const renderComponentSearched = async (
  query: (testId: string) => HTMLElement,
  button: string
): Promise<void> => {
  const input = query('main-search-input') as HTMLInputElement;
  const submitButton = query(button) as HTMLButtonElement;

  await user.type(input, 'hi');

  await user.click(submitButton);
};

export const chooseCategory = async (
  findBy: (testId: string) => Promise<HTMLElement>,
  getBy: (testId: string) => HTMLElement,
  categoryName: RegExp
) => {
  await waitFor(
    async () => {
      let input = await findBy('main-search-input');
      let redoButton = getBy('redo-button');
      let category = getBy('redo-category');

      expect(input).toBeInTheDocument();
      expect(redoButton).toBeInTheDocument();
      expect(category).toHaveTextContent(categoryName);
    },
    { timeout: 1500 }
  );
};

const isHandlerArtistAndTrackHandler = (
  handler: HandlerUnion
): handler is ArtistAndTrackHandlersType => {
  return handler.name === 'artistAndTrackHandlers';
};

export const changeHandlers: ChangeHandlerFuncType = (
  arrayOrError,
  handler
) => {
  if (isHandlerArtistAndTrackHandler(handler)) {
    let data = handler(arrayOrError as ArtistAndTrackHandlerDataType);
    server.use(...data);
  } else {
    let data = handler(arrayOrError as ArtistDetailsHandlerDataType);
    server.use(...data);
  }
};

beforeEach(() => history.push('/search'));

test('Artists and Songs button appear and when Artists is selected, the user is shown the input with artists category', async () => {
  const { getByRole, getByTestId, findByTestId } = customRender(
    WrapperComponent,
    <MainSearch />
  );

  const artistsButton = getByRole('button', { name: 'Artists' });

  expect(artistsButton).toBeInTheDocument();

  await user.click(artistsButton);

  await chooseCategory(findByTestId, getByTestId, /^artists$/);
});

test('Artists and Songs button appear and when Songs is selected, the user is shown the input with songs category', async () => {
  const { getByRole, getByTestId, findByTestId } = customRender(
    WrapperComponent,
    <MainSearch />
  );

  const songsButton = getByRole('button', { name: 'Songs' });

  expect(songsButton).toBeInTheDocument();

  await user.click(songsButton);

  await chooseCategory(findByTestId, getByTestId, /^songs$/);
});

test('After the user is shown the category they originally selected, when they press the redo button, they are taken back to change the category', async () => {
  const { getByRole, getByTestId, findByTestId } = customRender(
    WrapperComponent,
    <MainSearch />
  );

  const artistsButton = getByRole('button', { name: 'Artists' });

  expect(artistsButton).toBeInTheDocument();

  await user.click(artistsButton);

  await chooseCategory(findByTestId, getByTestId, /^artists$/);

  await user.click(getByTestId('redo-button'));

  await waitFor(
    async () => {
      expect(getByRole('button', { name: 'Artists' })).toBeInTheDocument();
    },
    { timeout: 1500 }
  );
});

describe('All possibilities where artists are returned from the Search component', () => {
  it('When a search term is entered, submitted, the ArtistList component is mounted and the pathname is /artists and artists are returned and the user can see them', async () => {
    const { getByTestId, getByRole, findByTestId, findAllByTitle } =
      customRender(
        WrapperComponent,
        <>
          <MainSearch />
          <ArtistList />
        </>
      );

    const artistsButton = getByRole('button', { name: 'Artists' });

    expect(artistsButton).toBeInTheDocument();

    await user.click(artistsButton);

    await chooseCategory(findByTestId, getByTestId, /^artists$/);

    expect(history.location.pathname).toBe('/search');

    await renderComponentSearched(getByTestId, 'search-button');

    await waitFor(
      () => {
        expect(history.location.pathname).toBe('/artists');
      },
      { timeout: 1500 }
    );

    expect(
      (await findAllByTitle('View artist profile')) as HTMLDivElement[]
    ).toHaveLength(10);
  });
});

describe('All possibilities where song results are returned from Search component', () => {
  beforeEach(() => {
    changeHandlers(songResults, artistAndTrackHandlers);
  });

  it("When a search term is entered, submitted, songs are returned and the user can see these and the pathname is now 'tracks'", async () => {
    const { getByTestId, getByRole, findByTestId, findAllByTestId } =
      customRender(
        WrapperComponent,
        <>
          <MainSearch />
          <TrackList />
        </>
      );

    const songsButton = getByRole('button', { name: 'Songs' });

    expect(songsButton).toBeInTheDocument();

    await user.click(songsButton);

    await chooseCategory(findByTestId, getByTestId, /^songs$/);

    expect(history.location.pathname).toBe('/search');

    await renderComponentSearched(getByTestId, 'search-button');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/tracks');
    });

    const cards = await findAllByTestId('song-item');

    expect(cards).toHaveLength(5);
  });
});

describe("All failed network requests and 'no-results from search' modals", () => {
  it('Failed network request for post request for token shows Modal with error message', async () => {
    const { getByRole, findByTestId, getByTestId } = customRender(
      WrapperComponent,
      <>
        <App />
      </>
    );

    const artistsButton = getByRole('button', { name: 'Artists' });

    expect(artistsButton).toBeInTheDocument();

    changeHandlers(new Error('post error'), artistAndTrackHandlers);

    await user.click(artistsButton);

    await chooseCategory(findByTestId, getByTestId, /^artists$/);

    await renderComponentSearched(getByTestId, 'search-button');

    expect(await findByTestId('error-message')).toHaveTextContent(
      /^Server error: Request failed with status code 500, please search again$/
    );
  });
});

it('Successful post request but unsuccessful get request for artists/songs', async () => {
  const { getByRole, findByTestId, getByTestId, queryByTestId } = customRender(
    WrapperComponent,
    <>
      <App />
    </>
  );

  const songsButton = getByRole('button', { name: 'Songs' });

  expect(songsButton).toBeInTheDocument();

  changeHandlers(new Error('get error'), artistAndTrackHandlers);

  await user.click(songsButton);

  await chooseCategory(findByTestId, getByTestId, /^songs$/);

  await renderComponentSearched(getByTestId, 'search-button');

  expect(await findByTestId('error-message')).toHaveTextContent(
    /^Issue during search: Request failed with status code 401 please search again$/
  );
});

it('When no results are returned from a search the user is shown the no results modal', async () => {
  const { getByRole, findByTestId, getByTestId } = customRender(
    WrapperComponent,
    <>
      <App />
    </>
  );

  const artistsButton = getByRole('button', { name: 'Artists' });

  expect(artistsButton).toBeInTheDocument();

  changeHandlers(artistResultsNone, artistAndTrackHandlers);

  await user.click(artistsButton);

  await chooseCategory(findByTestId, getByTestId, /^artists$/);

  await renderComponentSearched(getByTestId, 'search-button');

  expect(await findByTestId('error-heading')).toHaveTextContent(
    /^No results found$/
  );
});
