import axios from "axios";
import { Buffer } from "buffer";

const clientId = process.env.REACT_APP_ID;
const clientSecret = process.env.REACT_APP_SECRET;

export const clientMix =
  "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");

const spotifyToken = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
});

const spotifyQuery = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const spotifyArtistAndAlbum = (id: string, state: () => {}): Promise<> => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  const artistAndAlbum = [
    `https://api.spotify.com/v1/artists/${id}`,
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&limit=50`,
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
  ];

  spotifyToken
    .post("", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => {
      const accessToken = `Bearer ${data.access_token}`;

      axios
        .all(
          artistAndAlbum.map((endpoint) =>
            axios.get(endpoint, {
              headers: {
                Authorization: accessToken,
              },
            })
          )
        )
        .then((responses) => {
          const artist = responses[0].data;
          let topTracks = responses[2].data.tracks;
          let albums = [
            ...new Map(
              responses[1].data.items.map((item) => [item.name, item])
            ).values(),
          ];

          albums = albums.length === 0 ? { noAlbums: "no albums" } : albums;

          topTracks =
            topTracks.length === 0 ? { noTracks: "no tracks" } : topTracks;

          state(artist, albums, topTracks);
          sessionStorage.setItem(
            "artist-details",
            JSON.stringify([artist, albums, topTracks])
          );
        });
    });
};

export const spotifyTokenAndSearch = (q, type, state) => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  spotifyToken
    .post("", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => {
      const accessToken = `Bearer ${data.access_token}`;
      const string = `${type}s`;

      spotifyQuery
        .get("/search", {
          headers: {
            Authorization: accessToken,
          },
          params: { q, type, limit: 40 },
        })
        .then(({ data }) => {
          state(
            data[string].items.length === 0
              ? { noItems: "noItems" }
              : data[string].items
          );
        });
    });
};
