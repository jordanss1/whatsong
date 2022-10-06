import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import SearchContext from "../contexts/SearchStore";
import SearchBar from "./SearchBar";
import SelectedItem from "./SelectedItem";
import { motion } from "framer-motion";

const SearchList = () => {
  const hidden = window.innerWidth < 900 ? true : false;

  const {
    items,
    page,
    setPage,
    elements,
    setElements,
    selectedItem,
    setTypeString,
    setItems,
    setSelectedItem,
    typeString,
  } = useContext(SearchContext);

  useEffect(() => {
    const nav = document.getElementsByClassName("navClass")[0];

    setPage(1);
    nav.classList.add("navClassList");

    if (sessionStorage.getItem("artists")) {
      setTypeString("artist");
      setItems(JSON.parse(sessionStorage.getItem("artists")));
    } else if (sessionStorage.getItem("tracks")) {
      setTypeString("track");
      setItems(JSON.parse(sessionStorage.getItem("tracks")));
    }
  }, []);

  useEffect(() => {
    if (page === 1) {
      setElements([0, 10]);
    }
    if (page === 2) {
      setElements([11, 21]);
    }
    if (page === 3) {
      setElements([22, 32]);
    }
    if (page === 4) {
      setElements([33, 43]);
    }
  }, [page]);

  const handleClick = () => {
    document
      .getElementsByClassName("artistGrid")[0]
      .scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = () => {
    return (
      <div className="d-flex listNavbar">
        <div className="text-lowercase">
          <span className="w">w.</span>
          <span className="pink me-2">s</span>
        </div>
        <span className="underScore ms-1">_</span>
        <div className="d-flex align-items-end ps-2 pe-2 pb-3 listSpotify">
          <h2 className="fs-6 me-2 mt-3 poweredList text-lowercase">
            powered by
          </h2>
          <i className="spotify icon mb-1 fs-1 pe-1 spotifyIconList"></i>
        </div>
      </div>
    );
  };

  const renderSongs = () => {
    if (items.length === 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 d-flex flex-column align-items-center justify-content-between justify-content-center pt-4 noResultsSong"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-between  flex-column flex-xl-row noResultsSearch border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Songs</h2>
            <SearchBar />
          </div>
          <div className="d-flex flex-column ms-2 align-items-center justify-content-center p-5 p-xl-0">
            <h3>No results found</h3>
          </div>
        </motion.section>
      );
    } else if (items.length > 0) {
      return (
        <section
          className={`${
            selectedItem ? "containerAnimate" : ""
          } w-100 d-grid selectedContainer`}
        >
          <SelectedItem />
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
                      <div className="right floated content">
                        <div
                          hidden={hidden}
                          onClick={() => setSelectedItem(item)}
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
                            style={selectedItem ? { maxWidth: "530px" } : {}}
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
        </section>
      );
    }
  };

  const renderArtists = (elements) => {
    if (items.length === 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 h-100 d-grid artistListContainer align-items-center justify-content-center pt-4"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row noResultsSearch border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Artists</h2>
            <SearchBar />
          </div>
          <div className="d-flex flex-column ms-2 align-items-center justify-content-center p-5 p-xl-0 artistGrid">
            <h3>No results found</h3>
          </div>
        </motion.section>
      );
    } else if (items.length > 0) {
      return (
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-100 h-100 d-grid artistListContainer align-items-center justify-content-center pt-4"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-xl-between flex-column flex-xl-row searchListDiv align-self-lg-end border rounded-3">
            <h2 className="ms-0 ms-xl-4 fs-3 pt-1 typeHeader">Artists</h2>
            <SearchBar />
          </div>
          <div className="d-sm-grid d-flex flex-column ms-2 align-items-center justify-content-md-center p-5 p-xl-0  artistGrid">
            {items
              .slice(elements[0], elements[1])
              .map(({ external_urls, name, images }, i) => {
                return (
                  <div className="artistContainer" key={i}>
                    <article
                      onClick={() =>
                        window.open(external_urls.spotify, "_blank")
                      }
                      className="ui fluid card"
                    >
                      {!images.length ? (
                        <div
                          style={{ cursor: "pointer" }}
                          className="image p-5"
                        >
                          <h3>No image</h3>
                        </div>
                      ) : (
                        <div
                          style={{ cursor: "pointer" }}
                          className="image pb-0"
                        >
                          <img
                            className="artistImage p-1"
                            src={images ? images[0].url : ""}
                          />
                        </div>
                      )}
                      <div className="content artistContent ps-2 pt-1  d-flex justify-content-center justify-content-evenly align-content-center p-0">
                        <a className="header text-center fs-5 pt-2">{name}</a>
                        <i
                          onClick={() =>
                            window.open(external_urls.spotify, "_blank")
                          }
                          className="spotify icon fs-4"
                        ></i>
                      </div>
                    </article>
                  </div>
                );
              })}
          </div>
          <div
            className={`w-100 pages justify-content-center  mb-lg-4 ${
              items.length === 0 ? "d-none" : "d-flex"
            }`}
          >
            <div className="d-flex justify-content-center justify-content-between pages w-75 fs-1">
              <p
                onClick={() => {
                  setPage(1);
                  handleClick();
                }}
              >
                1
              </p>
              <p
                hidden={Boolean(items.length < 11)}
                onClick={() => {
                  setPage(2);
                  handleClick();
                }}
              >
                2
              </p>
              <p
                hidden={Boolean(items.length < 21)}
                onClick={() => {
                  setPage(3);
                  handleClick();
                }}
              >
                3
              </p>
              <p
                hidden={Boolean(items.length < 31)}
                onClick={() => {
                  setPage(4);
                  handleClick();
                }}
              >
                4
              </p>
            </div>
          </div>
        </motion.section>
      );
    }
  };

  return (
    <motion.main
      initial={{
        position: "relative",
        top: "500px",
        opacity: 0,
        transition: { duration: 0.5 },
      }}
      id="main"
      animate={{ top: "0px", opacity: 1, transition: { duration: 0.5 } }}
      exit={{ top: "500px", opacity: 0, transition: { duration: 1 } }}
      style={items.length === 0 ? { height: "100vh" } : {}}
      className={`${
        typeString === "artist"
          ? "artistWholeListContainer d-flex flex-column px-1"
          : `songWholeListContainer ${
              items.length === 0 ? "d-flex flex-column" : "d-grid"
            }`
      } container-fluid `}
    >
      <NavBar content={content} />
      {typeString === "artist" ? renderArtists(elements) : renderSongs()}
    </motion.main>
  );
};

export default SearchList;
