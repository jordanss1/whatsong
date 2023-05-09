import { setupServer } from "msw/node";
import { ArtistResultsTestType, artistResults } from "./api";
import { artistAndTrackHandlers } from "./handlers";
import { RestHandler, MockedRequest } from "msw";

const data: RestHandler<MockedRequest<ArtistResultsTestType>>[] =
  artistAndTrackHandlers(artistResults);

export const server = setupServer(...data);
