import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchStore } from "./contexts/SearchStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <Router>
    <SearchStore>
      <App />
    </SearchStore>
  </Router>
);
