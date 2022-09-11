import React, { createContext, useEffect, useState } from "react";
import { accessToken } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    accessToken();
  }, []);

  const fullProviders = {
    hover,
    focus,
    setHover,
    setFocus,
  };

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
