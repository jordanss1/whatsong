import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";

const ArtistTopTracks = () => {
  const { topTracks, setTopTracks } = useContext(SearchContext);

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      setTopTracks(JSON.parse(sessionStorage.getItem("artist-details"))[2]);
    }
  }, []);

  return <div>ArtistTopTracks</div>;
};

export default ArtistTopTracks;
