import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "url";
import { getAllowedOrigins, getFrontendDistPath, isOriginAllowed } from "./lib/httpConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = getAllowedOrigins();

app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin, allowedOrigins)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/chat", chatRouter);


app.get("/", (req, res) => {
  return res.status(200).json("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  const frontendPath = getFrontendDistPath(__dirname);
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

startServer();
