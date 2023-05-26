import WorkerGlobalScope from "./WorkerGlobalScope.js";

const name = new WeakMap<DedicatedWorkerGlobalScope, string>();
const port = new WeakMap<DedicatedWorkerGlobalScope, MessagePort>();

class DedicatedWorkerGlobalScope extends WorkerGlobalScope {
  // @ts-ignore
  constructor() {
    throw new TypeError("Illegal constructor");
  }

  get name(): string {
    return name.get(this)!;
  }

  postMessage(message: any, transfer?: Iterable<object>): void;
  postMessage(message: any, options: StructuredSerializeOptions): void;
  postMessage(
    message: any,
    transferOrOptions:
      | Iterable<object>
      | StructuredSerializeOptions
      | undefined = undefined
  ): void {
    // @ts-ignore Node.js .d.ts files are wrong. MessagePort supports both.
    return port.get(this)!.postMessage(message, transferOrOptions);
  }
}

export default DedicatedWorkerGlobalScope;
export { name, port };
