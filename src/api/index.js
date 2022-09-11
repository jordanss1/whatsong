import axios from "axios";
import { Buffer } from "buffer";

const clientId = process.env.REACT_APP_ID;
const clientSecret = process.env.REACT_APP_SECRET;

const clientMix =
  "Basic " + Buffer(clientId + ":" + clientSecret).toString("base64");

const spotifyToken = axios.create({
  baseURL: "https://accounts.spotify.com",
});

const spotifyAPI = axios.create({
  baseURL: "https://api.spotify.com",
});

export const accessToken = () => {
  const data = new URLSearchParams({ grant_type: "client_credentials" });

  spotifyToken
    .post("/api/token", data, {
      headers: {
        Authorization: clientMix,
      },
    })
    .then(({ data }) => console.log(data.access_token));
};
