console.log(42);
if (typeof postMessage === "function") {
  postMessage(42);
} else {
  console.error("no postMessage", globalThis);
}
export default 42;
