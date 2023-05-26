import { createRequire } from "node:module";

const require = createRequire(process.cwd() + "/");

function importScriptsIntoWorkerGlobalScope(
  workerGlobalScope,
  urls,
  performFetch = undefined
) {
  // To import scripts into worker global scope, given a WorkerGlobalScope object worker global scope, a list of scalar value strings urls, and an optional perform the fetch hook performFetch:

  // 1. If worker global scope's type is "module", throw a TypeError exception.
  if (type.get(workerGlobalScope) === "module") {
    throw new TypeError();
  }

  // 3. If urls is empty, return.
  if (!urls.length) {
    return;
  }

  // 5. For each url in the resulting URL records:
  for (const url of x) {
    // 1. Fetch a classic worker-imported script given url and settings object, passing along performFetch if provided. If this succeeds, let script be the result. Otherwise, rethrow the exception.
    // 2. Run the classic script script, with the rethrow errors argument set to true.
    require(url);
    // Note: script will run until it either returns, fails to parse, fails to catch an exception, or gets prematurely aborted by the terminate a worker algorithm defined above.

    // If an exception was thrown or if the script was prematurely aborted, then abort all these steps, letting the exception or aborting continue to be processed by the calling script.
  }

  // Note: Service Workers is an example of a specification that runs this algorithm with its own perform the fetch hook. [SW]
}
