import { useState, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyArtistsOrSongsSearch, spotifyArtistAndAlbum } from "../api";
import {
  useAnimateSearchManager,
  useAnimateListManager,
  searchAnimateInit,
  searchListAnimateInit,
} from "../hooks/AnimateStateHooks";
import {
  useArtistResults,
  artistInitState,
} from "../hooks/DetailedArtistResultHooks";
import { TopTracksDetailsType } from "../types";
import { useArtistsOrTracks } from "../hooks/ArtistsAndTracksHook";
import { CancelTokenSource } from "axios";

export const SearchState = () => {
  const [term, setTerm] = useState<string>("");
  const [submittedTerm, setSubmittedTerm] = useState<string>("");
  const [selectedSong, setSelectedSong] =
    useState<Required<TopTracksDetailsType> | null>(null);
  const [filteredTrack, setFilteredTrack] = useState<number>(0);
  const [networkError, setNetworkError] = useState<Error | null>(null);
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

  const { animateStateSearch, setAnimateStateSearch } =
    useAnimateSearchManager();

  const { animateStateList, setAnimateStateList } = useAnimateListManager();

  const {
    artistDetail,
    albums,
    album,
    topTracks,
    topTrack,
    setProfile,
    setAlbum,
    setTopTrack,
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
      setNetworkError,
      setLoading
    );
  };

  const handleArtistDetailSearch = (id: string) => {
    if (cancelToken.current) cancelToken.current.cancel();

    spotifyArtistAndAlbum(
      id,
      cancelToken,
      setProfile,
      setNetworkError,
      setLoading
    );
  };

  const providerValues = {
    loading,
    networkError,
    animateStateSearch,
    animateStateList,
    filteredTrack,
    topTracks,
    topTrack,
    artistDetail,
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
    setAnimateStateList,
    setAnimateStateSearch,
    setFilteredTrack,
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
  networkError: null,
  animateStateSearch: searchAnimateInit,
  animateStateList: searchListAnimateInit,
  filteredTrack: 0,
  topTracks: [],
  topTrack: null,
  artistDetail: artistInitState.artistDetail,
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
  setAnimateStateList: () => {},
  setAnimateStateSearch: () => {},
  setFilteredTrack: () => {},
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
