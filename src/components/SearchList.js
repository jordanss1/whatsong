import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchList = () => {
  const { typeString, items, submittedTerm } = useContext(SearchContext);

  const renderHeader = () => {
    if (typeString === "artists" && !submittedTerm) {
      return (
        <h3 className="ui dividing header listHeader ps-4 pt-2">
          Popular artists from Spotify
        </h3>
      );
    }
  };

  const renderSearchList = () => {
    if (typeString === "artists") {
      const popularList = items.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      return popularList.map(
        ({ external_urls, name, followers, images }, i) => {
          return (
            <div key={i}>
              <article
                title={external_urls.spotify}
                className="ui raised card artistCard"
                onClick={() => window.open(external_urls.spotify, "_blank")}
              >
                <div
                  className="image d-flex justify-content-center p-2 pb-0"
                  href="#"
                >
                  <img src={images[1].url} />
                </div>
                <div className="content">
                  <p className="header" href="#">
                    {name}
                  </p>
                  <div className="meta">
                    <p>Followers: {followers.total}</p>
                  </div>
                </div>
              </article>
            </div>
          );
        }
      );
    } else if (typeString === "tracks") {
      return items.map((item, i) => {
        return (
          <div
            key={i}
            className="ui middle aligned selection divided list d-flex justify-content-center trackItemContainer"
          >
            <div className="item trackItem p-3">
              <div className="right floated content">
                <div className="ui button">Details</div>
                <div className="ui button">Listen</div>
              </div>
              <img
                class="ui avatar image"
                src={item.album?.images[2].url}
              ></img>
              {item.artists?.slice(0, 1).map((artist) => {
                return (
                  <h3 className="content fs-4 pt-1">{`${artist.name} - ${item.name}`}</h3>
                );
              })}
            </div>
          </div>
        );
      });
    }
  };

  return (
    <React.Fragment>
      {renderHeader()}
      {renderSearchList()}
    </React.Fragment>
  );
};

export default SearchList;
