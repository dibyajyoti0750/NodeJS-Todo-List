const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let tasks = [
  { id: uuidv4(), task: "Eat" },
  { id: uuidv4(), task: "Code" },
  { id: uuidv4(), task: "Sleep" },
  { id: uuidv4(), task: "Repeat" },
];

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home", { tasks });
});

app.get("/home/add", (req, res) => {
  res.render("new");
});

app.post("/home", (req, res) => {
  let { task } = req.body;
  let id = uuidv4();
  tasks.push({ id, task });
  res.redirect("/home");
});

app.get("/home/task/:id", (req, res) => {
  const { id } = req.params;
  let task = tasks.find((task) => id === task.id);
  res.render("show", { task });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
