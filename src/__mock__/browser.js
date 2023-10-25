import { setupWorker } from "msw";
import * as MswApi from "./msw-api/index";

const handler = [...Object.values(MswApi)];

export const worker = setupWorker(...handler);
