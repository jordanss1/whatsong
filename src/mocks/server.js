import { setupServer } from "msw/node";
import { artistHandler } from "./handlers";

export const server = setupServer(...artistHandler());
