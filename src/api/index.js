import axios from "axios";
import { Buffer } from "buffer";

const clientId = "2f877e3bf82f492a9a245429e2c385e0";
const clientSecret = "e2c6d31e70a84b83814c90f67d962681";

const spotify = axios.create({
  baseURL: "https://accounts.spotify.com",
});

export const accessToken = () => {
  spotify
    .post("/api/token", {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "client_credentials",
      },
    })
    .then((response) => console.log(response));
};
