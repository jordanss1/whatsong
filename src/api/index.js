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

export const spotifySearch = (token, q) => {
  spotifyAPI
    .get("/search", {
      header: {
        Authorization: token,
      },
      params: { q: q, type: "track" },
    })
    .then((response) => console.log(response));
};

export const spotifyTokenAndSearch = (q) => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  spotifyToken
    .post("", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => {
      const accessToken = `Bearer ${data.access_token}`;
      console.log(accessToken);
      spotifySearch(accessToken, q);
    });
};
