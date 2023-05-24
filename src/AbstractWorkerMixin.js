const AbstractWorkerMixin = {
  prototype: {},
};

defineEventHandlerIDLAttribute(AbstractWorkerMixin.prototype, "onerror");

export default AbstractWorkerMixin;
