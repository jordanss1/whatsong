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

export const spotifySearch = (token, q, type) => {
  const typeString = `${type}s`;

  spotifyAPI
    .get("/search", {
      headers: {
        Authorization: token,
      },
      params: { q: q, type: type },
    })
    .then(({ data }) => {
      const list = { [typeString]: data[typeString].items };
      console.log(list);
      return list;
    });
};

export const spotifyTokenAndSearch = (q, type) => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  spotifyToken
    .post("", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => {
      const accessToken = `Bearer ${data.access_token}`;
      spotifySearch(accessToken, q, type);
    });
};
