import express from "express";
import userRouter from "./user.routes";
import notesRouter from "./notes.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/user", userRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
