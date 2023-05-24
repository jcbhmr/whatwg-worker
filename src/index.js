import "./REF-html-errorevent/index.js";

if (typeof Worker === "undefined") {
  if (typeof process !== "undefined") {
    const { isMainThread } = await import("node:worker_threads");

    await import("./Worker-polyfill.js");
    if (!isMainThread) {
      await import("./DedicatedWorkerGlobalScope-polyfill.js");
    }
  } else {
    console.warn(new ReferenceError("Worker is not defined"));
  }
}
