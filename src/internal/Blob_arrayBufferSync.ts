import workerThreads from "node:worker_threads";
import esmurl from "esmurl";

let url;
let worker;
let lock;
let id;
/**
 * @param {Blob} b
 * @returns {ArrayBuffer}
 */
function Blob_arrayBufferSync(b) {
  id = clearTimeout(id);
  url ??= esmurl(import.meta, async () => {
    const workerThreads = await import("node:worker_threads");
    workerThreads.parentPort.on("message", async (b) => {
      const a = await b.arrayBuffer();
      workerThreads.parentPort.postMessage(a);
      Atomics.store(workerThreads.workerData, 0, 1);
      Atomics.notify(workerThreads.workerData, 0);
    });
  });
  lock ??= new Int32Array(new SharedArrayBuffer(4));
  worker ??= new workerThreads.Worker(`import(${JSON.stringify(url)})`, {
    eval: true,
    name: "Blob_arrayBufferSync",
    workerData: lock.buffer,
  });
  Atomics.store(lock, 0, 0);
  worker.postMessage(b);
  Atomics.wait(lock, 0, 0);
  id = setTimeout(() => (worker = worker.terminate()), 5000);
  return workerThreads.receiveMessageOnPort(worker).message;
}

export default Blob_arrayBufferSync;
