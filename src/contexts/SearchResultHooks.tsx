import { useCallback, useReducer } from "react";
import {
  AlbumDetailsType,
  ArtistDetailsType,
  TopTracksDetailsType,
} from "../types";

const ARTIST_REDUCER_TYPES = {
  ADD: "ADD",
};

const artistArray = [...Object.values(ARTIST_REDUCER_TYPES)] as const;

type ActionReturnedTypes = (typeof artistArray)[number];

type ReducerStateType<T> = {
  artist: ArtistDetailsType;
  albums: AlbumDetailsType[] | T;
  topTracks: TopTracksDetailsType[] | T;
};

type ReducerAction = {
  type: ActionReturnedTypes;
  payload: ReducerStateType<[]>;
};

export const artistInitState = {
  artist: {
    external_urls: { spotify: "" },
    followers: { href: null, total: 0 },
    genres: [],
    href: "",
    id: "",
    images: [{ height: 0, url: "", width: 0 }],
    name: "",
    popularity: 0,
    type: "",
    uri: "",
  },
  albums: [
    {
      album_group: "",
      album_type: "",
      artists: [],
      available_markets: [],
      external_urls: { spotify: "" },
      href: "",
      id: "",
      images: [{ height: 0, url: "", width: 0 }],
      name: "",
      release_date: "",
      release_date_precision: "",
      total_tracks: 0,
      type: "",
      uri: "",
    },
  ],
  topTracks: [
    {
      album: {
        album_group: "",
        album_type: "",
        href: "",
      },
      artists: [],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: { isrc: "" },
      external_urls: {
        spotify: "",
      },
      href: "",
      id: "",
      is_local: false,
      is_playable: true,
      name: "",
      popularity: 0,
      preview_url: "",
      track_number: 0,
      type: "",
      uri: "",
    },
  ],
};

type NoAlbumOrTracksType = { noAlbums: string } | { noTracks: string };

export type ArtistAndAlbumStateSetter = (
  artists: ArtistDetailsType,
  albums: AlbumDetailsType[] | [],
  topTracks: TopTracksDetailsType[] | []
) => void;

export const useArtistResults = (initialState: typeof artistInitState) => {
  const [artistDetails, dispatch] = useReducer(
    (
      state: ReducerStateType<NoAlbumOrTracksType>,
      action: ReducerAction
    ): ReducerStateType<NoAlbumOrTracksType> => {
      switch (action.type) {
        case ARTIST_REDUCER_TYPES.ADD: {
          if (!action.payload) {
            throw new Error("ADD action requires a payload");
          }

          let albums: AlbumDetailsType[] | { noAlbums: "no albums" } = action
            .payload.albums.length
            ? [
                ...new Map(
                  action.payload.albums.map((item) => [item.name, item])
                ).values(),
              ]
            : { noAlbums: "no albums" };

          let topTracks: TopTracksDetailsType[] | { noTracks: "no tracks" } =
            action.payload.topTracks.length
              ? action.payload.topTracks
              : { noTracks: "no tracks" };

          return {
            ...state,
            artist: action.payload.artist,
            albums,
            topTracks,
          };
        }
        default:
          return { ...state };
      }
    },
    initialState
  );

  const setProfile = useCallback<ArtistAndAlbumStateSetter>(
    (artist, albums, topTracks) => {
      dispatch({
        type: "ADD",
        payload: {
          artist,
          albums,
          topTracks,
        },
      });
    },
    []
  );

  const { artist, albums, topTracks } = artistDetails;

  return { artist, albums, topTracks, setProfile };
};
