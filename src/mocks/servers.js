import { setupServer } from "msw/node";
import { artistHandlers } from "./handlers";
import { artistResultsSuccess } from "../api/mock";

export const artistServer = setupServer(
  ...artistHandlers(artistResultsSuccess)
);
