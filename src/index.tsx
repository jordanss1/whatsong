import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchStore } from "./contexts/searchContext/SearchStore";
import FramerStore from "./contexts/framerContext/FramerStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <Router>
    <SearchStore>
      <FramerStore>
        <App />
      </FramerStore>
    </SearchStore>
  </Router>
);
