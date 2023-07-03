import Worker from "./Worker-node.js";
import workerThreads from "node:worker_threads";

globalThis.Worker = Worker_;

if (workerThreads.parentPort) {
  await import("./internal/worker-environment-polyfill-node.js");
}
