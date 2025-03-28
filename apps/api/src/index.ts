import express from "express";
import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";
import v1Routes from "./routes/index";

configDotenv();

// Initialize the express engine
const app: express.Application = express();
const prisma: PrismaClient = new PrismaClient();

// Take a port 3000 for running server.
const port: number = 3000;

//middlewares
app.use(express.json());

//routes
app.use("/api/v1", v1Routes);

// Server setup
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/`);
});
