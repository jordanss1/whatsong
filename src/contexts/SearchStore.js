import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [typeString, setTypeString] = useState("");
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const fullProviders = {
    term,
    selectedSong,
    submittedTerm,
    items,
    nav,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
    setNav,
    setSelectedSong,
    navigate,
  };

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
