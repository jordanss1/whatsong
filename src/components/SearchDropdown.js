import React, { useContext, useEffect, useRef } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchDropdown = () => {
  const { setTypeString } = useContext(SearchContext);
  const type = useRef("");

  useEffect(() => {
    if (!type.current) {
      return;
    } else {
      console.log(type.current);
      setTypeString(type.current);
    }
  }, [type.current]);

  return (
    <div className="ui form dropdownClass">
      <div className="field">
        <select
          onChange={({ target }) => {
            type.current = target.value;
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
