import { useCallback, useReducer } from "react";
import { ArtistsType, TopTracksDetailsType } from "../types";

const REDUCER_ACTION_TYPES = {
  ADD_ARTISTS_TRACKS: "ADD_ARTISTS_TRACKS",
  RESET_MODAL_OR_SPOTIFY: "RESET_MODAL_OR_SPOTIFY",
};

const actionTypeArray = [...Object.values(REDUCER_ACTION_TYPES)] as const;

type ActionTypes = (typeof actionTypeArray)[number];

type ReducerStateType = {
  artists: ArtistsType[] | null;
  tracks: Required<TopTracksDetailsType>[] | null;
  artistOrTrackError?: Error | null;
  noResults: boolean | null;
};

type PayloadType = {
  artists?: ArtistsType[] | null;
  tracks?: Required<TopTracksDetailsType>[] | null;
  artistOrTrackError?: Error | null;
  noResults?: boolean | null;
  reset?: "spotify" | "modal";
};

type ReducerActionType = {
  type: ActionTypes;
  payload?: PayloadType;
};

export type ArtistsAndTracksSetterType = (
  artists?: ArtistsType[] | undefined,
  tracks?: Required<TopTracksDetailsType>[] | undefined,
  error?: Error | undefined
) => void;

export type ResetModelOrSpotifyType = (state: "modal" | "spotify") => void;

const initialState: ReducerStateType = {
  artists: null,
  tracks: null,
  artistOrTrackError: null,
  noResults: null,
};

export const useArtistsOrTracks = () => {
  const [artistsAndTracks, dispatch] = useReducer(
    (state: ReducerStateType, action: ReducerActionType) => {
      switch (action.type) {
        case REDUCER_ACTION_TYPES.ADD_ARTISTS_TRACKS: {
          if (!action.payload) {
            throw new Error("ADD_ARTISTS_TRACKS action must have a payload");
          }

          let artists = action.payload.artists;
          let tracks = action.payload.tracks;
          let noResults = artists?.length || tracks?.length ? false : true;
          let artistOrTrackError = action.payload.artistOrTrackError;

          if (!artists?.length) {
            artists = state.artists;
          }

          if (!tracks?.length) {
            tracks = state.tracks;
          }

          return {
            ...state,
            tracks,
            artists,
            noResults,
            artistOrTrackError,
          };
        }

        case REDUCER_ACTION_TYPES.RESET_MODAL_OR_SPOTIFY: {
          if (!action.payload) {
            throw new Error("ADD_ARTISTS_TRACKS action must have a payload");
          }

          const reset = action.payload?.reset;

          return {
            ...state,
            artists: reset === "spotify" ? null : state.artists,
            tracks: reset === "spotify" ? null : state.tracks,
            artistOrTrackError: null,
            noResults: null,
          };
        }

        default:
          return { ...state };
      }
    },
    initialState
  );

  const setArtistsOrTracks: ArtistsAndTracksSetterType = useCallback(
    (artists, tracks, error) => {
      let newArtists;
      let newTracks;
      let newError = error ? error : null;

      if (error) {
        newArtists = null;
        newTracks = null;
      } else {
        newArtists = artists ? artists : [];
        newTracks = tracks ? tracks : [];
      }

      dispatch({
        type: REDUCER_ACTION_TYPES.ADD_ARTISTS_TRACKS,
        payload: {
          artists: newArtists,
          tracks: newTracks,
          artistOrTrackError: newError,
        },
      });
    },
    []
  );

  const resetModalOrSpotify: ResetModelOrSpotifyType = useCallback((state) => {
    dispatch({
      type: REDUCER_ACTION_TYPES.RESET_MODAL_OR_SPOTIFY,
      payload: {
        reset: state,
      },
    });
  }, []);

  const { artists, tracks, artistOrTrackError, noResults } = artistsAndTracks;

  return {
    artists,
    tracks,
    artistOrTrackError,
    setArtistsOrTracks,
    resetModalOrSpotify,
    noResults,
  };
};
