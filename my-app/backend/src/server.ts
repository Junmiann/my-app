import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`The server is on: http://localhost:${PORT}`);
});
