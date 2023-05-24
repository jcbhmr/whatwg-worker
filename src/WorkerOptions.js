/**
 * @typedef {object} WorkerOptions
 * @property {string} WorkerOptions.type
 * @property {string} WorkerOptions.name
 */

const WorkerOptions = {
  from(o) {
    o = Object(o);
    o.type = `${o.type ?? "classic"}`;
    o.name = `${o.name ?? ""}`;
    return o;
  },
};

export default WorkerOptions;
