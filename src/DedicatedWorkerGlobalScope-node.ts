import WorkerGlobalScope from "./WorkerGlobalScope-node.js";

class DedicatedWorkerGlobalScope extends WorkerGlobalScope {
  postMessage(message, transferOrOptions) {
    workerThreads.parentPort.postMessage(message, transferOrOptions);
  }

  close() {
    workerThreads.parentPort.close();
  }
}

export default DedicatedWorkerGlobalScope;
