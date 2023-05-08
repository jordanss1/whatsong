import { setupServer } from "msw/node";
import { ArtistResultsType, artistResults } from "./api";
import { artistAndTrackHandlers } from "./handlers";
import { RestHandler, MockedRequest } from "msw";

const data: RestHandler<MockedRequest<ArtistResultsType>>[] =
  artistAndTrackHandlers(artistResults);

export const server = setupServer(...data);
