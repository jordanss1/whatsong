import {
  useCallback,
  useReducer,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  AlbumDetailsType,
  ArtistsType,
  TopTracksDetailsType,
} from "../types/types";

const REDUCER_ACTION_TYPES = {
  ADD: "ADD",
  EMPTY_DETAILS: "EMPTY_DETAILS",
};

const artistArray = [...Object.values(REDUCER_ACTION_TYPES)] as const;

type ActionReturnedTypes = (typeof artistArray)[number];

export interface ReducerStateType {
  artistDetail: ArtistsType | null;
  albums: AlbumDetailsType[] | null;
  topTracks: TopTracksDetailsType[] | null;
  artistDetailError?: Error | null;
}

type ReducerAction = {
  type: ActionReturnedTypes;
  payload?: ReducerStateType;
};

export const artistInitState: ReducerStateType = {
  artistDetail: null,
  albums: null,
  topTracks: null,
  artistDetailError: null,
};

export type ArtistAndAlbumStateSetter = (
  artistDetail: ArtistsType | null,
  artistAlbums: AlbumDetailsType[] | null,
  artistTopTracks: TopTracksDetailsType[] | null,
  error?: Error | null
) => void;

export type EmptyDetailsType = () => void;

export type SetAlbumType = (
  classString: "leftClick" | "rightClick",
  direction: "right" | "left"
) => void;

export type TrackOrAlbumFuncType = (
  arrowType: "right" | "left",
  itemType: "album" | "track"
) => void;

export const useArtistResults = () => {
  const [albumIndex, setAlbumIndex] = useState<number>(0);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const timeoutId = useRef<NodeJS.Timeout[] | number[]>([]);

  const [artistDetails, dispatch] = useReducer(
    (state: ReducerStateType, action: ReducerAction): ReducerStateType => {
      switch (action.type) {
        case REDUCER_ACTION_TYPES.ADD: {
          if (!action.payload) {
            throw new Error("ADD action requires a payload");
          }

          if (action.payload.artistDetailError) {
            return {
              ...state,
              artistDetailError: action.payload.artistDetailError,
            };
          }

          const artistDetail = action.payload.artistDetail;

          const albums = action.payload.albums;

          const topTracks = action.payload.topTracks;

          return {
            ...state,
            artistDetail,
            albums,
            topTracks,
            artistDetailError: null,
          };
        }

        case REDUCER_ACTION_TYPES.EMPTY_DETAILS: {
          return {
            ...state,
            artistDetail: null,
            albums: null,
            topTracks: null,
            artistDetailError: null,
          };
        }

        default:
          return { ...state };
      }
    },
    artistInitState
  );

  const setProfile = useCallback<ArtistAndAlbumStateSetter>(
    (artistDetail, albums, topTracks, artistDetailError) => {
      dispatch({
        type: REDUCER_ACTION_TYPES.ADD,
        payload: {
          artistDetail,
          albums,
          topTracks,
          artistDetailError,
        },
      });
    },
    []
  );

  const emptyProfile = useCallback<EmptyDetailsType>(() => {
    dispatch({ type: REDUCER_ACTION_TYPES.EMPTY_DETAILS });
  }, []);

  useEffect(() => {
    setAlbumIndex(0);
    setTrackIndex(0);
  }, [artistDetails.albums]);

  const { artistDetail, albums, topTracks, artistDetailError } = artistDetails;

  const setAlbumOrTrack: TrackOrAlbumFuncType = (arrowType, itemType) => {
    let array = itemType === "album" ? albums : topTracks;
    let setter = itemType === "album" ? setAlbumIndex : setTrackIndex;
  };

  const setAlbum: SetAlbumType = (classString, direction) => {
    if (timeoutId.current[0] || timeoutId.current[1]) {
      clearTimeout(timeoutId.current[0]);
      clearTimeout(timeoutId.current[1]);
    }

    if (albums && albums?.length > 1) {
      const album = document.getElementsByClassName("artist-album-card")[0];
      album.classList.add(`${classString}`);
      timeoutId.current[0] = setTimeout(
        () => setAlbumOrTrack(direction, "album"),
        100
      );

      timeoutId.current[1] = setTimeout(
        () => album.classList.remove(`${classString}`),
        400
      );
    }
  };

  const setTopTrack = setAlbumOrTrack;

  let album: AlbumDetailsType | null = albums ? albums[albumIndex] : null;

  album = useMemo(() => album, [albumIndex, albums]);

  let topTrack: TopTracksDetailsType | null = topTracks
    ? topTracks[trackIndex]
    : null;

  topTrack = useMemo(() => topTrack, [trackIndex, topTracks]);

  return {
    timeoutId,
    artistDetail,
    albums,
    topTracks,
    setProfile,
    emptyProfile,
    album,
    setAlbum,
    topTrack,
    setTopTrack,
    artistDetailError,
  };
};
