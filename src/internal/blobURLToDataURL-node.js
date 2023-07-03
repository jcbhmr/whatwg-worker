import { resolveObjectURL } from "node:buffer";

export default async function blobURLToDataURL(blobURL) {
  const blob = resolveObjectURL(blobURL);
  const buffer = Buffer.from(await blob.arrayBuffer());
  return `data:${blob.type};base64,${buffer.toString("base64")}`;
}
