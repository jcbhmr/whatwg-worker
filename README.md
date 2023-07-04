# Isomorphic HTML `Worker` threads

🧵 Launch a `new Worker()` in Node.js, Deno, or the browser

<div align="center">

![](https://picsum.photos/600/400)

</div>

👷‍♂️ Lets you use `new Worker()` anywhere \
🤝 Implements `SharedWorker`! \
0️⃣ Zero-cost when used in the browser \
✨ WebIDL-compliant

## Installation

You can install this package using npm, [Yarn], [pnpm], or your other favorite
npm package manager. 📦

```sh
npm install @webfill/html-workers
```

If you're using Deno, you can use the new `npm:` imports or just import it
straight from an npm CDN like [esm.sh] or [jsDelivr].

```js
import "npm:@webfill/html-workers";
import "https://esm.sh/@webfill/html-workers";
```

For browser users, just import it via a CDN like [esm.sh] or [jsDelivr]. You'll
get a lot of re-exported globals for zero-cost. 🤩

```js
import "https://esm.sh/@webfill/html-workers";
import "https://esm.run/@webfill/html-workers";
```

🛑 The `SharedWorker` shim implementation for browsers will only be loaded if no
`SharedWorker` exists. This is **not always zero-cost**. Take a look at [the
`SharedWorker` support matrix] on caniuse.com. Support is notably lacking on
mobile device browsers. 😭

## Usage

The easiest way to get started is just to `import` the polyfill in your main
thread, and then once in each worker thread. 🛑 **It's on _you_** to `import`
the polyfill on the "inside" of the worker. Why? Because sometimes you might
_not_ want to have the polyfill on the inside of the worker.

<table><td>

```js
// main.js
import "@webfill/html-workers";

// 👉
const u = import.meta.resolve("./worker.js");
const w = new Worker(u, { type: "module" });
w.onmessage = (e) => console.log(e.data);
//=> "Hello from file:///worker.js!"
w.postMessage(5000);
```

<td>

```js
// worker.js
import "@webfill/html-workers";

globalThis.postMessage(`Hello from ${location}!`);
globalThis.onmessage = (e) => console.log(e.data);
//=> 5000
const u = `data:text/javascript,console.log("Hello world!")`;
const w = new Worker(u, { type: "module" });
//=> "Hello world!"
```

</table>

☝ That code will work in the browser, Node.js, and Deno. 😱 And guess what? In
the browser, **zero code** will be bundled thanks to compile-time export
conditions! 🤩

<details><summary>⚠️ Node.js can't import <code>blob:</code> URLs</summary>

Node.js will fail if you do this:

```js
const b = new Blob([`console.log(42)`], { type: "text/javascript" });
const u = URL.createObjectURL(b);
await import(u);
//=> Uncaught: Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: ...
```

There are a couple relevant issues tracking this. [nodejs/node#47573] tracks the
`import("blob:")` case, while [nodejs/node#46557] tracks the support for
cross-thread access to `blob:` URLs (including `fetch()`).

If you want to use `blob:` URLs with `new Worker()` before those things happen,
you can use the `@jcbhmr/bburls` package like this:

```sh
export NODE_OPTIONS='--experimental-loader=@jcbhmr/bblobu --import=@jcbhmr/bblobu'
node main.js
```

☝ This will add a custom `blob:` import loader as well as add a `fetch()`
decorator to support `blob:` URLs _across threads_. Check out [jcbhmr/bblobu]
for more information.

🔗 If you're interested in `import("https://...")` support, check out other
Node.js HTTP loaders like [the Node.js docs HTTP loader] or
[node-loader/node-loader-http].

</details>

👀 Also check out the [esmurl] package which lets you write your worker thread
code right next to your main thread code. Oh, and it works with bundlers! 😊

```js
// main.js
const u = esmurl(import.meta, async () => {
  await import("@webfill/html-workers");
  const { default: isOdd } = await import("is-odd");
  globalThis.onmessage = (e) => {
    const n = e.data;
    const r = isOdd(n);
    globalThis.postMessage(r);
  };
});

const w = new Worker(u, { type: "module" });
w.onmessage = (e) => console.log(e.data);
w.postMessage(5000);
//=> false
w.postMessage(5001);
//=> true
```

If you're looking to use this package as a ponyfill (like for a library), you
can import any of the direct files that we expose as sub-path exports.

<table><td>

```js
// main.js
import Worker from "@webfill/html-workers/Worker.js";

console.log("Worker" in globalThis);
//=> false
const u = import.meta.resolve("./worker.js");
const w = new Worker(u, { type: "module" });
//=> "Hello world!"
w.onmessage = (e) => console.log(e.data);
//=> "Hello from file:///worker.js!"
```

<td>

```js
// worker.js
import self from "@webfill/html-workers/self.js";
import workerThreads from "node:worker_threads";

console.log(workerThreads.workerData);
//=> { constructorName: "Worker", type: "module", ... }
console.log("DedicatedWorkerGlobalScope" in globalThis);
//=> false

self.postMessage(`Hello from ${self.location}!`);
```

</table>

ℹ `self` from `@webfill/html-workers/self.js` is an instance of
`DedicatedWorkerGlobalScope`. It **doesn't have any `globalThis` props**.

### `SharedWorker` threads

Don't forget! We implement the `SharedWorker` class too. It works just like you
expect it to in the browser. Remember, `SharedWorker` instances are keyed by the
**constructor URL**, not the final/redirected URL.

<table><td rowspan="2">

```js
// main.js
import "@webfill/html-workers";

var u = import.meta.resolve("./shared.js");
const s = new SharedWorker(u, { type: "module" });
s.port.postMessage(10);

var u = import.meta.resolve("./worker.js");
new Worker(u, { type: "module" });
new Worker(u, { type: "module" });
await new Promise((r) => setTimeout(r, 100));

s.port.onmessage = (e) => console.log(e.data);
//=> 10
//=> 110
//=> 210
```

<td>

```js
// shared.js
import "@webfill/html-workers";

const u = import.meta.resolve("./worker.js");
let n = 0;
globalThis.onconnect = (e) =>
  (e.ports[0].onmessage = (e) => console.log((n += e.data)));
```

<tr><td>

```js
// worker.js
import "@webfill/html-workers";

const u = import.meta.resolve("./shared.js");
const w = new SharedWorker(u, { type: "module" });
w.postMessage(100);
```

</table>

### What's included

This package focuses mostly on stuff that is on the `workers.html` page of the
HTML spec (that's where we got the name `html-workers` from!). That means things
like `Worker` and `AbstractWorker` are here, but `ServiceWorker` isn't.

- [ ] `Worker` class
- [ ] `AbstractWorker` interface
- [ ] `WorkerGlobalScope` class
- [ ] `DedicatedWorkerGlobalScope` class
- [ ] `WorkerLocation` class
- [ ] `WorkerNavigator` class
- [ ] `SharedWorker` class
- [ ] `SharedWorkerGlobalScope` class
- [ ] `WorkerOptions` type

It's important to note that the `navigator` and `location` globals that are
exposed on the "inside" of a `new Worker()` **do not include** some of the
typical web mixin classes like [`NavigatorUA`]. You can add these yourself in
your own code if you like:

```js
// worker.js
import "@webfill/ua-client-hints";

console.log(navigator.userAgentData.brands);
//=> [{ brand: "Node.js", version: "v20.0.0" }]
```

## Development

To get started, run `npm install` and `npm run dev` to start the dev loop! We
use `tsx` + `node:test` for testing. You can run `npm test` to run just the
tests.

```sh
npm install
npm run dev
```

To run the build script, run `npm run build`. This will generate the `dist/`
folder with the ESM output files. We are using plain `tsc`.

```sh
npm run build
```

This package uses TypeScript. We want to use TypeScript so that we get easy code
co-location for all the complex types we want to declare. We also get access to
Stage 3 JavaScript features like `using` and `@decorators`! We use `@decorators`
to make the WebIDL implementations a lot more readable vs. applying these WebIDL
annotations _after_ the fact.

```ts
@interface_("Worker")
@constructor([USVString, optional(WorkerOptions)])
class Worker {
  constructor(scriptURL: USVString, options?: WorkerOptions) {}
  @eventHandlerIDLAttribute("message")
  accessor onmessage: EventHandler;
  @eventHandlerIDLAttribute("messageerror")
  accessor onmessageerror: EventHandler;
}
```

<details><summary>What the alternative JavaScript version looks like</summary>

```js
class Worker {
  constructor(scriptURL, options) {}
}
Worker = interface_("Worker")(Worker);
Worker = constructor([USVString, optional(WorkerOptions)])(Worker);
defineEventHandlerIDLAttribute(Worker, "onmessage", "message");
defineEventHandlerIDLAttribute(Worker, "onmessageerror", "messageerror");
```

</details>

<!-- prettier-ignore-start -->
[esmurl]: https://github.com/togajam/esmurl#readme
[`navigatorua`]: https://wicg.github.io/ua-client-hints/#navigatorua
[esm.sh]: https://esm.sh/
[jsdelivr]: https://www.jsdelivr.com/esm
[yarn]: https://yarnpkg.com/
[pnpm]: https://pnpm.io/
[the `sharedworker` support matrix]: https://caniuse.com/sharedworkers
[the node.js docs http loader]: https://nodejs.org/api/esm.html#https-loader
[node-loader/node-loader-http]: https://github.com/node-loader/node-loader-http#readme
[jcbhmr/bblobu]: https://github.com/jcbhmr/bblobu#readme
<!-- prettier-ignore-end -->
