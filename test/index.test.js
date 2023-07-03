import test from "node:test";
import assert from "node:assert";
import esmurl from "esmurl";
import Worker from "../src/Worker-node.js";

const workerURL =
  import.meta.resolve?.("./42.js") ?? new URL("42.js", import.meta.url).href;

test("new Worker() throws with no type:module", () => {
  assert.throws(() => {
    new Worker(workerURL);
  });
});

test("new Worker() works with type:module", () => {
  const w = new Worker(workerURL, { type: "module" });
  w.terminate();
});

test("new Worker() throws with type:classic", () => {
  assert.throws(() => {
    new Worker(workerURL, { type: "classic" });
  });
});

test("42.js postMessage(42) is received", async () => {
  const w = new Worker(workerURL, { type: "module" });
  const p = new Promise((resolve, reject) => {
    w.addEventListener("message", (event) => {
      resolve(event.data);
    });
    w.addEventListener("error", (event) => {
      reject(event.error);
    });
  });
  assert.strictEqual(await p, 42);
  w.terminate();
});

test("blob: URL works!", async () => {
  const blob = new Blob([`postMessage(42)`], { type: "text/javascript" });
  const blobURL = URL.createObjectURL(blob);
  const w = new Worker(blobURL, { type: "module" });
  const p = new Promise((resolve, reject) => {
    w.addEventListener("message", (event) => {
      resolve(event.data);
    });
    w.addEventListener("error", (event) => {
      reject(event.error);
    });
  });
  assert.strictEqual(await p, 42);
  w.terminate();
});

test("worker.postMessage() works", async () => {
  const w = new Worker(
    esmurl(import.meta, async () => {
      globalThis.addEventListener("message", (event) => {
        console.log(event.data);
        postMessage(event.data);
      });
    }),
    { type: "module" }
  );
  const p = new Promise((resolve, reject) => {
    w.addEventListener("message", (event) => {
      resolve(event.data);
    });
    w.addEventListener("error", (event) => {
      reject(event.error);
    });
  });
  w.postMessage(42);
  assert.strictEqual(await p, 42);
  w.terminate();

  await new Promise((resolve) => setTimeout(resolve, 1000));
});
