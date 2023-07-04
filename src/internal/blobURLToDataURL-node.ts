import { resolveObjectURL } from "node:buffer";
import Blob_arrayBufferSync from "./Blob_arrayBufferSync.js";

function blobURLToDataURL(blobURL: string): string {
  const blob = resolveObjectURL(blobURL)!;
  const arrayBuffer = Blob_arrayBufferSync(blob);
  const buffer = Buffer.from(arrayBuffer);
  return `data:${blob.type};base64,${buffer.toString("base64")}`;
}

export default blobURLToDataURL;
