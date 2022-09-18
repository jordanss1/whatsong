import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Landing from "./Landing";
import Search from "./Search";
import SearchList from "./SearchList";
import SearchChoice from "./SearchChoice";

const App = () => {
  return (
    <>  
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Search />} />
          <Route path="/artists" element={<SearchList />}>
            <Route path=":id" element={<SearchChoice />} />
          </Route>
          <Route path="/songs" element={<SearchList />}>
            <Route path=":id" element={<SearchChoice />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
