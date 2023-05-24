import test from "node:test";
import assert from "node:assert";
import { mkdir } from "node:fs/promises";
import { pEvent } from "p-event";
import Worker from "../src/Worker.js";

await mkdir(".cache");

test("works with .mjs files", async () => {
  await writeFile(".cache/worker.mjs", `postMessage(1)`);
  const worker = new Worker(".cache/worker.mjs", { type: "module" });
  await pEvent(worker, "message");
  worker.terminate();
});

test("works with .cjs files", async () => {
  await writeFile(".cache/worker.cjs", `postMessage(1)`);
  const worker = new Worker(".cache/worker.cjs", { type: "module" });
  await pEvent(worker, "message");
  worker.terminate();
});

test("works with .js files in a 'module' package", async () => {
  await writeFile(".cache/worker.js", `postMessage(1)`);
  const worker = new Worker(".cache/worker.js", { type: "module" });
  await pEvent(worker, "message");
  worker.terminate();
});

test("works with data: URL", async () => {
  const dataURL =
    "data:text/javascript," + encodeURIComponent(`postMessage(1)`);
  const worker = new Worker(dataURL, { type: "module" });
  await pEvent(worker, "message");
  worker.terminate();
});

test("works with blob: URL", async () => {
  const blobURL = URL.createObjectURL(
    new Blob([`postMessage(1)`], { type: "text/javascript" })
  );
  const worker = new Worker(blobURL, { type: "module" });
  await pEvent(worker, "message");
  worker.terminate();
});

test("works with .cjs files when type=classic", async () => {
  await writeFile(".cache/worker.cjs", `postMessage(1)`);
  const worker = new Worker(".cache/worker.cjs", { type: "classic" });
  await pEvent(worker, "message");
  worker.terminate();
});

test("emits error event when .mjs file and type=classic", async () => {
  await writeFile(".cache/worker.mjs", `postMessage(1)`);
  const worker = new Worker(".cache/worker.mjs", { type: "classic" });
  await pEvent(worker, "error");
  worker.terminate();
});
