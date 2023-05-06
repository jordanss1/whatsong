import { Dispatch, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch, spotifyArtistAndAlbum } from "../api";
import {
  useAnimateSearchManager,
  useAnimateListManager,
} from "./AnimateStateHooks";
import { useArtistResults } from "./SearchResultHooks";

const SearchState = () => {
  const [term, setTerm] = useState<string>("");
  const [submittedTerm, setSubmittedTerm] = useState<string>("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState<null>(null);
  const [typeString, setTypeString] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [slicedElements, setSlicedElements] = useState<number[]>([0, 10]);
  const [filteredAlbum, setFilteredAlbum] = useState<number>(0);
  const [filteredTrack, setFilteredTrack] = useState<number>(0);

  const { animateStateSearch, setAnimateStateSearch } = useAnimateSearchManager(
    {
      initial: { opacity: 0.5, y: 100 },
      exit: { opacity: 0, y: 0 },
    }
  );

  const { animateStateList, setAnimateStateList } = useAnimateListManager({
    initial: { x: -300, opacity: 0 },
    exit: { x: -300, opacity: 0 },
  });

  const { artist, albums, topTracks, setProfile } = useArtistResults({
    artist: null,
    albums: null,
    topTracks: null,
  });

  const focused = useRef<boolean>(false);

  const pageChange = useRef<boolean>(false);

  const navigate = useNavigate();

  const providerValues = {
    animateStateSearch,
    animateStateList,
    filteredAlbum,
    filteredTrack,
    topTracks,
    artist,
    albums,
    focused,
    pageChange,
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

export type UseSearchStateContext = ReturnType<typeof SearchState>

const initSearchContextState: UseSearchStateContext = {
    animateStateSearch:  {}   ,
    animateStateList:     {},
    filteredAlbum:     0,
    filteredTrack:     0,
    topTracks:     {},
    artist:     {},
    albums:     [],
    focused:    useRef(false),
    pageChange:     useRef(false),
    slicedElements:     [0,10],
    page:     0,
    typeString:     "",
    term:     "",
    selectedItem:     null,
    submittedTerm:     "",
    items:     [],
    setAnimateStateList:     (initial: any, exit: any) => {},
    setAnimateStateSearch:     (initial: any, exit: any) => {},
    setFilteredAlbum:    () => {},
    setFilteredTrack:    () => {},
    setProfile:     () => {},
    setSlicedElements:     () => {},
    setPage:     () => {},
    setTypeString:     () => {},
    setTerm:     () => {},
    setSubmittedTerm:    () => {},
    setItems:     () => {},
    spotifyTokenAndSearch:  ,
    spotifyArtistAndAlbum:     ,
    setSelectedItem:     ,
    navigate:     ,
}

export default SearchState;
