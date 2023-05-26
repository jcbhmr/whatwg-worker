if (typeof Worker === "undefined") {
  await import("./Worker-polyfill.js");
}

if (typeof SharedWorker === "undefined") {
  await import("./SharedWorker-polyfill.js");
}

export {};
