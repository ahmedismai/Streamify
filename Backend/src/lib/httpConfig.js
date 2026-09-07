import path from "node:path";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5176",
  "http://127.0.0.1:5177",
  "http://127.0.0.1:5178",
  "http://127.0.0.1:5179",
  "https://streamify-6saj.vercel.app",
  "https://streamify-xv75.vercel.app",
  "https://lingostream.netlify.app",
];

export function getAllowedOrigins(env = process.env) {
  const configuredOrigins = String(env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredOrigins])];
}

export function isOriginAllowed(origin, allowedOrigins = getAllowedOrigins()) {
  return (
    !origin ||
    allowedOrigins.includes(origin) ||
    /^https:\/\/streamify-[a-z0-9]+\.vercel\.app$/.test(origin)
  );
}

export function getAuthCookieOptions(nodeEnv = process.env.NODE_ENV) {
  const isProduction = nodeEnv === "production";

  return {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };
}

export function getFrontendDistPath(srcDir) {
  return path.join(srcDir, "../../Frontend/dist");
}
