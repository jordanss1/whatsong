import React from "react";
import axios from "axios";
import { Buffer } from "buffer";
import {
  AlbumDetailsType,
  ArtistDetailsType,
  TopTracksDetailsType,
} from "../types";
import { ArtistAndAlbumStateSetter } from "../hooks/DetailedArtistResultHooks";

const clientId = process.env.REACT_APP_ID;
const clientSecret = process.env.REACT_APP_SECRET;

export const clientMix =
  "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");

const spotifyToken = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
  headers: { Authorization: clientMix },
});

const spotifyQuery = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const data = new URLSearchParams({ grant_type: "client_credentials" });

export const spotifyArtistAndAlbum = (
  id: string,
  state: ArtistAndAlbumStateSetter
): void => {
  const artistAndAlbum = [
    `https://api.spotify.com/v1/artists/${id}`,
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&limit=50`,
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
  ];

  spotifyToken
    .post("", data, {})
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
          let albums = responses[1].data.items;

          albums = albums
            ? [
                ...new Map(
                  albums.map((item: AlbumDetailsType) => [item.name, item])
                ).values(),
              ]
            : albums;

          let albumsTotal = albums.length ? albums.length : 0;

          let topTracks = responses[2].data.tracks;
          let topTracksTotal = topTracks.length ? topTracks.length : 0;

          state(
            responses[0].data,
            {
              albums: albums,
              total: albumsTotal,
            },
            {
              topTracks: topTracks,
              total: topTracksTotal,
            }
          );
        })
        .catch((err) => {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
        });
    })
    .catch((err) => {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    });
};

export type SpotifyTokenAndSearchType = (
  q: string,
  type: "artist" | "track",
  state:
    | React.Dispatch<React.SetStateAction<ArtistDetailsType[] | null>>
    | React.Dispatch<
        React.SetStateAction<Required<TopTracksDetailsType>[] | null>
      >
) => void;

export const spotifyTokenAndSearch: SpotifyTokenAndSearchType = (
  q,
  type,
  state
) => {
  spotifyToken
    .post("", data, {})
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
        })
        .catch((err) => {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
        });
    })
    .catch((err) => {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    });
};
