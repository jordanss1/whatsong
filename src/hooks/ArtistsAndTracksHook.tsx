import { useState } from "react";
import { ArtistsStateType, TracksStateType } from "../types";

export const useArtistsOrTracks = () => {
  const [fullArtists, setFullArtists] = useState<ArtistsStateType | null>(null);
  const [tracks, setTracks] = useState<TracksStateType | null>(null);
  const [page, setPage] = useState<number>(1);

  let totalArtists: number = 0;
  let totalTracks: number = 0;

  let artists = null;

  if (fullArtists?.artists)
    totalArtists = !fullArtists.artists.length ? 0 : fullArtists.artists.length;

  if (tracks?.tracks)
    totalTracks = !tracks.tracks.length ? 0 : tracks.tracks.length;

  if (page === 1) {
    artists = fullArtists?.artists?.slice(0, 10);
  }
  if (page === 2) {
    artists = fullArtists?.artists?.slice(10, 20);
  }
  if (page === 3) {
    artists = fullArtists?.artists?.slice(20, 30);
  }
  if (page === 4) {
    artists = fullArtists?.artists?.slice(30, 40);
  }

  return {
    artists,
    totalArtists,
    tracks,
    totalTracks,
    fullArtists,
    setFullArtists,
    setTracks,
    page,
    setPage,
  };
};
