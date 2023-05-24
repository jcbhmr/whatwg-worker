import test from "node:test";
import assert from "node:assert";
import { mkdir } from "node:fs/promises";
import { pEvent } from "p-event";
import Worker from "../src/Worker.js";

test("can spawn Worker inside Worker", async () => {
  const js1 = `
    const worker = new Worker(
      "data:text/javascript," +
        encodeURIComponent('postMessage(2)')
    )
    await new Promise(r => worker.onmessage = r)
    postMessage(1)
  `;
  const dataURL = "data:text/javascript," + encodeURIComponent(js1);
  const worker = new Worker(dataURL, { type: "module" });
  await pEvent(worker, "message");
  worker.terminate();
});
