import React, { createContext, useEffect, useState } from "react";
import { accessToken } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  return <SearchContext.Provider>{children}</SearchContext.Provider>;
};

export default SearchContext;
