import React, { useContext } from "react";

const ArtistTopTracks = () => {
  const { topTracks, setTopTracks } = useContext();

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      setAlbums(JSON.parse(sessionStorage.getItem("artist-details"))[2]);
    }
  }, []);

  return <div>ArtistTopTracks</div>;
};

export default ArtistTopTracks;
