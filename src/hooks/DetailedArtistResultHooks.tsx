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
  const timeoutId = useRef<NodeJS.Timeout[] | number[]>([]);

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
  }, [artistDetails.albums]);

  const { artistDetail, albums, topTracks } = artistDetails;

  const setAlbumOrTrack: TrackOrAlbumFuncType = (arrowType, itemType) => {
    let array = itemType === "album" ? albums : topTracks;
    let setter = itemType === "album" ? setAlbumIndex : setTrackIndex;

    if (arrowType === "right" && array.length > 1) {
      console.log("first");
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

  let albumReturn: AlbumDetailsType | null = albums ? albums[albumIndex] : null;

  let album = useMemo(() => albumReturn, [albumIndex, albums]);

  let topTrackReturn: TopTracksDetailsType | null = topTracks
    ? topTracks[trackIndex]
    : null;

  let topTrack = useMemo(() => topTrackReturn, [trackIndex, topTracks]);

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
  };
};
