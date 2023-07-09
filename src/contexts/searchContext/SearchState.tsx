import { useState, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyArtistsOrSongsSearch, spotifyArtistAndAlbum } from "../../api";
import {
  useArtistResults,
  artistInitState,
} from "../../hooks/DetailedArtistResultHooks";
import { TopTracksDetailsType } from "../../types";
import { useArtistsOrTracks } from "../../hooks/ArtistsAndTracksHook";
import { CancelTokenSource } from "axios";

export const SearchState = () => {
  const [term, setTerm] = useState<string>("");
  const [submittedTerm, setSubmittedTerm] = useState<string>("");
  const [selectedSong, setSelectedSong] =
    useState<Required<TopTracksDetailsType> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cancelToken = useRef<CancelTokenSource | null>(null);

  const {
    artists,
    totalArtists,
    tracks,
    totalTracks,
    setFullArtists,
    setTracks,
    setPage,
    page,
    fullArtists,
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

  const handleArtistsOrSongsSearch = (
    query: string,
    typeOfSearch: "artist" | "track"
  ) => {
    if (cancelToken.current) cancelToken.current.cancel();

    const stateSetter = typeOfSearch === "artist" ? setFullArtists : setTracks;

    spotifyArtistsOrSongsSearch(
      query,
      cancelToken,
      typeOfSearch,
      stateSetter,
      setLoading
    );
  };

  const handleArtistDetailSearch = (id: string) => {
    if (cancelToken.current) cancelToken.current.cancel();

    spotifyArtistAndAlbum(id, cancelToken, setProfile, setLoading);
  };

  let error: Error | null = null;

  if (fullArtists?.error) error = fullArtists.error;

  if (tracks?.error) error = tracks.error;

  if (artistDetailError) error = artistDetailError;

  const providerValues = {
    loading,
    topTracks,
    topTrack,
    artistDetail,
    error,
    albums,
    album,
    page,
    term,
    selectedSong,
    submittedTerm,
    fullArtists,
    artists,
    tracks,
    totalArtists,
    totalTracks,
    setFullArtists,
    setTracks,
    setTopTrack,
    setAlbum,
    setProfile,
    setPage,
    setTerm,
    setSubmittedTerm,
    handleArtistsOrSongsSearch,
    handleArtistDetailSearch,
    setSelectedSong,
    navigate,
  };

  return { ...providerValues };
};

export type UseSearchStateContext = ReturnType<typeof SearchState>;

const initSearchContextState: UseSearchStateContext = {
  loading: false,
  topTracks: [],
  topTrack: null,
  artistDetail: artistInitState.artistDetail,
  error: null,
  albums: [],
  album: null,
  setAlbum: () => {},
  page: 0,
  term: "",
  selectedSong: null,
  submittedTerm: "",
  fullArtists: null,
  artists: null,
  tracks: null,
  totalArtists: 0,
  totalTracks: 0,
  setFullArtists: () => {},
  setTracks: () => {},
  setTopTrack: () => {},
  setProfile: () => {},
  setPage: () => {},
  setTerm: () => {},
  setSubmittedTerm: () => {},
  handleArtistsOrSongsSearch: () => {},
  handleArtistDetailSearch: () => {},
  setSelectedSong: () => {},
  navigate: () => {},
};

const SearchContext = createContext<UseSearchStateContext>(
  initSearchContextState
);

export default SearchContext;
