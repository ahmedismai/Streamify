import express from "express";
import { createServer } from "http";
import { parse } from "url";
import authRouter from "../routes/auth.route.js";
import userRouter from "../routes/user.route.js";
import chatRouter from "../routes/chat.route.js";
import "dotenv/config";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://streamify-fsld.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/chat", chatRouter);
app.get("/", (_, res) => res.status(200).json("Hello from Serverless!"));

connectDB();

// export handler
export default app;
