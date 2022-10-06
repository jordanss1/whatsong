import React, { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [typeString, setTypeString] = useState("");
  const [page, setPage] = useState(1);
  const [elements, setElements] = useState([0, 10]);

  const focused = useRef(false);

  const navigate = useNavigate();

  const fullProviders = {
    focused,
    elements,
    page,
    typeString,
    term,
    selectedItem,
    submittedTerm,
    items,
    setElements,
    setPage,
    setTypeString,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
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
