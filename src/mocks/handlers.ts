import { rest } from "msw";
import {
  ArtistAndTrackHandlersType,
  ArtistDetailsHandlerDataType,
  ArtistAndTrackHandlerDataType,
  ArtistDetailsHandlerType,
} from "../types/types";

type GetResponseType<T> = { code: number; body: T };

export const artistAndTrackHandlers: ArtistAndTrackHandlersType = (data) => {
  type PostResponseType = { code: number; body: string | typeof data };

  let postResponse: PostResponseType = { code: 200, body: "ok" };

  let getResponse: GetResponseType<ArtistAndTrackHandlerDataType> = {
    code: 200,
    body: data,
  };

  if (data instanceof Error) {
    data.message.includes("post")
      ? (postResponse = { code: 500, body: data })
      : (getResponse = { code: 401, body: data });
  }

  return [
    rest.post(
      "https://accounts.spotify.com/api/token",
      async (req, res, ctx) => {
        return await res(
          ctx.status(postResponse.code),
          ctx.json(postResponse.body)
        );
      }
    ),

    rest.get("https://api.spotify.com/v1/search", async (req, res, ctx) => {
      return await res(
        ctx.status(getResponse.code),
        ctx.json(getResponse.body)
      );
    }),
  ];
};

export const artistDetailsHandler: ArtistDetailsHandlerType = (data) => {
  const artistAndAlbum: string[] = [
    `https://api.spotify.com/v1/artists/:id`,
    `https://api.spotify.com/v1/artists/:id/albums`,
    `https://api.spotify.com/v1/artists/:id/top-tracks`,
  ];

  let getResponse: GetResponseType<ArtistDetailsHandlerDataType> = {
    code: data instanceof Error ? 401 : 200,
    body: data,
  };

  const { body, code } = getResponse;

  let resBody = (index: number) => (body instanceof Error ? body : body[index]);

  return [
    rest.post(
      "https://accounts.spotify.com/api/token",
      async (req, res, ctx) => {
        return await res(ctx.status(200, "success"));
      }
    ),

    rest.get(artistAndAlbum[0], async (req, res, ctx) => {
      return await res(ctx.status(code), ctx.json(resBody(0)));
    }),
    rest.get(artistAndAlbum[1], async (req, res, ctx) => {
      return await res(ctx.status(code), ctx.json(resBody(1)));
    }),
    rest.get(artistAndAlbum[2], async (req, res, ctx) => {
      return await res(ctx.status(code), ctx.json(resBody(2)));
    }),
  ];
};

export type HandlerUnion =
  | ArtistDetailsHandlerType
  | ArtistAndTrackHandlersType;
