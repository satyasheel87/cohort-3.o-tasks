import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routers/auth.router.js";
import productRouter from "../routers/product.router.js";
import cors from "cors";

const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  "https://backend-e-com-project.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
].filter(Boolean));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests and the deployed/local frontends.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Backend is running successfully🎉");
});

// === Routers ===
app.use("/api/auth", authRouter);
app.use("/api", productRouter);
export default app;
