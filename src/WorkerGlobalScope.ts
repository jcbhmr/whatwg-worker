import { defineEventHandlerIDLAttribute } from "@jcbhmr/html-event-handler-attributes";
import importScriptsIntoWorkerGlobalScope from "./importScriptsIntoWorkerGlobalScope.js";
import WorkerLocation from "./WorkerLocation.js";
import WorkerNavigator from "./WorkerNavigator.js";

const location = new WeakMap<WorkerGlobalScope, WorkerLocation>();
const navigator = new WeakMap<WorkerGlobalScope, WorkerNavigator>();

class WorkerGlobalScope extends EventTarget {
  static {
    defineEventHandlerIDLAttribute(this.prototype, "onerror");
    defineEventHandlerIDLAttribute(this.prototype, "onlanguagechange");
    defineEventHandlerIDLAttribute(this.prototype, "onoffline");
    defineEventHandlerIDLAttribute(this.prototype, "ononline");
    defineEventHandlerIDLAttribute(this.prototype, "onrejectionhandled");
    defineEventHandlerIDLAttribute(this.prototype, "onunhandledrejection");
  }

  // @ts-ignore
  constructor() {
    throw new TypeError("Illegal constructor");
  }

  get self(): ThisType<this> extends typeof globalThis
    ? typeof globalThis
    : this {
    return this ?? globalThis;
  }

  get location(): WorkerLocation {
    return location.get(this)!;
  }

  get navigator(): WorkerNavigator {
    return navigator.get(this)!;
  }

  importScripts(...urls: string[]): void {
    importScriptsIntoWorkerGlobalScope(this ?? globalThis, urls);
  }
}

export default WorkerGlobalScope;
