import React, { useContext, useEffect } from "react";

const ArtistAlbums = () => {
  const { albums, setAlbums } = useContext();

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      setAlbums(JSON.parse(sessionStorage.getItem("artist-details"))[1]);
    }
  }, []);

  return <div>ArtistAlbums</div>;
};

export default ArtistAlbums;
