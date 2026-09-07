import assert from "node:assert/strict";
import test from "node:test";

import { getStreamTokenResponse } from "./chat.controller.js";

test("returns the Stream API key with the user token", () => {
  const response = getStreamTokenResponse("user-123");

  assert.equal(typeof response.token, "string");
  assert.equal(response.apiKey, process.env.STREAM_API_KEY);
});
