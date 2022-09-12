import React, { createContext, useEffect, useState } from "react";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [typeString, setTypeString] = useState("");

  const fullProviders = {
    term,
    selectedSong,
    submittedTerm,
    hover,
    focus,
    items,
    typeString,
    setHover,
    setFocus,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
    setTypeString,
    setSelectedSong,
  };

  useEffect(() => {
    let stateSetters = [setTypeString, setItems];
    const randomArtistInitial = [..."abcdefghijklmnopqrstuvwxyz"][
      Math.floor(Math.random() * 25)
    ];
    spotifyTokenAndSearch(randomArtistInitial, "artist", stateSetters, 12);
  }, []);

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
