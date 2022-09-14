import axios from "axios";
import { Buffer } from "buffer";

const clientId = process.env.REACT_APP_ID;
const clientSecret = process.env.REACT_APP_SECRET;

const clientMix =
  "Basic " + Buffer(clientId + ":" + clientSecret).toString("base64");

const spotifyToken = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
});

const spotifyAPI = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const spotifySearch = (token, q, type, state, limit) => {
  const string = `${type}s`;

  spotifyAPI
    .get("/search", {
      headers: {
        Authorization: token,
      },
      params: { q, type, limit },
    })
    .then(({ data }) => {
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
