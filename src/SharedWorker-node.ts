import {
  interface as interface_,
  constructor,
  attribute,
} from "@webfill/webidl";
import { optional, or, DOMString, USVString } from "@webfill/webidl/types.js";
import esmurl from "esmurl";
import workerThreads from "node:worker_threads";
import WorkerOptions from "./WorkerOptions.js";

const sharedWorkers = new Set<string>();

const insidePreludeURL = esmurl(
  import.meta,
  () => import("./global-is-SharedWorkerGlobalScope-polyfill-node.js")
);

@interface_("SharedWorker")
@constructor(USVString, optional(or(DOMString, WorkerOptions)))
class SharedWorker extends EventTarget {
  #id: string;
  #port: MessagePort;
  constructor(scriptURL: string, options_: string | WorkerOptions = {}) {
    // When the SharedWorker(scriptURL, options) constructor is invoked:

    // 2. If options is a DOMString, set options to a new WorkerOptions
    //    dictionary whose name member is set to the value of options and whose
    //    other members are set to their default values.
    let options: WorkerOptions = options_ as WorkerOptions;
    if (typeof options_ === "string") {
      options = { name: options_ };
    }

    // 4. Parse scriptURL relative to outside settings.
    // 5. If this fails, throw a "SyntaxError" DOMException.
    // 6. Otherwise, let urlRecord be the resulting URL record.
    let urlRecord: URL;
    try {
      urlRecord = new URL(scriptURL, url.pathToFileURL(process.cwd()));
    } catch (error) {
      throw new DOMException("TODO", "SyntaxError");
    }
    // Note: Any same-origin URL (including blob: URLs) can be used. data: URLs
    // can also be used, but they create a worker with an opaque origin.

    /* -------------------------------------------------------------------------- */

    super();
    this.#id = "sharedworker:" + scriptURL;
    if (!sharedWorkers.has(this.#id)) {
      var js =
        `import(${JSON.stringify(insidePreludeURL)})` +
        `.then(()=>import(${JSON.stringify(urlRecord)})}}))`;
      const worker = new workerThreads.Worker(js, {
        eval: true,
        name: options.name,
        workerData: { id: this.#id },
      });
      worker.unref();
      sharedWorkers.add(this.#id);
    }

    const { port1, port2 } = new MessageChannel();
    // @ts-ignore
    port1.unref();
    this.#port = port1;
    const broadcastChannel = new BroadcastChannel(this.#id);
    // @ts-ignore
    broadcastChannel.unref();
    broadcastChannel.postMessage({ type: "connect", port: port2 });
  }

  @attribute(MessagePort)
  get port(): MessagePort {
    return this.#port;
  }
}
