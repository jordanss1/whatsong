import { useState } from "react";
import { ArtistDetailsType, TopTracksDetailsType } from "../types";

export const useArtistsOrTracks = () => {
  const [fullArtists, setFullArtists] = useState<ArtistDetailsType[] | null>(
    null
  );
  const [tracks, setTracks] = useState<Required<TopTracksDetailsType>[] | null>(
    null
  );
  const [page, setPage] = useState<number>(1);

  let totalArtists: number = 0;
  let totalTracks: number = 0;

  let artists = null;

  if (fullArtists) totalArtists = !fullArtists.length ? 0 : fullArtists.length;

  if (tracks) totalTracks = !tracks.length ? 0 : tracks.length;

  if (page === 1) {
    artists = fullArtists?.slice(0, 10);
  }
  if (page === 2) {
    artists = fullArtists?.slice(11, 21);
  }
  if (page === 3) {
    artists = fullArtists?.slice(22, 32);
  }
  if (page === 4) {
    artists = fullArtists?.slice(33, 43);
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
