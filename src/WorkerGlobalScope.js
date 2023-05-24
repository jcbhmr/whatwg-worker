export default class WorkerGlobalScope extends EventTarget {
  static {
    defineEventHandlerIDLAttribute(this.prototype, "onerror");
    defineEventHandlerIDLAttribute(this.prototype, "onrejectionhandled");
    defineEventHandlerIDLAttribute(this.prototype, "onunhandledrejection");
  }

  constructor() {
    throw new TypeError("Illegal constructor");
  }

  get self() {
    return this ?? globalThis;
  }

  importScripts() {
    // Error message copied from Chrome
    throw new TypeError(
      "Failed to execute 'importScripts' on 'WorkerGlobalScope': " +
        "Module scripts don't support importScripts()."
    );
  }
}
