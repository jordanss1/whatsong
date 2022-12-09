import { setupServer } from "msw/node";
import { artistResultsSuccess } from "../api/mock";
import { artistAndTrackHandlers } from "./handlers";

const data = artistAndTrackHandlers(artistResultsSuccess);

export const server = setupServer(...data);
