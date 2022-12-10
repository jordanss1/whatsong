import { spotifyTokenAndSearch, spotifyArtistAndAlbum } from "../api";
import { useNavigate } from "react-router-dom";

export const selectedItems = {
  pageChange: { current: false },
  focused: { current: false },
  submittedTerm: "",
  setSubmittedTerm: (submittedTerm) =>
    (selectedItems.submittedTerm = submittedTerm),
  term: "",
  page: 1,
  setTerm: (term) => (selectedItems.term = term),
  setPage: (page) => (selectedItems.page = page),
  artist: null,
  items: null,
  albums: null,
  topTracks: null,
  animateStateList: { initial: "", exit: "" },
  selectedItem: null,
  setTypeString: (typeString) => (selectedItems.typeString = typeString),
  setItems: (items) => (selectedItems.items = items),
  typeString: "artist",
  setAnimateStateList: () => {},
  setAnimateStateSearch: () => {},
  setSelectedItem: (selectedItem) =>
    (selectedItems.selectedItem = selectedItem),
  spotifyTokenAndSearch,
  spotifyArtistAndAlbum,
  setFilteredAlbum: () => {},
  setFilteredTrack: () => {},
  navigate: useNavigate,
  setProfile: (artist, albums, topTracks) => {
    selectedItems.artist = artist;
    selectedItems.albums = albums;
    selectedItems.topTracks = topTracks;
  },
  slicedElements: [0, 10],
  setSlicedElements: (slicedElements) =>
    (selectedItems.slicedElements = slicedElements),
};
