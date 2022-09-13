import React, { useContext } from "react";
import SelectedSong from "./SelectedSong";
import Header from "./Header";
import SearchList from "./SearchList";
import "../styles/body.css";
import SearchContext from "../contexts/SearchStore";

const App = () => {
  const { typeString } = useContext(SearchContext);
  return (
    <main id="mainContainer" className="container-fluid px-0 d-grid">
      <section id="selectedContainer" className="d-flex align-self-center">
        <SelectedSong />
      </section>
      <section id="mainPortion" className="d-grid">
        <div id="portion1">
          <Header />
        </div>
        <div
          id="portion2"
          className={`d-grid p-5 ${
            typeString === "artists" ? "artists" : "tracks"
          }`}
        >
          <SearchList />
        </div>
      </section>
    </main>
  );
};

export default App;
