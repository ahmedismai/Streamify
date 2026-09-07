import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import {
  getAllowedOrigins,
  getAuthCookieOptions,
  getFrontendDistPath,
  isOriginAllowed,
} from "../src/lib/httpConfig.js";

test("allows Vite development origins on localhost and 127.0.0.1", () => {
  const origins = getAllowedOrigins({ CLIENT_URL: "" });

  assert.equal(origins.includes("http://localhost:5173"), true);
  assert.equal(origins.includes("http://localhost:5177"), true);
  assert.equal(origins.includes("http://127.0.0.1:5177"), true);
});

test("allows configured client origins and Vercel preview deployments", () => {
  const env = { CLIENT_URL: "https://example.com, http://localhost:3001" };
  const origins = getAllowedOrigins(env);

  assert.equal(isOriginAllowed("https://example.com", origins), true);
  assert.equal(isOriginAllowed("https://streamify-ab12.vercel.app", origins), true);
  assert.equal(isOriginAllowed("https://evil.example", origins), false);
});

test("uses the actual Frontend dist directory casing", () => {
  const srcDir = path.resolve("Backend/src");
  const frontendDistPath = getFrontendDistPath(srcDir);

  assert.equal(frontendDistPath, path.resolve("Frontend/dist"));
});

test("uses secure cross-site auth cookies only in production", () => {
  assert.deepEqual(getAuthCookieOptions("development"), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  assert.deepEqual(getAuthCookieOptions("production"), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
});
