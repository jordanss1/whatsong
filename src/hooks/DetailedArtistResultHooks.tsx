import {
  useCallback,
  useReducer,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { AlbumDetailsType, ArtistsType, TopTracksDetailsType } from "../types";

const ARTIST_REDUCER_TYPES = {
  ADD: "ADD",
  ERROR: "ERROR",
};

const artistArray = [...Object.values(ARTIST_REDUCER_TYPES)] as const;

type ActionReturnedTypes = (typeof artistArray)[number];

export interface ReducerStateType {
  artistDetail: ArtistsType | null;
  albums: AlbumDetailsType[] | [];
  topTracks: TopTracksDetailsType[] | [];
  artistDetailError?: Error | null;
}

type ReducerAction = {
  type: ActionReturnedTypes;
  payload: ReducerStateType;
};

export const artistInitState: ReducerStateType = {
  artistDetail: null,
  albums: [],
  topTracks: [],
  artistDetailError: null,
};

export type ArtistAndAlbumStateSetter = (
  artistDetail: ArtistsType | null,
  artistAlbums: AlbumDetailsType[] | [],
  artistTopTracks: TopTracksDetailsType[] | [],
  error?: Error | null
) => void;

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
        case ARTIST_REDUCER_TYPES.ADD: {
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

          sessionStorage.setItem(
            "artist-details",
            JSON.stringify([artistDetail, albums, topTracks])
          );

          return {
            ...state,
            artistDetail,
            albums,
            topTracks,
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
        type: ARTIST_REDUCER_TYPES.ADD,
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

  useEffect(() => {
    setAlbumIndex(0);
    setTrackIndex(0);
  }, [artistDetails.albums]);

  const { artistDetail, albums, topTracks, artistDetailError } = artistDetails;

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
    if (timeoutId.current[0] || timeoutId.current[1]) {
      clearTimeout(timeoutId.current[0]);
      clearTimeout(timeoutId.current[1]);
    }

    if (albums.length > 1) {
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
    album,
    setAlbum,
    topTrack,
    setTopTrack,
    artistDetailError,
  };
};
