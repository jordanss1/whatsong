import axios from "axios";
import { Buffer } from "buffer";

const clientId = process.env.REACT_APP_ID;
const clientSecret = process.env.REACT_APP_SECRET;

const clientMix =
  "Basic " + Buffer(clientId + ":" + clientSecret).toString("base64");

const spotifyToken = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
});

const spotifyQuery = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const spotifyArtistAndAlbum = (id, state) => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  const artistAndAlbum = [
    `https://api.spotify.com/v1/artists/${id}`,
    `https://api.spotify.com/v1/artists/${id}/albums?limit=6&include_groups=album`,
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
          artistAndAlbum.map((object) =>
            axios.get(object, {
              headers: {
                Authorization: accessToken,
              },
            })
          )
        )
        .then((responses) => {
          console.log(responses);
          const albums = [
            ...new Map(
              responses[1].data.items.map((item) => [item.name, item])
            ).values(),
          ];
          const artist = responses[0].data;
          const tracks = responses[2].data.tracks;
          state[0](artist);
          state[1](albums);
          state[2](tracks);
          const arr = [artist, albums, tracks];
          sessionStorage.setItem("artist-details", JSON.stringify(arr));
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
          state(data[string].items);
        });
    });
};
