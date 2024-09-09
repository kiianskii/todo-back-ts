import express, { Request, Response, NextFunction } from "express";

import morgan from "morgan";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";

import todoRoutes from "./routes/todoRoutes";
import authRouter from "./routes/authRoutes";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(json());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// const { PORT } = process.env;
// app.listen(PORT);

const { DB_HOST } = process.env;

if (DB_HOST) {
  mongoose
    .connect(DB_HOST)
    .then(() => {
      app.listen(3000, () => {
        console.log("Database connection successful");
      });
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
}
