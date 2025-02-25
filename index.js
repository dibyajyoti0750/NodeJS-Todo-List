const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let tasks = [
  { id: uuidv4(), task: "Eat" },
  { id: uuidv4(), task: "Run" },
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

app.get("/home/edit/:id", (req, res) => {
  let { id } = req.params;
  res.render("edit");
});

app.patch("/home/:id", (req, res) => {
  let { id } = req.params;
  let newTask = req.body.task;
  let oldTask = tasks.find((task) => id === task.id);
  oldTask.task = newTask;
  res.redirect("/home");
});

app.delete("/home/:id", (req, res) => {
  let { id } = req.params;
  tasks = tasks.filter((el) => el.id !== id);
  res.status(200).send({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
