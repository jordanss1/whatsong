import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'intersection-observer';
import { history } from '../../../test-utils';
import { customRender } from '../../../test-utils/test-utils';
import App from '../../App';
import {
  songResults,
  songResultsDouble,
  songResultsNone,
} from '../../mocks/api';
import { artistAndTrackHandlers } from '../../mocks/handlers';
import TrackList from '../track-list/TrackList';
import { WrapperComponent, searchSmallSearchBar } from './ArtistList.test';
import { changeHandlers } from './MainSearch.test';

const user = userEvent.setup();

describe('The TrackList component on the /songs path', () => {
  beforeEach(() => {
    sessionStorage.setItem('tracks', JSON.stringify(songResults.tracks.items));
    history.push('/tracks');
  });

  it('The input in TrackList makes a search and returns songs', async () => {
    changeHandlers(songResultsDouble, artistAndTrackHandlers);

    const { findAllByTestId, getByTestId } = customRender(
      WrapperComponent,
      <TrackList />
    );

    expect(await findAllByTestId('song-item')).toHaveLength(5);

    await searchSmallSearchBar(getByTestId);

    await waitFor(
      async () => expect(await findAllByTestId('song-item')).toHaveLength(10),
      { timeout: 1000 }
    );
  });

  it('Draggable elements only appear when its track card parent is hovered and are null when the parent is unhovered', async () => {
    const { findAllByTestId, getByTestId, queryByTestId, findByTestId } =
      customRender(WrapperComponent, <TrackList />);

    expect(await findAllByTestId('song-item')).toHaveLength(5);

    const trackParent = getByTestId('track-item-0');

    expect(trackParent).toBeInTheDocument();

    expect(queryByTestId('draggable-ball-0')).not.toBeInTheDocument();

    await user.hover(trackParent);

    expect(await findByTestId('draggable-ball-0')).toBeInTheDocument();

    await user.unhover(trackParent);

    expect(queryByTestId('draggable-ball-0')).not.toBeInTheDocument();
  });
});

describe('Route and history testing on /tracks path', () => {
  beforeEach(() => {
    sessionStorage.setItem('tracks', JSON.stringify(songResults.tracks.items));
    history.push('/tracks');
  });

  it('Clicking the header component should route to /search path', async () => {
    const { getByTestId } = customRender(WrapperComponent, <TrackList />);

    expect(history.location.pathname).toBe('/tracks');

    await user.click(getByTestId('header-search'));

    expect(history.location.pathname).toBe('/search');
  });
});

describe('Failed network request on TrackList component on /tracks path and no results from search shows modal with error', () => {
  beforeEach(() => {
    sessionStorage.setItem('tracks', JSON.stringify(songResults.tracks.items));
    history.push('/tracks');
  });

  it('Failed request after using search input shows error modal on TrackList component', async () => {
    const { findByTestId, getByTestId } = customRender(
      WrapperComponent,
      <App />
    );

    changeHandlers(new Error('get error'), artistAndTrackHandlers);

    await searchSmallSearchBar(getByTestId);

    expect(await findByTestId('error-message')).toHaveTextContent(
      /^Issue during search: Request failed with status code 401 please search again$/
    );
  });

  it('No results after using search input shows no-results error modal on TrackList component', async () => {
    const { findByTestId, getByTestId } = customRender(
      WrapperComponent,
      <App />
    );

    changeHandlers(songResultsNone, artistAndTrackHandlers);

    await searchSmallSearchBar(getByTestId);

    expect(await findByTestId('error-heading')).toHaveTextContent(
      /^No results found$/
    );
  });
});
