import express, { Request, Response, NextFunction } from "express";

import morgan from "morgan";
import cors from "cors";
import { json } from "body-parser";

import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(json());

app.use("/todos", todoRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
