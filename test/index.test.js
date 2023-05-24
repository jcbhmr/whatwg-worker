import test from "node:test";
import assert from "node:assert";
import "../src/index.js";

test("it exposes a conforming Worker class", () => {
  assert(Worker);
  assert(Worker.prototype.terminate);
  assert(Worker.prototype.postMessage);
  assert(Worker.prototype.onmessage);
  assert(Worker.prototype.onmessageerror);
  assert(Worker.prototype.onerror);
});
