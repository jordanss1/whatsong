import React, { useContext } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchDropdown = () => {
  const { setTypeString } = useContext(SearchContext);

  return (
    <div className="ui form dropdownClass">
      <div className="field">
        <select
          onChange={({ target }) => {
            setTypeString(target.value);
          }}
          className="p-2"
        >
          <option value="artist">Artists</option>
          <option value="track">Songs</option>
        </select>
      </div>
    </div>
  );
};

export default SearchDropdown;
