import React, { useContext } from "react";
import SearchContext from "../contexts/SearchStore";

const SearchList = () => {
  const { typeString, items, submittedTerm, setSelectedSong } =
    useContext(SearchContext);

  const mobile = () => {
    if (window.innerWidth < 980) {
      return true;
    } else {
      return false;
    }
  };

  const renderHeader = () => {
    if (
      (typeString === "artist" && !submittedTerm && items.length) ||
      (typeString === "track" && !submittedTerm && items.length === 12)
    ) {
      return (
        <h3 className="ui dividing header artistHeader mt-0 pb-3 ps-sm-4 pt-2">
          Popular artists from Spotify
        </h3>
      );
    } else if (
      (typeString === "artist" && submittedTerm && items.length === 12) ||
      (typeString === "track" && items.length === 12 && submittedTerm)
    ) {
      return (
        <h3 className="ui dividing header artistHeader mt-0 pb-3 ps-sm-4 pt-2">
          {`Search for "${submittedTerm}" in artists`}
        </h3>
      );
    } else if (
      (typeString === "track" && submittedTerm && items.length === 20) ||
      (typeString === "artist" && submittedTerm && items.length === 20)
    ) {
      return (
        <h3 className="ui dividing header songHeader mt-0 pb-3 ps-sm-4 pt-2">
          {`Search for "${submittedTerm}" in songs`}
        </h3>
      );
    } else if (typeString && submittedTerm && !items.length) {
      return (
        <h3 className="ui dividing header listHeader mt-0 ps-sm-4 pt-2">
          {`No results for search term`}
        </h3>
      );
    }
  };

  const renderSearchList = () => {
    if (
      (typeString === "artist" && items.length === 12) ||
      (typeString === "artist" && !items.length) ||
      (typeString === "track" && items.length === 12)
    ) {
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
                {!images.length ? (
                  <div
                    className="image d-flex justify-content-center p-2 pb-0"
                    href="#"
                  >
                    <h3>No image</h3>
                  </div>
                ) : (
                  <div
                    className="image d-flex justify-content-center p-2 pb-0"
                    href="#"
                  >
                    <img src={images[1].url} />
                  </div>
                )}
                <div className="content">
                  <p className="header" href="#">
                    {name}
                  </p>
                  <div className="meta">
                    <p>
                      {`${new Intl.NumberFormat("en-US").format(
                        followers.total
                      )} followers`}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          );
        }
      );
    } else if (
      (typeString === "track" && submittedTerm) ||
      (typeString === "track" && !submittedTerm) ||
      (typeString === "artist" && items.length === 20)
    ) {
      return items.map((item, i) => {
        return (
          <div
            key={i}
            className="ui middle aligned selection divided list d-flex justify-content-center trackItemContainer"
          >
            <div className="item trackItem p-3">
              <div className="right floated content">
                <div
                  hidden={mobile()}
                  onClick={() => setSelectedSong(item)}
                  className="ui button"
                >
                  Details
                </div>
                <div
                  onClick={() =>
                    window.open(item.external_urls.spotify, "blank")
                  }
                  className="ui button"
                  title={item.external_urls.spotify}
                >
                  Listen
                </div>
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
