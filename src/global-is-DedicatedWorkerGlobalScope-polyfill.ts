import DedicatedWorkerGlobalScope_ from "./DedicatedWorkerGlobalScope.js";
import WorkerGlobalScope_ from "./WorkerGlobalScope.js";

declare global {
  type DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope_;
  var DedicatedWorkerGlobalScope: typeof DedicatedWorkerGlobalScope_;
  type WorkerGlobalScope = WorkerGlobalScope_;
  var WorkerGlobalScope: typeof WorkerGlobalScope_;

  // @ts-ignore
  var self: DedicatedWorkerGlobalScope["self"];
  // @ts-ignore
  var onerror: DedicatedWorkerGlobalScope["onerror"];
}

globalThis.DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope_;
globalThis.WorkerGlobalScope = WorkerGlobalScope_;
Object.setPrototypeOf(globalThis, DedicatedWorkerGlobalScope_.prototype);
