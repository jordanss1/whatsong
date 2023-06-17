import axios from "axios";
import { Buffer } from "buffer";
import { AlbumDetailsType, ArtistDetailsType } from "../types";
import {
  SpotifyArtistAndAlbumSearchType,
  SpotifyArtistsOrSongsSearchType,
  SpotifyTokenFunctionType,
} from "../types";

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

const paramData = new URLSearchParams({ grant_type: "client_credentials" });

const spotifyTokenFunction: SpotifyTokenFunctionType = async (
  cancelToken,
  setError
) => {
  cancelToken.current = axios.CancelToken.source();

  let promiseReturn: string | Error | null = null;

  try {
    const { data } = await spotifyToken.post("", paramData, {
      cancelToken: cancelToken.current.token,
    });

    promiseReturn = `Bearer ${data.access_token}`;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.error("cancelled due to duplicate request", err);
    }

    if (!axios.isCancel(err) && err instanceof Error) {
      setError(new Error(`Server error: ${err.message}, please search again`));
      promiseReturn = new Error();
      throw new Error("Issue retrieving token", err);
    }
  } finally {
    cancelToken.current = null;
    return promiseReturn;
  }
};

export const spotifyArtistAndAlbum: SpotifyArtistAndAlbumSearchType = async (
  id,
  cancelToken,
  stateSetter,
  setError,
  setLoading
) => {
  const artistAndAlbum = [
    `${id}`,
    `${id}/albums?include_groups=album&limit=50`,
    `${id}/top-tracks?market=US`,
  ];

  let data = await spotifyTokenFunction(cancelToken, setError);

  if (!data) {
    return;
  }

  if (data instanceof Error) {
    setLoading(false);
    return;
  }

  let accessToken = data;

  cancelToken.current = axios.CancelToken.source();

  try {
    const responses = await axios.all(
      artistAndAlbum.map((endpoint) =>
        spotifyQuery.get(`/artists/${endpoint}`, {
          cancelToken: cancelToken.current?.token,
          headers: {
            Authorization: accessToken,
          },
        })
      )
    );

    let albums = responses[1].data.items;

    albums = albums
      ? [
          ...new Map(
            albums.map((item: AlbumDetailsType) => [item.name, item])
          ).values(),
        ]
      : albums;

    let topTracks = responses[2].data.tracks;

    stateSetter(responses[0].data, albums, topTracks);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("cancelled due to duplicate request", err);
    }

    if (!axios.isCancel(err) && err instanceof Error) {
      console.error("error", err);
      setError(
        new Error(
          `Issue retrieving artist detail: ${err.message} please search again`
        )
      );
    }
  } finally {
    setLoading(false);
    cancelToken.current = null;
  }
};

export const spotifyArtistsOrSongsSearch: SpotifyArtistsOrSongsSearchType =
  async (
    query,
    cancelToken,
    typeOfSearch,
    stateSetter,
    setError,
    setLoading
  ) => {
    let data = await spotifyTokenFunction(cancelToken, setError);

    if (!data) {
      return;
    }

    if (data instanceof Error) {
      setLoading(false);
      return;
    }

    const accessToken = data;

    const searchType = `${typeOfSearch}s`;

    cancelToken.current = axios.CancelToken.source();

    try {
      const { data } = await spotifyQuery.get("/search", {
        cancelToken: cancelToken.current?.token,
        headers: {
          Authorization: accessToken,
        },
        params: { q: query, type: typeOfSearch, limit: 40 },
      });

      if (searchType === "artists") {
        const sortedArtists = data[searchType].items.sort(
          (a: ArtistDetailsType, b: ArtistDetailsType) =>
            b.followers.total - a.followers.total
        );

        stateSetter(sortedArtists);
      } else {
        stateSetter(data[searchType].items);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("cancelled due to duplicate request", err);
      }

      if (!axios.isCancel(err) && err instanceof Error) {
        console.error("error", err);
        setError(
          new Error(`Issue during search: ${err.message} please search again`)
        );
      }
    } finally {
      setLoading(false);
      cancelToken.current = null;
    }
  };
