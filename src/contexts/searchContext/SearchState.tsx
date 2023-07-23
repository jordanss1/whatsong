import { useState, createContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  spotifyArtistsOrSongsSearch,
  spotifyArtistDetailsSearch,
} from "../../api";
import {
  useArtistResults,
  artistInitState,
} from "../../hooks/DetailedArtistResultHooks";
import { TopTracksDetailsType } from "../../types/types";
import { useArtistsOrTracks } from "../../hooks/ArtistsAndTracksHook";
import { CancelTokenSource } from "axios";

export const SearchState = () => {
  const [selectedTrack, setSelectedTrack] =
    useState<Required<TopTracksDetailsType> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState(false);
  const [modal, setModal] = useState(false);
  const [popout, setPopout] = useState(false);

  const location = useLocation();

  const cancelToken = useRef<CancelTokenSource | null>(null);

  const {
    artists,
    tracks,
    artistOrTrackError,
    setArtistsOrTracks,
    resetModalOrSpotify,
    noResults,
  } = useArtistsOrTracks();

  const {
    artistDetail,
    albums,
    album,
    topTracks,
    topTrack,
    setProfile,
    emptyProfile,
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
      setArtistsOrTracks,
      setLoading
    );
  };

  const handleArtistDetailSearch = (id: string) => {
    if (cancelToken.current) cancelToken.current.cancel();

    spotifyArtistDetailsSearch(id, cancelToken, setProfile, setLoading);
  };

  let error: Error | null = null;

  if (artistDetailError) error = artistDetailError;

  if (artistOrTrackError) error = artistOrTrackError;

  const pathname = location.pathname;

  const providerValues = {
    popout,
    setPopout,
    pathname,
    modal,
    setModal,
    searched,
    setSearched,
    error,
    noResults,
    setLoading,
    loading,
    topTracks,
    topTrack,
    artistDetail,
    albums,
    album,
    selectedTrack,
    artists,
    tracks,
    setArtistsOrTracks,
    resetModalOrSpotify,
    setTopTrack,
    setAlbum,
    setProfile,
    emptyProfile,
    handleArtistsOrSongsSearch,
    handleArtistDetailSearch,
    setSelectedTrack,
    navigate,
  };

  return { ...providerValues };
};

export type UseSearchStateContext = ReturnType<typeof SearchState>;

const initSearchContextState: UseSearchStateContext = {
  popout: false,
  setPopout: () => {},
  pathname: "",
  modal: false,
  setModal: () => {},
  searched: false,
  setSearched: () => {},
  error: null,
  noResults: null,
  setLoading: () => {},
  loading: false,
  topTracks: [],
  topTrack: null,
  artistDetail: artistInitState.artistDetail,
  albums: [],
  album: null,
  setAlbum: () => {},
  setArtistsOrTracks: () => {},
  resetModalOrSpotify: () => {},
  selectedTrack: null,
  artists: null,
  tracks: null,
  setTopTrack: () => {},
  setProfile: () => {},
  emptyProfile: () => {},
  handleArtistsOrSongsSearch: () => {},
  handleArtistDetailSearch: () => {},
  setSelectedTrack: () => {},
  navigate: () => {},
};

const SearchContext = createContext<UseSearchStateContext>(
  initSearchContextState
);

export default SearchContext;
