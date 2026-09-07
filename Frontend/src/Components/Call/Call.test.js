import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("uses the Stream API key returned with the token response", () => {
  const source = readFileSync(new URL("./Call.jsx", import.meta.url), "utf8");

  assert.match(source, /apiKey:\s*tokenData\?\.apiKey\s*\|\|\s*STREAM_API_KEY/);
});
