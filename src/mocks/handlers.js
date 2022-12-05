import { rest } from "msw";

export const artistHandlers = (mock) => {
  let data = mock;

  return [
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
      return res(ctx.status(200, "success"));
    }),

    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.body(data));
    }),
  ];
};
