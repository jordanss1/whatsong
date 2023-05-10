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

export type ReducerStateType = {
  artistDetail: ArtistDetailsType | null;
  artistAlbums: { albums: AlbumDetailsType[] | []; total: number };
  artistTopTracks: { topTracks: TopTracksDetailsType[] | []; total: number };
};

type ReducerAction = {
  type: ActionReturnedTypes;
  payload: ReducerStateType;
};

export const artistInitState: ReducerStateType = {
  artistDetail: null,
  artistAlbums: { albums: [], total: 0 },
  artistTopTracks: { topTracks: [], total: 0 },
};

export type ArtistAndAlbumStateSetter = (
  artistDetail: ArtistDetailsType,
  artistAlbums: { albums: AlbumDetailsType[] | []; total: number },
  artistTopTracks: { topTracks: TopTracksDetailsType[] | []; total: number }
) => void;

export const useArtistResults = (initialState: ReducerStateType) => {
  const [artistDetails, dispatch] = useReducer(
    (state: ReducerStateType, action: ReducerAction): ReducerStateType => {
      switch (action.type) {
        case ARTIST_REDUCER_TYPES.ADD: {
          if (!action.payload) {
            throw new Error("ADD action requires a payload");
          }

          const artistDetail = action.payload.artistDetail;

          const albums = action.payload.artistAlbums.albums;
          const totalAlbums = action.payload.artistAlbums.total;

          const topTracks = action.payload.artistTopTracks.topTracks;
          const totalTopTracks = action.payload.artistTopTracks.total;

          sessionStorage.setItem(
            "artist-details",
            JSON.stringify([
              artistDetail,
              { albums: albums, total: totalAlbums },
              { topTracks: topTracks, total: totalTopTracks },
            ])
          );

          return {
            ...state,
            artistDetail: artistDetail,
            artistAlbums: {
              albums: albums,
              total: totalAlbums,
            },
            artistTopTracks: {
              topTracks: topTracks,
              total: totalTopTracks,
            },
          };
        }
        default:
          return { ...state };
      }
    },
    initialState
  );

  const setProfile = useCallback<ArtistAndAlbumStateSetter>(
    (artistDetail, artistAlbums, artistTopTracks) => {
      dispatch({
        type: "ADD",
        payload: {
          artistDetail,
          artistAlbums,
          artistTopTracks,
        },
      });
    },
    []
  );

  const { artistDetail, artistAlbums, artistTopTracks } = artistDetails;

  const totalAlbums = artistAlbums.total;

  const totalTopTracks = artistTopTracks.total;

  let albums = artistAlbums.albums;

  let topTracks = artistTopTracks.topTracks;

  return {
    artistDetail,
    albums,
    totalAlbums,
    topTracks,
    totalTopTracks,
    setProfile,
  };
};
