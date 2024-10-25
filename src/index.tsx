import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { SearchStore } from "./contexts/SearchStore";

//comment

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
