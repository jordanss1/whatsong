import React, { createContext, useEffect, useState } from "react";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [term, setTerm] = useState("");

  const fullProviders = {
    term,
    hover,
    focus,
    setHover,
    setFocus,
    setTerm,
    spotifyTokenAndSearch,
  };

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
