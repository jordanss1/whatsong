import { rest } from "msw";

export const artistAndTrackHandlers = (data) => {
  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
    }),
  ];
};

export const artistAndAlbumHandler = (data) => {
  const artistAndAlbum = [
    `https://api.spotify.com/v1/artists/:id`,
    `https://api.spotify.com/v1/artists/:id/albums`,
    `https://api.spotify.com/v1/artists/:id/top-tracks`,
  ];

  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get(artistAndAlbum[0], (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data[0]));
    }),
    rest.get(artistAndAlbum[1], (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data[1]));
    }),
    rest.get(artistAndAlbum[2], (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data[2]));
    }),
  ];
};
