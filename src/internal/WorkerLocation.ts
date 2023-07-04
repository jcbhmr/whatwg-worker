import {
  interface as interface_,
  stringifier,
  attribute,
} from "@webfill/webidl";
import type { Interface } from "@webfill/webidl";
import { USVString } from "@webfill/webidl/types.js";

@interface_("WorkerLocation", false)
// @ts-ignore
export default class WorkerLocation implements Interface {
  #url: URL;

  constructor(href: string) {
    this.#url = new URL(href);
  }

  @stringifier
  @attribute(USVString)
  get href(): string {
    return this.#url.href;
  }

  @attribute(USVString)
  get origin(): string {
    return this.#url.origin;
  }

  @attribute(USVString)
  get protocol(): string {
    return this.#url.protocol;
  }

  @attribute(USVString)
  get host(): string {
    return this.#url.host;
  }

  @attribute(USVString)
  get hostname(): string {
    return this.#url.hostname;
  }

  @attribute(USVString)
  get port(): string {
    return this.#url.port;
  }

  @attribute(USVString)
  get pathname(): string {
    return this.#url.pathname;
  }

  @attribute(USVString)
  get search(): string {
    return this.#url.search;
  }

  @attribute(USVString)
  get hash(): string {
    return this.#url.hash;
  }
}
