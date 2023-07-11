import { useCallback, useReducer } from "react";
import { ArtistsType, TopTracksDetailsType } from "../types";

const REDUCER_ACTION_TYPES = {
  ADD_ARTISTS_TRACKS: "ADD_ARTISTS_TRACKS",
  EMPTY_ALL: "EMPTY_ALL",
};

const actionTypeArray = [...Object.values(REDUCER_ACTION_TYPES)] as const;

type ActionTypes = (typeof actionTypeArray)[number];

type ReducerStateType = {
  artists: ArtistsType[] | null;
  tracks: Required<TopTracksDetailsType>[] | null;
  artistOrTrackError?: Error | null;
};

type ReducerActionType = {
  type: ActionTypes;
  payload?: ReducerStateType;
};

export type ArtistsAndTracksSetterType = (
  artists?: ArtistsType[] | null | undefined,
  tracks?: Required<TopTracksDetailsType>[] | null | undefined,
  error?: Error | undefined
) => void;

const initialState: ReducerStateType = {
  artists: null,
  tracks: null,
  artistOrTrackError: null,
};

export const useArtistsOrTracks = () => {
  const [artistsAndTracks, dispatch] = useReducer(
    (state: ReducerStateType, action: ReducerActionType) => {
      switch (action.type) {
        case REDUCER_ACTION_TYPES.ADD_ARTISTS_TRACKS: {
          if (!action.payload) {
            throw new Error("ADD_ARTISTS_TRACKS action must have a payload");
          }

          const payload = action.payload;

          return {
            ...state,
            ...payload,
          };
        }

        case REDUCER_ACTION_TYPES.EMPTY_ALL: {
          return {
            ...state,
            artists: null,
            tracks: null,
            artistOrTrackError: null,
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
        newArtists = artists ? artists : null;
        newTracks = tracks ? tracks : null;
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

  const emptyArtistsAndTracks = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.EMPTY_ALL,
    });
  }, []);

  const { artists, tracks, artistOrTrackError } = artistsAndTracks;

  let totalArtists: number = 0;
  let totalTracks: number = 0;

  if (artists) totalArtists = !artists.length ? 0 : artists.length;

  if (tracks) totalTracks = !tracks.length ? 0 : tracks.length;

  return {
    artists,
    tracks,
    artistOrTrackError,
    setArtistsOrTracks,
    totalArtists,
    emptyArtistsAndTracks,
    totalTracks,
  };
};
