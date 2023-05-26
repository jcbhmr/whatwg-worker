import { read, write as write } from "node:fs";

// TODO: Explain why this is needed
let called = false;
function applyProcessIOPatch(): void {
  if (called) {
    return;
  }
  called = true;

  function readWrapper(this: typeof process.stdin, n: number): any {
    const buffer = Buffer.alloc(n);
    read(this.fd, buffer, 0, n, null, (error, bytesRead) => {
      if (error) {
        this.destroy(error);
      } else {
        this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
      }
    });
  }
  process.stdin._read = readWrapper;

  // If implemented and if there is buffered data from previous writes,
  // _writev() will be called instead of _write().

  function writevWrapper(
    this: typeof process.stdout | typeof process.stderr,
    chunks: {
      chunk: any;
      encoding: BufferEncoding;
    }[],
    callback: (error?: Error | null | undefined) => void
  ): any {
    const { chunk, encoding } = chunks.pop()!;
    write(this.fd, chunk, null, encoding, (error) => {
      if (error) {
        callback(error);
      } else if (chunks.length === 0) {
        callback();
      } else {
        this._writev!(chunks, callback);
      }
    });
  }
  process.stdout._writev = writevWrapper;
  process.stderr._writev = writevWrapper;
}
