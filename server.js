import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "NoteLit",
  password: "1518",
  port: 5432,
});

db.connect();

app.get("/", async (req, res) => {
  const resultado = await db.query("SELECT * FROM notes");
  res.render("./index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
