import { isMainThread } from "node:worker_threads";

if (typeof Worker === "undefined") {
  await import("./Worker-polyfill.js");
}

if (typeof SharedWorker === "undefined") {
  await import("./SharedWorker-polyfill.js");
}

if (!isMainThread) {
  await import("./global-is-DedicatedWorkerGlobalScope-polyfill.js");
}
