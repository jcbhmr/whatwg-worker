/** @see https://html.spec.whatwg.org/multipage/workers.html#run-a-worker */
export default function runAWorker(
  worker: Worker | SharedWorker,
  url: string,
  outsideSettings: typeof globalThis,
  outsidePort: MessagePort,
  options: WorkerOptions
): void {
  // When a user agent is to run a worker for a script with Worker or
  // SharedWorker object worker, URL url, environment settings object outside
  // settings, MessagePort outside port, and a WorkerOptions dictionary options,
  // it must run the following steps.

  // 1. Let is shared be true if worker is a SharedWorker object, and false otherwise.
  const isShared =
    Object.prototype.toString.call(worker).slice(8, -1) === "SharedWorker";

  // 2. Let owner be the relevant owner to add given outside settings.
  const owner = outsideSettings;

  // 3. Let parent worker global scope be null.
  let parentWorkerGlobalScope: null | any = null;

  // 4. If owner is a WorkerGlobalScope object (i.e., we are creating a nested
  //    dedicated worker), then set parent worker global scope to owner.
  if (
    Object.prototype.toString.call(owner).slice(8, -1) === "WorkerGlobalScope"
  ) {
    parentWorkerGlobalScope = owner;
  }

  // 5. Let unsafeWorkerCreationTime be the unsafe shared current time.
  const unsafeWorkerCreationTime = performance.now();

  // 7. Let realm execution context be the result of creating a new realm given
  //    agent and the following customizations: For the global object, if is
  //    shared is true, create a new SharedWorkerGlobalScope object. Otherwise,
  //    create a new DedicatedWorkerGlobalScope object.
  // 8. Let worker global scope be the global object of realm execution
  //    context's Realm component. Note: This is the DedicatedWorkerGlobalScope
  //    or SharedWorkerGlobalScope object created in the previous step.
  // 9. Set up a worker environment settings object with realm execution
  //    context, outside settings, and unsafeWorkerCreationTime, and let inside
  //    settings be the result.
  // 10. Set worker global scope's name to the value of options's name member.
  // 11. Append owner to worker global scope's owner set.
  // 12. If is shared is true, then:
  //     1. Set worker global scope's constructor origin to outside settings's
  //        origin.
  //     2. Set worker global scope's constructor url to url.
  //     3. Set worker global scope's type to the value of options's type
  //        member.
  //     4. Set worker global scope's credentials to the value of options's
  //        credentials member.
  // 13. Let destination be "sharedworker" if is shared is true, and "worker"
  //     otherwise.
  // 14. Obtain script by switching on the value of options's type member:
  //     - "classic": Fetch a classic worker script given url, outside settings,
  //       destination, inside settings, and with onComplete and performFetch as
  //       defined below.
  //     - "module": Fetch a module worker script graph given url, outside
  //       settings, destination, the value of the credentials member of
  //       options, inside settings, and with onComplete and performFetch as
  //       defined below.
  //
  //     In both cases, let performFetch be the following perform the fetch hook
  //     given request, isTopLevel and processCustomFetchResponse:
  //     1. If isTopLevel is false, fetch request with
  //        processResponseConsumeBody set to processCustomFetchResponse, and
  //        abort these steps.
  //     2. Set request's reserved client to inside settings.
  //     3. Fetch request with processResponseConsumeBody set to the following
  //        steps given response response and null, failure, or a byte sequence
  //        bodyBytes:
  //        1. Set worker global scope's url to response's url.
  //        2. Initialize worker global scope's policy container given worker
  //           global scope, response, and inside settings.
  //        4. If worker global scope's embedder policy's value is compatible
  //           with cross-origin isolation and is shared is true, then set
  //           agent's agent cluster's cross-origin isolation mode to "logical"
  //           or "concrete". The one chosen is implementation-defined. This
  //           really ought to be set when the agent cluster is created, which
  //           requires a redesign of this section.
  //        5. If the result of checking a global object's embedder policy with
  //           worker global scope, outside settings, and response is false,
  //           then set response to a network error.
  //        6. Set worker global scope's cross-origin isolated capability to
  //           true if agent's agent cluster's cross-origin isolation mode is
  //           "concrete".

  // If is shared is false and owner's cross-origin isolated capability is false, then set worker global scope's cross-origin isolated capability to false.

  // If is shared is false and response's url's scheme is "data", then set worker global scope's cross-origin isolated capability to false.

  // This is a conservative default for now, while we figure out how workers in general, and data: URL workers in particular (which are cross-origin from their owner), will be treated in the context of permissions policies. See w3c/webappsec-permissions-policy issue #207 for more details.

  // Run processCustomFetchResponse with response and bodyBytes.

  // In both cases, let onComplete given script be the following steps:

  // If script is null or if script's error to rethrow is non-null, then:

  // Queue a global task on the DOM manipulation task source given worker's relevant global object to fire an event named error at worker.

  // Run the environment discarding steps for inside settings.

  // Abort these steps.

  // Associate worker with worker global scope.

  // Let inside port be a new MessagePort object in inside settings's realm.

  // Associate inside port with worker global scope.

  // Entangle outside port and inside port.

  // Create a new WorkerLocation object and associate it with worker global scope.

  // Closing orphan workers: Start monitoring the worker such that no sooner than it stops being a protected worker, and no later than it stops being a permissible worker, worker global scope's closing flag is set to true.

  // Suspending workers: Start monitoring the worker, such that whenever worker global scope's closing flag is false and the worker is a suspendable worker, the user agent suspends execution of script in that worker until such time as either the closing flag switches to true or the worker stops being a suspendable worker.

  // Set inside settings's execution ready flag.

  // If script is a classic script, then run the classic script script. Otherwise, it is a module script; run the module script script.

  // In addition to the usual possibilities of returning a value or failing due to an exception, this could be prematurely aborted by the terminate a worker algorithm defined below.

  // Enable outside port's port message queue.

  // If is shared is false, enable the port message queue of the worker's implicit port.

  // If is shared is true, then queue a global task on DOM manipulation task source given worker global scope to fire an event named connect at worker global scope, using MessageEvent, with the data attribute initialized to the empty string, the ports attribute initialized to a new frozen array containing inside port, and the source attribute initialized to inside port.

  // Enable the client message queue of the ServiceWorkerContainer object whose associated service worker client is worker global scope's relevant settings object.

  // Event loop: Run the responsible event loop specified by inside settings until it is destroyed.

  // The handling of events or the execution of callbacks by tasks run by the event loop might get prematurely aborted by the terminate a worker algorithm defined below.

  // The worker processing model remains on this step until the event loop is destroyed, which happens after the closing flag is set to true, as described in the event loop processing model.

  // Clear the worker global scope's map of active timers.

  // Disentangle all the ports in the list of the worker's ports.

  // Empty worker global scope's owner set.
}
