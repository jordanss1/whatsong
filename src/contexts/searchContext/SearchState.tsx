import { useState, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  spotifyArtistsOrSongsSearch,
  spotifyArtistDetailsSearch,
} from "../../api";
import {
  useArtistResults,
  artistInitState,
} from "../../hooks/DetailedArtistResultHooks";
import { TopTracksDetailsType } from "../../types";
import { useArtistsOrTracks } from "../../hooks/ArtistsAndTracksHook";
import { CancelTokenSource } from "axios";

export const SearchState = () => {
  const [selectedSong, setSelectedSong] =
    useState<Required<TopTracksDetailsType> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cancelToken = useRef<CancelTokenSource | null>(null);

  const {
    artists,
    totalArtists,
    tracks,
    artistOrTrackError,
    totalTracks,
    setArtistsOrTracks,
    emptyArtistsAndTracks,
  } = useArtistsOrTracks();

  const {
    artistDetail,
    albums,
    album,
    topTracks,
    topTrack,
    setProfile,
    setAlbum,
    setTopTrack,
    artistDetailError,
  } = useArtistResults();

  const navigate = useNavigate();

  const handleArtistsOrSongsSearch = (query: string, typeOfSearch: string) => {
    if (cancelToken.current) cancelToken.current.cancel();

    spotifyArtistsOrSongsSearch(
      query,
      cancelToken,
      typeOfSearch,
      setArtistsOrTracks
    );
  };

  const handleArtistDetailSearch = (id: string) => {
    if (cancelToken.current) cancelToken.current.cancel();

    spotifyArtistDetailsSearch(id, cancelToken, setProfile);
  };

  let error: Error | null = null;

  if (artistDetailError) error = artistDetailError;

  if (artistOrTrackError) error = artistOrTrackError;

  const providerValues = {
    error,
    setLoading,
    loading,
    topTracks,
    topTrack,
    artistDetail,
    albums,
    album,
    selectedSong,
    artists,
    tracks,
    totalArtists,
    totalTracks,
    setArtistsOrTracks,
    emptyArtistsAndTracks,
    setTopTrack,
    setAlbum,
    setProfile,
    handleArtistsOrSongsSearch,
    handleArtistDetailSearch,
    setSelectedSong,
    navigate,
  };

  return { ...providerValues };
};

export type UseSearchStateContext = ReturnType<typeof SearchState>;

const initSearchContextState: UseSearchStateContext = {
  error: null,
  setLoading: () => {},
  loading: false,
  topTracks: [],
  topTrack: null,
  artistDetail: artistInitState.artistDetail,
  albums: [],
  album: null,
  setAlbum: () => {},
  setArtistsOrTracks: () => {},
  emptyArtistsAndTracks: () => {},
  selectedSong: null,
  artists: null,
  tracks: null,
  totalArtists: 0,
  totalTracks: 0,
  setTopTrack: () => {},
  setProfile: () => {},
  handleArtistsOrSongsSearch: () => {},
  handleArtistDetailSearch: () => {},
  setSelectedSong: () => {},
  navigate: () => {},
};

const SearchContext = createContext<UseSearchStateContext>(
  initSearchContextState
);

export default SearchContext;
