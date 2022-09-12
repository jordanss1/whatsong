import React from "react";
import SelectedSong from "./SelectedSong";
import Header from "./Header";
import SearchList from "./SearchList";
import "../styles/body.css";

const App = () => {
  return (
    <main id="mainContainer" className="container-fluid px-0 d-grid">
      <section id="selectedContainer"  className="d-flex align-self-center">
        <SelectedSong />
      </section>
      <section id="mainPortion" className="d-grid">
        <div id="portion1">
          <Header />
        </div>
        <div id="portion2" className="d-grid p-5">
          <SearchList />
        </div>
      </section>
    </main>
  );
};

export default App;
