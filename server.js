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
let notes = new Array();

app.get("/", async (req, res) => {
  notes = await db.query("SELECT * FROM notes");
  res.render("./index.ejs", { notes: notes.rows });
});

app.post("/edit", async (req, res) => {
  const noteId = parseInt(req.body.noteId);
  notes = await db.query("SELECT * FROM notes WHERE noteid = $1", [noteId]);
  res.render("./edit.ejs", { notes: notes.rows[0] });
});

app.post("/edit/:noteId", async (req, res) => {
  const queryValues = [
    req.body.note,
    req.body.title,
    req.body.book,
    req.params.noteId,
  ];
  const responde = db.query(
    "UPDATE notes SET note = $1, title = $2, bookid = $3 WHERE noteid = $4",
    queryValues,
  );
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const noteToDelete = [req.body.noteId];
  db.query("DELETE FROM notes WHERE noteid = $1", noteToDelete);
  res.redirect("/");
});

app.post("/add", (req, res) => {
  res.render("./add.ejs");
});

app.post("/add-new", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
