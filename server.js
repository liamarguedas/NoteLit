import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "NoteLit",
  password: "1518",
  port: 5432,
});

db.connect();
let notes = [];

app.get("/", async (req, res) => {
  notes = await db.query("SELECT * FROM notes");
  res.render("./index.ejs", { notes: notes.rows });
  console.log(notes.rows);
});

app.post("/edit", (req, res) => {
  const noteId = parseInt(req.body.noteId);
  console.log(noteId);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
