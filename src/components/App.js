import React, { useContext } from "react";
import SelectedSong from "./SelectedSong";
import Header from "./Header";
import SearchList from "./SearchList";
import "../styles/body.css";
import SearchContext from "../contexts/SearchStore";

const App = () => {
  const { selectedSong, typeString, items } = useContext(SearchContext);

  const addClass = () => {
    if (
      (typeString === "artist" && items.length === 12) ||
      (typeString === "track" && items.length === 12)
    ) {
      return "artists";
    } else if (
      (typeString === "track" && items.length === 20) ||
      (typeString === "artist" && items.length === 20)
    ) {
      return "tracks";
    }
  };

  return (
    <main
      className={`container-fluid px-0 d-grid mainContainer ${
        selectedSong ? "containerAnimate" : ""
      }`}
    >
      <section id="selectedContainer" className="d-flex align-items-center">
        <SelectedSong />
      </section>
      <section id="mainPortion" className="d-grid">
        <div id="portion1">
          <Header />
        </div>
        <div id="portion2" className={`d-flex flex-column align-items-center mt-3 d-lg-grid p-lg-5 ${addClass()}`}>
          <SearchList />
        </div>
      </section>
    </main>
  );
};

export default App;
