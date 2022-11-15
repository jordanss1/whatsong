import React, { memo } from "react";
import SearchBar from "./SearchBar";

const SongList = ({ items, handleSelectedItem }) => {
  const hidden = window.innerWidth < 992 ? true : false;

  return (
    <div className="d-grid h-100 pt-1 mt-3 mt-xl-0 songListContainer">
      <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row searchListDiv align-self-lg-end border rounded-3">
        <h2 className="ms-4 fs-3 pt-1 typeHeader">Songs</h2>
        <SearchBar />
      </div>
      <div className="d-grid  songListGrid">
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className="ui middle aligned selection divided list d-flex justify-content-center trackItemContainer"
            >
              <div className="item trackItem border rounded-3 p-3">
                <div className="right floated content d-flex align-items-center">
                  <div
                    hidden={hidden}
                    onClick={() => handleSelectedItem(item)}
                    className="ui button"
                  >
                    Details
                  </div>
                  <div
                    onClick={() =>
                      window.open(item.external_urls.spotify, "_blank")
                    }
                    className="ui button"
                    title={item.external_urls.spotify}
                  >
                    Listen
                  </div>
                </div>
                <img
                  className="ui avatar image"
                  src={item.album?.images[2].url}
                ></img>
                {item.artists?.slice(0, 1).map((artist, i) => {
                  return (
                    <h3
                      style={{ maxWidth: "530px" }}
                      key={i + 1}
                      className="content fs-4 pt-1"
                    >{`${artist.name} - ${item.name}`}</h3>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(SongList);
