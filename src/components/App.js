import React from "react";
import SelectedSong from "./SelectedSong";
import Header from "./Header";
import SongList from "./SongList";
import "../styles/body.css";

const App = () => {
  return (
    <main id="mainContainer" className="container-fluid px-0 d-grid">
      <section id="selectedContainer">
        <SelectedSong />
      </section>
      <section id="mainPortion" className="d-grid">
        <div id="portion1">
          <Header />
        </div>
        <div id="portion2">
          <SongList />
        </div>
      </section>
    </main>
  );
};

export default App;
