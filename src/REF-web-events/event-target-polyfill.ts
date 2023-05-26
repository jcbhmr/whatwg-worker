/**
 * This makes the global object have all the **properties** of an `EventTarget`,
 * but doesn't actually make it an `EventTarget` instance. Why? Because it's bad
 * practice to set the prototype! Adding properties? Great! But changing the
 * prototype of the global object would also potentially _remove properties_
 * and that's not something we want to do!
 *
 * @file
 */

globalThis.addEventListener = EventTarget.prototype.addEventListener;
globalThis.removeEventListener = EventTarget.prototype.removeEventListener;
globalThis.dispatchEvent = EventTarget.prototype.dispatchEvent;

const eventTarget = new EventTarget();
const symbols = Object.getOwnPropertySymbols(eventTarget);
symbols.push(Object.getOwnPropertySymbols(EventTarget.prototype));
for (const s of symbols) {
  globalThis[s] = eventTarget[s];
}
