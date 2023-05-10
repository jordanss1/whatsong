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
  const [page, setPage] = useState<number>(1);
  const [slicedElements, setSlicedElements] = useState<number[]>([0, 10]);
  const [filteredAlbum, setFilteredAlbum] = useState<number>(0);
  const [filteredTrack, setFilteredTrack] = useState<number>(0);

  const { artists, totalArtists, tracks, totalTracks, setArtists, setTracks } =
    useArtistsOrTracks();

  const { animateStateSearch, setAnimateStateSearch } =
    useAnimateSearchManager(searchAnimateInit);

  const { animateStateList, setAnimateStateList } = useAnimateListManager(
    searchListAnimateInit
  );

  const {
    artistDetail,
    albums,
    totalAlbums,
    topTracks,
    totalTopTracks,
    setProfile,
  } = useArtistResults(artistInitState);

  const navigate = useNavigate();

  const providerValues = {
    animateStateSearch,
    animateStateList,
    filteredAlbum,
    filteredTrack,
    topTracks,
    totalTopTracks,
    artistDetail,
    albums,
    totalAlbums,
    slicedElements,
    page,

    term,
    selectedSong,
    submittedTerm,
    artists,
    tracks,
    totalArtists,
    totalTracks,
    setArtists,
    setTracks,
    setAnimateStateList,
    setAnimateStateSearch,
    setFilteredAlbum,
    setFilteredTrack,
    setProfile,
    setSlicedElements,
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
  filteredAlbum: 0,
  filteredTrack: 0,
  topTracks: [],
  totalTopTracks: 0,
  artistDetail: artistInitState.artistDetail,
  albums: [],
  totalAlbums: 0,
  slicedElements: [0, 10],
  page: 0,
  term: "",
  selectedSong: null,
  submittedTerm: "",
  artists: null,
  tracks: null,
  totalArtists: 0,
  totalTracks: 0,
  setArtists: () => {},
  setTracks: () => {},
  setAnimateStateList: () => {},
  setAnimateStateSearch: () => {},
  setFilteredAlbum: () => {},
  setFilteredTrack: () => {},
  setProfile: () => {},
  setSlicedElements: () => {},
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
