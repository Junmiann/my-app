import express from "express";
import cors from "cors";
import classesRouter from "./routes/classes.js";

const app = express();
const PORT = 5000;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());

// Routes
app.use("/classes", classesRouter);

app.listen(PORT, HOST, () => {
  console.log(`The server is on: http://localhost:${PORT}`);
});
