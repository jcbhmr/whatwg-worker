import WorkerGlobalScope_ from "./WorkerGlobalScope.js";
import DedicatedWorkerGlobalScope_, {
  nodeParentPort,
} from "./DedicatedWorkerGlobalScope.js";
import { parentPort } from "node:worker_threads";

// TODO: Translate this to JSDoc
// declare global {
//   type WorkerGlobalScope = WorkerGlobalScope_;
//   var WorkerGlobalScope: typeof WorkerGlobalScope_;
//   type DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope_;
//   var DedicatedWorkerGlobalScope = typeof DedicatedWorkerGlobalScope_;
//   var name: typeof DedicatedWorkerGlobalScope_.name
//   var postMessage: typeof DedicatedWorkerGlobalScope_.postMessage
//   var close: typeof DedicatedWorkerGlobalScope_.close
//   var onmessage: typeof DedicatedWorkerGlobalScope_.onmessage
//   var onmessageerror: typeof DedicatedWorkerGlobalScope_.onmessageerror
//   var onerror: typeof DedicatedWorkerGlobalScope_.onerror
//   var onrejectionhandled: typeof DedicatedWorkerGlobalScope_.onrejectionhandled
//   var onunhandledrejection: typeof DedicatedWorkerGlobalScope_.onunhandledrejection
//   var self: typeof DedicatedWorkerGlobalScope_.self
//   interface WindowEventMap {
//     message: MessageEvent
//     messageerror: MessageEvent
//     error: ErrorEvent
//     rejectionhandled: RejectionEvent
//     unhandledrejection: RejectionEvent
//   }
// }

globalThis.WorkerGlobalScope = WorkerGlobalScope_;
globalThis.DedicatedWorkerGlobalScope = DedicatedWorkerGlobalScope_;

Object.setPrototypeOf(globalThis, DedicatedWorkerGlobalScope_.prototype);
nodeParentPort.set(globalThis, parentPort);
