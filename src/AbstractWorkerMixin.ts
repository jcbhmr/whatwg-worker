import { defineEventHandlerIDLAttribute } from "@jcbhmr/html-event-handler-attributes";
import type ErrorEvent from "@jcbhmr/html-event-error/ErrorEvent.js";

interface AbstractWorkerMixin {
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null;
}
const AbstractWorkerMixin = {
  prototype: {},
};
// @ts-ignore AbstractWorker isn't an EventTarget, but it will be added to one.
defineEventHandlerIDLAttribute(AbstractWorkerMixin.prototype, "onerror");

export default AbstractWorkerMixin;
