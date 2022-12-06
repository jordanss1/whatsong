import { rest } from "msw";
import {
  artistResultsSuccess,
  artistResultsNone,
  songResultsSuccess,
} from "../api/mock";

export const artistAndTrackHandlers = (data) => {
  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.body(data));
    }),
  ];
};

export const artistHandler = () => {
  let data = artistResultsSuccess;

  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.body(data));
    }),
  ];
};
export const artistHandler2 = () => {
  let data = artistResultsNone;

  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.body(data));
    }),
  ];
};
export const trackHandler = () => {
  let data = songResultsSuccess;

  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.body(data));
    }),
  ];
};
