import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { SearchStore } from "./contexts/SearchStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SearchStore>
    <App />
  </SearchStore>
);
