import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch, spotifyArtistAndAlbum } from "../api";
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

export const SearchState = () => {
  const [term, setTerm] = useState<string>("");
  const [submittedTerm, setSubmittedTerm] = useState<string>("");
  const [selectedSong, setSelectedSong] =
    useState<Required<TopTracksDetailsType> | null>(null);
  const [filteredTrack, setFilteredTrack] = useState<number>(0);

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
    useAnimateSearchManager(searchAnimateInit);

  const { animateStateList, setAnimateStateList } = useAnimateListManager(
    searchListAnimateInit
  );

  const {
    artistDetail,
    albums,
    album,
    topTracks,
    topTrack,
    setProfile,
    setAlbum,
    setTopTrack,
  } = useArtistResults(artistInitState);

  const navigate = useNavigate();

  const providerValues = {
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
    spotifyTokenAndSearch,
    spotifyArtistAndAlbum,
    setSelectedSong,
    navigate,
  };

  return { ...providerValues };
};

export type UseSearchStateContext = ReturnType<typeof SearchState>;

const initSearchContextState: UseSearchStateContext = {
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
  spotifyTokenAndSearch: () => {},
  spotifyArtistAndAlbum: () => {},
  setSelectedSong: () => {},
  navigate: () => {},
};

const SearchContext = createContext<UseSearchStateContext>(
  initSearchContextState
);

export default SearchContext;
