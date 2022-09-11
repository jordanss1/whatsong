import React, { createContext, useEffect, useState } from "react";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [term, setTerm] = useState("");
  const [items, setItems] = useState([]);

  const fullProviders = {
    term,
    hover,
    focus,
    setHover,
    setFocus,
    setTerm,
    spotifyTokenAndSearch,
  };

  useEffect(() => {
    const randomArtistInitial = [..."abcdefghijklmnopqrstuvwxyz"][
      Math.floor(Math.random() * 10)
    ];
    setItems(spotifyTokenAndSearch(randomArtistInitial, "track"));
    console.log(items);
  }, []);

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
