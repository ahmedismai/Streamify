import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("initializes onboarding full name from the backend user name field", () => {
  const source = readFileSync(new URL("./Onboarding.jsx", import.meta.url), "utf8");

  assert.match(source, /fullName:\s*authUser\?\.name\s*\|\|\s*""/);
});
