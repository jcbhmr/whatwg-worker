import workerThreads from "node:worker_threads";
import esmurl from "esmurl";
import blobURLToDataURL from "./internal/blobURLToDataURL-node.js";

const preludeURL = esmurl(import.meta, () =>
  import("./worker-environment-polyfill-node.js")
);

class Worker extends EventTarget {
  #workerThreadsWorker;
  /**
   * @param {string | URL} scriptURL
   * @param {WorkerOptions} [options]
   */
  constructor(scriptURL_, options = {}) {
    let scriptURL = `${scriptURL_}`;
    const { name, type } = options;
    if (type !== "module") {
      throw new DOMException(
        "Only module workers are supported",
        "NotSupportedError"
      );
    }
    if (scriptURL.startsWith("blob:")) {
      scriptURL = blobURLToDataURL(scriptURL);
    }

    super();
    var js = `
      globalThis.__name__ = ${JSON.stringify(name)};
      import(${JSON.stringify(preludeURL)})
        .then(()=>import(${JSON.stringify(scriptURL)}))
    `;
    this.#workerThreadsWorker = new workerThreads.Worker(js, {
      eval: true,
      name,
    });
    this.#workerThreadsWorker.unref();
    this.#workerThreadsWorker.on("message", (data) => {
      this.dispatchEvent(new MessageEvent("message", { data }));
    });
    this.#workerThreadsWorker.on("error", (error) => {
      const event = new Event("error");
      event.error = error;
      this.dispatchEvent(event);
    });
    this.#workerThreadsWorker.on("messageerror", (error) => {
      const event = new Event("messageerror");
      event.error = error;
      this.dispatchEvent(event);
    });
  }

  postMessage(message, transferOrOptions) {
    this.#workerThreadsWorker.postMessage(message, transferOrOptions);
  }

  terminate() {
    this.#workerThreadsWorker.terminate();
  }
}

export default Worker;
