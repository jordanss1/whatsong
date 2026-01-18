import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode, ReactElement } from 'react';
import { history } from '../../../test-utils';
import {
  NavigationAndStore,
  customRender,
} from '../../../test-utils/test-utils';
import { SearchStore } from '../../contexts/SearchStore';
import { albumAndTracks, albumAndTracksNoResults } from '../../mocks/api';
import ArtistDetails from '../artist-details/ArtistDetails';

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

describe('SelectedItem component when there are albums and songs', () => {
  beforeEach(() => {
    history.push('/artists/1');
    sessionStorage.setItem(
      'artist-details',
      JSON.stringify([
        albumAndTracks[0],
        albumAndTracks[1].items,
        albumAndTracks[2].tracks,
      ])
    );
  });

  it("The artist's name, followers, albums and top tracks are displayed", async () => {
    const { getByText, findByText } = customRender(
      WrapperComponent,
      <ArtistDetails />
    );

    //Name and followers

    expect(await findByText('Name')).toBeInTheDocument();

    expect(getByText('1,000 followers')).toBeInTheDocument();

    //Albums and top tracks

    expect(getByText('Album 1')).toBeInTheDocument();

    expect(getByText('Track 1')).toBeInTheDocument();
  });

  it('The arrows can change the artists and albums arrays and remove previous item', async () => {
    const { findByText, queryByText, getByTestId } = customRender(
      WrapperComponent,
      <ArtistDetails />
    );

    //The current album and top-track

    expect(await findByText('Album 1')).toBeInTheDocument();
    expect(await findByText('Track 1')).toBeInTheDocument();

    //Clicking the arrows to change the album and track

    await user.click(getByTestId('bigRight'));
    await user.click(getByTestId('smallRight'));

    //The new album and track, the old ones are null

    expect(await findByText('Album 2')).toBeInTheDocument();
    expect(await findByText('Track 2')).toBeInTheDocument();

    expect(queryByText('Album 1')).toBeNull();
    expect(queryByText('Track 1')).toBeNull();

    //Vice-versa above process

    await user.click(getByTestId('bigLeft'));
    await user.click(getByTestId('smallLeft'));

    expect(await findByText('Album 1')).toBeInTheDocument();
    expect(await findByText('Track 1')).toBeInTheDocument();

    expect(queryByText('Album 2')).toBeNull();
    expect(queryByText('Track 2')).toBeNull();
  });

  it('The arrows change between first and last albums/tracks', async () => {
    const { getByRole, getByText, findByText, getByTestId } = customRender(
      WrapperComponent,
      <ArtistDetails />
    );

    const leftAlbumArrow = getByTestId('bigLeft');
    const leftTrackArrow = getByTestId('smallLeft');
    const rightAlbumArrow = getByTestId('bigRight');
    const rightTrackArrow = getByTestId('smallRight');

    expect(await findByText('Album 1')).toBeInTheDocument();
    expect(await findByText('Track 1')).toBeInTheDocument();

    //Clicking left arrow goes to last album

    await user.click(leftAlbumArrow);
    await user.click(leftTrackArrow);

    expect(await findByText('Album 3')).toBeInTheDocument();
    expect(await findByText('Track 3')).toBeInTheDocument();

    // Back to first album

    await user.click(rightAlbumArrow);
    await user.click(rightTrackArrow);

    expect(await findByText('Album 1')).toBeInTheDocument();
    expect(await findByText('Track 1')).toBeInTheDocument();
  });
});

describe('SelectedItem component when there are no albums and songs', () => {
  beforeEach(() => {
    history.push('/artists/1');
    sessionStorage.setItem(
      'artist-details',
      JSON.stringify([
        albumAndTracksNoResults[0],
        albumAndTracksNoResults[1].items,
        albumAndTracksNoResults[2].tracks,
      ])
    );
  });

  it("The artist's name and followers appear but 'no albums' and 'no tracks' displayed", async () => {
    const { getByText, findByText } = customRender(
      WrapperComponent,
      <ArtistDetails />
    );

    expect(await findByText('Name')).toBeInTheDocument();

    expect(getByText('1,000 followers')).toBeInTheDocument();

    expect(getByText('No albums')).toBeInTheDocument();

    expect(getByText('No tracks')).toBeInTheDocument();
  });

  it('The arrows are rendered disabled and have no effect when clicked', async () => {
    const { getByRole, getByText, findByText, getByTestId, findByTestId } =
      customRender(WrapperComponent, <ArtistDetails />);

    expect(await findByText('No albums')).toBeInTheDocument();
    expect(getByText('No tracks')).toBeInTheDocument();

    //Disabled arrows

    expect(await findByTestId('bigLeft')).toHaveClass('left-arrow-disabled');
    expect(getByTestId('smallLeft')).toHaveClass('left-small-arrow-disabled');
    expect(getByTestId('bigRight')).toHaveClass('right-arrow-disabled');
    expect(getByTestId('smallRight')).toHaveClass('right-small-arrow-disabled');

    //Clicking them does nothing

    await user.click(getByTestId('bigLeft'));
    await user.click(getByTestId('smallLeft'));
    await user.click(getByTestId('bigRight'));
    await user.click(getByTestId('smallRight'));

    expect(getByText('No albums')).toBeInTheDocument();
    expect(getByText('No tracks')).toBeInTheDocument();
  });
});

describe('Route, history and window testing in SelectedItem component', () => {
  beforeEach(() => {
    history.push('/artists/1');
    sessionStorage.setItem(
      'artist-details',
      JSON.stringify([
        albumAndTracksNoResults[0],
        albumAndTracksNoResults[1].items,
        albumAndTracksNoResults[2].tracks,
      ])
    );
  });

  it("Pressing the 'X' icon should route back to /artists path", async () => {
    const { getByTestId, findByTestId } = customRender(
      WrapperComponent,
      <ArtistDetails />
    );

    expect(await findByTestId('x-icon')).toBeInTheDocument();

    await waitFor(() => expect(history.location.pathname).toBe('/artists/1'));

    await user.click(getByTestId('x-icon'));

    await waitFor(() => expect(history.location.pathname).toBe('/artists'));
  });

  it('Pressing the spotify icon should open new tab to Spotify', async () => {
    const { getByTestId, findByTestId } = customRender(
      WrapperComponent,
      <ArtistDetails />
    );

    const windowSpy = jest.spyOn(window, 'open').mockImplementation();

    expect(await findByTestId('spotify-icon')).toBeInTheDocument();

    await user.click(getByTestId('spotify-icon'));

    expect(windowSpy).toHaveBeenCalledWith('www.spotify.com/1', '_blank');
  });
});
