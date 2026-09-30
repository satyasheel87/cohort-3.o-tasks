import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routers/auth.router.js";
import productRouter from "../routers/product.router.js";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Backend is running successfully🎉");
});

// === Routers ===
app.use("/api/auth", authRouter);
app.use("/api", productRouter);
export default app;