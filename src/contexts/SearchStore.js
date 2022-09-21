import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [typeString, setTypeString] = useState("");
  const [nav, setNav] = useState(false);
  const [page, setPage] = useState(1);
  const [focus, setFocus] = useState(false);
  const [elements, setElements] = useState([0, 10]);

  const navigate = useNavigate();

  const fullProviders = {
    elements,
    page,
    focus,
    typeString,
    term,
    selectedItem,
    submittedTerm,
    items,
    nav,
    setElements,
    setPage,
    setFocus,
    setTypeString,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
    setNav,
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
