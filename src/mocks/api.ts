export type ArtistResultsTestType = {
  artists: {
    items:
      | {
          external_urls: { spotify: string };
          name: string;
          images: [];
          id: number;
          followers: { total: number };
        }[]
      | [];
  };
};

export type SongResultsTestType = {
  tracks: {
    items:
      | {
          name: string;
          external_urls: { spotify: string };
          album: {
            images: number[];
            album_type: string;
            name: string;
            total_tracks: number;
          };
          artists: { name: string }[];
          track_number: number;
          duration_ms: number;
        }[]
      | [];
  };
};

export type AlbumAndTracksTestType = [
  {
    external_urls: { spotify: string };
    name: string;
    followers: { total: number };
    images: { url: string }[];
  },
  {
    items: { name: string; images: [string, { url: string }] }[] | [];
  },

  {
    tracks:
      | {
          album: { images: [number, number, { url: string }] };
          name: string;
        }[]
      | [];
  }
];

export type AllTestResultsUnionType =
  | AlbumAndTracksTestType
  | SongResultsTestType
  | ArtistResultsTestType
  | Error;

export const artistResults: ArtistResultsTestType = {
  artists: {
    items: [
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 1",
        images: [],
        id: 1,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 2",
        images: [],
        id: 2,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 3",
        images: [],
        id: 3,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 4",
        images: [],
        id: 4,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 5",
        images: [],
        id: 5,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 6",
        images: [],
        id: 6,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 7",
        images: [],
        id: 7,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 8",
        images: [],
        id: 8,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 9",
        images: [],
        id: 9,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 10",
        images: [],
        id: 10,
        followers: { total: 24 },
      },
    ],
  },
};

export const artistResultsFull: ArtistResultsTestType = {
  artists: {
    items: [
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 1",
        images: [],
        id: 1,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 2",
        images: [],
        id: 2,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 3",
        images: [],
        id: 3,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 4",
        images: [],
        id: 4,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 5",
        images: [],
        id: 5,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 6",
        images: [],
        id: 6,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 7",
        images: [],
        id: 7,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 8",
        images: [],
        id: 8,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 9",
        images: [],
        id: 9,

        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 10",
        images: [],
        id: 10,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 11",
        images: [],
        id: 11,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 12",
        images: [],
        id: 12,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 13",
        images: [],
        id: 13,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 14",
        images: [],
        id: 14,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 15",
        images: [],
        id: 15,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 16",
        images: [],
        id: 16,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 17",
        images: [],
        id: 17,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 18",
        images: [],
        id: 18,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 19",
        images: [],
        id: 19,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 20",
        images: [],
        id: 20,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 21",
        images: [],
        id: 21,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 22",
        images: [],
        id: 22,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 23",
        images: [],
        id: 23,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 24",
        images: [],
        id: 24,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 25",
        images: [],
        id: 25,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 26",
        images: [],
        id: 26,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 27",
        images: [],
        id: 27,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 28",
        images: [],
        id: 28,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 29",
        images: [],
        id: 29,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 30",
        images: [],
        id: 30,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 31",
        images: [],
        id: 31,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 32",
        images: [],
        id: 32,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 33",
        images: [],
        id: 33,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 34",
        images: [],
        id: 34,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 35",
        images: [],
        id: 35,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 36",
        images: [],
        id: 36,
        followers: { total: 24 },
      },
      {
        external_urls: { spotify: "www.spotify.com" },
        name: "Test 37",
        images: [],
        id: 37,
        followers: { total: 24 },
      },
    ],
  },
};

export const artistResultsNone: ArtistResultsTestType = {
  artists: { items: [] },
};

export const songResults: SongResultsTestType = {
  tracks: {
    items: [
      {
        name: "Test 1",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 1",
          total_tracks: 0,
        },
        artists: [{ name: "Test 1" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 2",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 2",
          total_tracks: 0,
        },
        artists: [{ name: "Test 2" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 3",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 3",
          total_tracks: 0,
        },
        artists: [{ name: "Test 3" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 4",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 4",
          total_tracks: 0,
        },
        artists: [{ name: "Test 4" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 5",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 5",
          total_tracks: 0,
        },
        artists: [{ name: "Test 5" }],
        track_number: 1,
        duration_ms: 10000,
      },
    ],
  },
};

export const songResultsDouble: SongResultsTestType = {
  tracks: {
    items: [
      {
        name: "Test 1",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 1",
          total_tracks: 0,
        },
        artists: [{ name: "Test 1" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 2",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 2",
          total_tracks: 0,
        },
        artists: [{ name: "Test 2" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 3",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 3",
          total_tracks: 0,
        },
        artists: [{ name: "Test 3" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 4",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 4",
          total_tracks: 0,
        },
        artists: [{ name: "Test 4" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 5",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 5",
          total_tracks: 0,
        },
        artists: [{ name: "Test 5" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 6",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 6",
          total_tracks: 0,
        },
        artists: [{ name: "Test 6" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 7",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 7",
          total_tracks: 0,
        },
        artists: [{ name: "Test 7" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 8",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 8",
          total_tracks: 0,
        },
        artists: [{ name: "Test 8" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 9",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 9",
          total_tracks: 0,
        },
        artists: [{ name: "Test 9" }],
        track_number: 1,
        duration_ms: 10000,
      },
      {
        name: "Test 10",
        external_urls: { spotify: "www.spotify.com" },
        album: {
          images: [0, 0, 0],
          album_type: "single",
          name: "Test 10",
          total_tracks: 0,
        },
        artists: [{ name: "Test 10" }],
        track_number: 1,
        duration_ms: 10000,
      },
    ],
  },
};

export const songResultsNone: SongResultsTestType = {
  tracks: { items: [] },
};

export const albumAndTracks: AlbumAndTracksTestType = [
  {
    external_urls: { spotify: "www.spotify.com/1" },
    name: "Name",
    followers: { total: 1000 },
    images: [{ url: "" }],
  },
  {
    items: [
      { name: "Album 1", images: ["a", { url: "" }] },
      { name: "Album 2", images: ["a", { url: "" }] },
      { name: "Album 3", images: ["a", { url: "" }] },
    ],
  },

  {
    tracks: [
      { album: { images: [0, 0, { url: "" }] }, name: "Track 1" },
      { album: { images: [0, 0, { url: "" }] }, name: "Track 2" },
      { album: { images: [0, 0, { url: "" }] }, name: "Track 3" },
    ],
  },
];

export const albumAndTracksNoResults: AlbumAndTracksTestType = [
  {
    external_urls: { spotify: "www.spotify.com/1" },
    name: "Name",
    followers: { total: 1000 },
    images: [{ url: "" }],
  },
  {
    items: [],
  },
  {
    tracks: [],
  },
];
