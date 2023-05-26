import WorkerGlobalScope from "./WorkerGlobalScope.js";

/**
 * @type {WeakMap<DedicatedWorkerGlobalScope, MessagePort>}
 */
const nodeParentPort = new WeakMap();

class DedicatedWorkerGlobalScope extends WorkerGlobalScope {
  static {
    defineEventHandlerIDLAttribute(this.prototype, "onmessage");
    defineEventHandlerIDLAttribute(this.prototype, "onmessageerror");
  }

  // TODO: Translate this to JSDoc
  // readonly onmessage: ... | null
  // readonly onmessageerror: ... | null

  constructor() {
    throw new TypeError("Illegal constructor");
  }

  /**
   * @returns {string}
   */
  get name() {
    return process.title;
  }

  /**
   * @param {any} message
   * @param {Iterable<object> | StructuredSerializeOptions | undefined} transfer
   * @returns {void}
   */
  postMessage(message, transfer = undefined) {
    // @ts-ignore
    nodeParentPort.get(this).postMessage(message, transfer);
  }

  close() {
    process.exit();
  }
}

export default DedicatedWorkerGlobalScope;
