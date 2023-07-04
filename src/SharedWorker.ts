/** @type {typeof SharedWorker} */
let SharedWorker;
if (typeof SharedWorker !== "undefined") {
  SharedWorker = globalThis.SharedWorker;
} else {
  ({ default: SharedWorker } = await import("./SharedWorker-browser.js"));
}

export default SharedWorker;
