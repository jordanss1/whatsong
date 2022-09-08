import React from "react";
import "../styles/body.css";

const SearchBar = () => {
  return (
    <div id="searchContainer" className="w-50 d-flex justify-content-end">
      <div className="ui left icon input w-50">
        <i className="inverted circular search link icon"></i>
        <input
          type="text"
          placeholder="Search..."
          data-dashlane-rid="3640789f2356683f"
          data-form-type=""
          className="searchInput"
        />
      </div>
    </div>
  );
};

export default SearchBar;
