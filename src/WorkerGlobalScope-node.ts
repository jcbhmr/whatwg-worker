import type WorkerNavigator from "./WorkerNavigator.js";
import type WorkerLocation from "./WorkerLocation.js";

const navigator = new WeakMap<WorkerGlobalScope, WorkerNavigator>();
const location = new WeakMap<WorkerGlobalScope, WorkerLocation>();

/**
 * @param {WorkerGlobalScope} self
 * @param {WorkerLocation} location
 * @param {WorkerNavigator} navigator
 */
function initWorkerGlobalScope(self, location_, navigator_) {
  location.set(self, location_);
  navigator.set(self, navigator_);
}

class WorkerGlobalScope extends EventTarget {
  get self(): WorkerGlobalScope {
    return this ?? globalThis;
  }

  get location(): WorkerLocation {
    return location.get(this ?? globalThis)!;
  }

  get navigator(): WorkerNavigator {
    return location.get(this ?? globalThis)!;
  }

  importScripts(...urls) {
    throw new DOMException(
      "Module scripts don't support importScripts().",
      "NotSupportedError"
    );
  }
}
WorkerGlobalScope = bindInterface(WorkerGlobalScope);

export default WorkerGlobalScope;
export { initWorkerGlobalScope };
