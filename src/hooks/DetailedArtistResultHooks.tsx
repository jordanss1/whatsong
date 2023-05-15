import { useCallback, useReducer, useState, useEffect, useRef } from "react";
import {
  AlbumDetailsType,
  ArtistDetailsType,
  TopTracksDetailsType,
} from "../types";

const ARTIST_REDUCER_TYPES = {
  ADD: "ADD",
  CHANGE_ALBUM: "CHANGE_ALBUM",
};

const artistArray = [...Object.values(ARTIST_REDUCER_TYPES)] as const;

type ActionReturnedTypes = (typeof artistArray)[number];

export interface ReducerStateType {
  artistDetail: ArtistDetailsType | null;
  albums: AlbumDetailsType[] | [];
  topTracks: TopTracksDetailsType[] | [];
}

type ReducerAction = {
  type: ActionReturnedTypes;
  payload: ReducerStateType;
};

export const artistInitState: ReducerStateType = {
  artistDetail: null,
  albums: [],
  topTracks: [],
};

export type ArtistAndAlbumStateSetter = (
  artistDetail: ArtistDetailsType,
  artistAlbums: AlbumDetailsType[] | [],
  artistTopTracks: TopTracksDetailsType[] | []
) => void;

export type SetAlbumType = (
  classString: "leftClick" | "rightClick",
  direction: "right" | "left"
) => void;

export type TrackOrAlbumFuncType = (
  arrowType: "right" | "left",
  itemType: "album" | "track"
) => void;

export const useArtistResults = (initialState: ReducerStateType) => {
  const [albumIndex, setAlbumIndex] = useState<number>(0);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const timeoutId = useRef<NodeJS.Timeout | number>();

  const [artistDetails, dispatch] = useReducer(
    (state: ReducerStateType, action: ReducerAction): ReducerStateType => {
      switch (action.type) {
        case ARTIST_REDUCER_TYPES.ADD: {
          if (!action.payload) {
            throw new Error("ADD action requires a payload");
          }

          const artistDetail = action.payload.artistDetail;

          const albums = action.payload.albums;

          const topTracks = action.payload.topTracks;

          sessionStorage.setItem(
            "artist-details",
            JSON.stringify([artistDetail, albums, topTracks])
          );

          return {
            ...state,
            artistDetail: artistDetail,
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
    (artistDetail, albums, topTracks) => {
      dispatch({
        type: ARTIST_REDUCER_TYPES.ADD,
        payload: {
          artistDetail,
          albums,
          topTracks,
        },
      });
    },
    []
  );

  useEffect(() => {
    setAlbumIndex(0);
    setTrackIndex(0);
  }, [artistDetails]);

  const { artistDetail, albums, topTracks } = artistDetails;

  const setAlbumOrTrack: TrackOrAlbumFuncType = (arrowType, itemType) => {
    let array = itemType === "album" ? albums : topTracks;
    let setter = itemType === "album" ? setAlbumIndex : setTrackIndex;

    if (arrowType === "right" && array.length > 1) {
      setter((prev) => (prev + 1 === array.length ? 0 : prev + 1));
    } else if (arrowType === "left" && array.length > 1) {
      setter((prev) => (prev - 1 < 0 ? array.length - 1 : prev - 1));
    }
  };

  const setAlbum: SetAlbumType = (classString, direction) => {
    if (albums.length > 1) {
      const album = document.getElementsByClassName("albumCard")[0];
      album.classList.add(`${classString}`);
      timeoutId.current = setTimeout(
        () => setAlbumOrTrack(direction, "album"),
        100
      );
      setTimeout(() => album.classList.remove(`${classString}`), 400);
    }
  };

  const setTopTrack = setAlbumOrTrack;

  let album: AlbumDetailsType | null = albums ? albums[albumIndex] : null;

  let topTrack: TopTracksDetailsType | null = topTracks
    ? topTracks[trackIndex]
    : null;

  return {
    artistDetail,
    albums,
    topTracks,
    setProfile,
    album,
    setAlbum,
    topTrack,
    setTopTrack,
  };
};
