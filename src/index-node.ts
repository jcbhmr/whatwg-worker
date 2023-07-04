import Worker_ from "./Worker-node.js";
import SharedWorker_ from "./SharedWorker-node.js";

globalThis.Worker = Worker_;
globalThis.SharedWorker = SharedWorker_;
