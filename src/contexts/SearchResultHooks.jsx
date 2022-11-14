import { useCallback, useReducer, useMemo } from "react";

export const useArtistResults = (initialState) => {
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          artist: action.artist,
          albums: action.albums,
          topTracks: action.topTracks,
        };
      case "DELETE":
        return {
          ...state,
          artist: null,
          albums: null,
          topTracks: null,
        };
    }
  }, initialState);

  const setProfile = useCallback((artist, albums, topTracks) => {
    dispatch({
      type: "ADD",
      artist,
      albums,
      topTracks,
    });
  });

  const deleteProfile = useCallback(() => {
    dispatch({ type: "DELETE" });
  });

  const { artist, albums, topTracks } = useMemo(() => items, [items]);

  return { artist, albums, topTracks, setProfile, deleteProfile };
};
