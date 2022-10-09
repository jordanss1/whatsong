import React, { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch, spotifyArtistAndAlbum } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [typeString, setTypeString] = useState("");
  const [page, setPage] = useState(1);
  const [slicedElements, setSlicedElements] = useState([0, 10]);
  const [topTracks, setTopTracks] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [artist, setArtist] = useState(null);
  const [filteredAlbum, setFilteredAlbum] = useState(0);
  const [filteredTrack, setFilteredTrack] = useState(0);

  const focused = useRef(false);

  const navigate = useNavigate();

  const fullProviders = {
    filteredAlbum,
    filteredTrack,
    topTracks,
    artist,
    albums,
    focused,
    slicedElements,
    page,
    typeString,
    term,
    selectedItem,
    submittedTerm,
    items,
    setFilteredAlbum,
    setFilteredTrack,
    setTopTracks,
    setArtist,
    setAlbums,
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

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
