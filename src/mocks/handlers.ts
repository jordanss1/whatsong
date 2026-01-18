import { HttpResponse, http } from 'msw';
import {
  type ArtistAndTrackHandlerDataType,
  type ArtistAndTrackHandlersType,
  type ArtistDetailsHandlerDataType,
  type ArtistDetailsHandlerType,
} from '../types/types';

type GetResponseType<T> = { code: number; body: T };

export const artistAndTrackHandlers: ArtistAndTrackHandlersType = (data) => {
  type PostResponseType = { code: number; body: string | typeof data };

  let postResponse: PostResponseType = { code: 200, body: 'ok' };

  let getResponse: GetResponseType<ArtistAndTrackHandlerDataType> = {
    code: 200,
    body: data,
  };

  if (data instanceof Error) {
    data.message.includes('post')
      ? (postResponse = { code: 500, body: data })
      : (getResponse = { code: 401, body: data });
  }

  return [
    http.post('https://accounts.spotify.com/api/token', async () => {
      return HttpResponse.json(postResponse.body, {
        status: postResponse.code,
      });
    }),

    http.get('https://api.spotify.com/v1/search', async () => {
      return HttpResponse.json(getResponse.body, {
        status: getResponse.code,
      });
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
    http.post('https://accounts.spotify.com/api/token', async () => {
      return HttpResponse.json('success', { status: 200 });
    }),

    http.get(artistAndAlbum[0], async () => {
      return HttpResponse.json(resBody(0), { status: code });
    }),
    http.get(artistAndAlbum[1], async () => {
      return HttpResponse.json(resBody(1), { status: code });
    }),
    http.get(artistAndAlbum[2], async () => {
      return HttpResponse.json(resBody(2), { status: code });
    }),
  ];
};

export type HandlerUnion =
  | ArtistDetailsHandlerType
  | ArtistAndTrackHandlersType;
