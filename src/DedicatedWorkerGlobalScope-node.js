import WorkerGlobalScope from "./WorkerGlobalScope-node.js";
import workerThreads from "node:worker_threads";

const name = __name__;
delete globalThis.__name__;

class DedicatedWorkerGlobalScope extends WorkerGlobalScope {
  get name() {
    return name;
  }

  postMessage(message, transferOrOptions) {
    workerThreads.parentPort.postMessage(message, transferOrOptions);
  }

  close() {
    workerThreads.parentPort.close();
  }
}

export default DedicatedWorkerGlobalScope;
