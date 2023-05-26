import runAWorker from "./runAWorker.js";

const nodeWorker = new WeakMap();

class Worker {
  constructor(scriptURL, options = {}) {
    scriptURL = `${scriptURL}`;
    options = WorkerOptions.from(options);

    // When the Worker(scriptURL, options) constructor is invoked, the user agent must run the following steps:

    // 1. The user agent may throw a "SecurityError" DOMException if the request violates a policy decision (e.g. if the user agent is configured to not allow the page to start dedicated workers).

    // 2. Let outside settings be the current settings object.
    // 3. Parse the scriptURL argument relative to outside settings.
    // 4. If this fails, throw a "SyntaxError" DOMException.
    // 5. Let worker URL be the resulting URL record.
    let workerURL;
    try {
      workerURL = `${new URL(scriptURL, pathToFileURL(process.cwd()))}`;
    } catch (error) {
      throw new DOMException(error, "SyntaxError");
    }
    // Node: Any same-origin URL (including blob: URLs) can be used. data: URLs can also be used, but they create a worker with an opaque origin.

    // 6. Let worker be a new Worker object.
    const worker = this;

    // 7. Let outside port be a new MessagePort in outside settings's realm.
    // 8. Associate the outside port with worker.
    // 9. Run this step in parallel:
    // 1. Run a worker given worker, worker URL, outside settings, outside port, and options.
    runAWorker(worker, workerURL, globalThis, undefined, options);

    // 10. Return worker.
  }
}

export default Worker;
export { nodeWorker };
