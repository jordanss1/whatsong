import { useState } from "react";
import { ArtistDetailsType, TopTracksDetailsType } from "../types";

export const useArtistsOrTracks = () => {
  const [artists, setArtists] = useState<ArtistDetailsType[] | null>(null);
  const [tracks, setTracks] = useState<Required<TopTracksDetailsType>[] | null>(
    null
  );

  let totalArtists: number = 0;
  let totalTracks: number = 0;

  if (artists) totalArtists = artists.length === 0 ? 0 : artists.length;

  if (tracks) totalTracks = tracks.length === 0 ? 0 : tracks.length;

  return { artists, totalArtists, tracks, totalTracks, setArtists, setTracks };
};
