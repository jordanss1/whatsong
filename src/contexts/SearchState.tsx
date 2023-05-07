import { useState, useRef, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch, spotifyArtistAndAlbum } from "../api";
import {
  useAnimateSearchManager,
  useAnimateListManager,
  searchAnimateInit,
  searchListAnimateInit,
} from "./AnimateStateHooks";
import { useArtistResults, artistInitState } from "./SearchResultHooks";
import { TopTracksDetailsType, TrackAndArtistDetailsType } from "../types";

export const SearchState = () => {
  const [term, setTerm] = useState<string>("");
  const [submittedTerm, setSubmittedTerm] = useState<string>("");
  const [items, setItems] = useState<TrackAndArtistDetailsType | null>(null);
  const [selectedItem, setSelectedItem] =
    useState<Required<TopTracksDetailsType> | null>(null);
  const [typeString, setTypeString] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [slicedElements, setSlicedElements] = useState<number[]>([0, 10]);
  const [filteredAlbum, setFilteredAlbum] = useState<number>(0);
  const [filteredTrack, setFilteredTrack] = useState<number>(0);

  const { animateStateSearch, setAnimateStateSearch } =
    useAnimateSearchManager(searchAnimateInit);

  const { animateStateList, setAnimateStateList } = useAnimateListManager(
    searchListAnimateInit
  );

  const { artist, albums, topTracks, setProfile } =
    useArtistResults(artistInitState);

  const navigate = useNavigate();

  const providerValues = {
    animateStateSearch,
    animateStateList,
    filteredAlbum,
    filteredTrack,
    topTracks,
    artist,
    albums,
    slicedElements,
    page,
    typeString,
    term,
    selectedItem,
    submittedTerm,
    items,
    setAnimateStateList,
    setAnimateStateSearch,
    setFilteredAlbum,
    setFilteredTrack,
    setProfile,
    setSlicedElements,
    setPage,
    setTypeString,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
    spotifyArtistAndAlbum,
    setSelectedItem,
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
  artist: artistInitState.artist,
  albums: [],
  slicedElements: [0, 10],
  page: 0,
  typeString: "",
  term: "",
  selectedItem: null,
  submittedTerm: "",
  items: [],
  setAnimateStateList: () => {},
  setAnimateStateSearch: () => {},
  setFilteredAlbum: () => {},
  setFilteredTrack: () => {},
  setProfile: () => {},
  setSlicedElements: () => {},
  setPage: () => {},
  setTypeString: () => {},
  setTerm: () => {},
  setSubmittedTerm: () => {},
  setItems: () => {},
  spotifyTokenAndSearch: () => {},
  spotifyArtistAndAlbum: () => {},
  setSelectedItem: () => {},
  navigate: () => {},
};

const SearchContext = createContext<UseSearchStateContext>(
  initSearchContextState
);

export default SearchContext;
