import { setupServer } from "msw/node";
import { artistResults } from "./api";
import { artistAndTrackHandlers } from "./handlers";

const data = artistAndTrackHandlers(artistResults);

export const server = setupServer(...data);
