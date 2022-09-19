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

const spotifyArtist = axios.create({
  baseURL: "https://api.spotify.com/artists",
});

export const spotifySearch = (token, q, type, state, limit) => {
  const string = `${type}s`;

  spotifyQuery
    .get("/search", {
      headers: {
        Authorization: token,
      },
      params: { q, type, limit },
    })
    .then(({ data }) => {
      console.log(data);
      state(data[string].items);
    });
};

export const spotifyTokenAndSearch = (q, type, state, limit) => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  spotifyToken
    .post("", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => {
      const accessToken = `Bearer ${data.access_token}`;
      spotifySearch(accessToken, q, type, state, limit);
    });
};

export const spotifyArtistSearch = (token, id, state) => {
  spotifyArtist
    .get(id, {
      headers: {
        Authorization: token,
      },
    })
    .then(({ data }) => console.log(data));
};

export const spotifyTokenAndArtist = (id, state) => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  spotifyToken
    .post("", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => {
      const accessToken = `Bearer ${data.access_token}`;
      spotifyArtist(accessToken, id, state);
    });
};
