import { dictionary } from "@webfill/webidl";
import { DOMString } from "@webfill/webidl/types.js";
import RequestCredentials from "@webfill/fetch/RequestCredentials.js";
import WorkerType from "./WorkerType.js";

const WorkerOptions = dictionary("WorkerOptions", {
  type: [WorkerType, "classic"],
  credentials: [RequestCredentials, "same-origin"],
  name: [DOMString, ""],
});
export default WorkerOptions;
