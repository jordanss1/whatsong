import { type CancelTokenSource } from 'axios';
import {
  type Target,
  type TargetAndTransition,
  type VariantLabels,
  type Variants,
} from 'motion/react';
import { type MockedRequest, type RestHandler } from 'msw';
import React, { type RefObject } from 'react';
import { type ArtistsAndTracksSetterType } from '../hooks/ArtistsAndTracksHook';
import { type ArtistAndAlbumStateSetter } from '../hooks/DetailedArtistResultHooks';
import {
  type AlbumAndTracksTestType,
  type ArtistResultsTestType,
  type SongResultsTestType,
} from '../mocks/api';

export type ArtistsType = {
  external_urls: { spotify: string };
  followers: { href: null; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type AlbumDetailsType = {
  album_group: string;
  album_type: string;
  artists: Partial<ArtistsType>[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type TopTracksDetailsType = {
  album: AlbumDetailsType;
  artists: Partial<ArtistsType>[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type ArtistAndTrackHandlerDataType =
  | ArtistResultsTestType
  | SongResultsTestType
  | Error;

export type ArtistDetailsHandlerDataType = AlbumAndTracksTestType | Error;

export type ArtistAndTrackHandlersType = (
  data: ArtistAndTrackHandlerDataType
) => RestHandler<MockedRequest<ArtistDetailsHandlerDataType>>[];

export type ArtistDetailsHandlerType = (
  data: ArtistDetailsHandlerDataType
) => RestHandler<MockedRequest<AlbumAndTracksTestType>>[];

export type SpotifyArtistDetailsSearchType = (
  id: string,
  cancelToken: RefObject<CancelTokenSource | null>,
  setArtistDetails: ArtistAndAlbumStateSetter,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void>;

export type SpotifyArtistsOrSongsSearchType = (
  query: string,
  cancelToken: RefObject<CancelTokenSource | null>,
  typeOfSearch: string,
  setArtistOrTracks: ArtistsAndTracksSetterType,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => void;

export type SpotifyTokenFunctionType = (
  CancelToken: RefObject<CancelTokenSource | null>
) => Promise<string | Error | null>;
