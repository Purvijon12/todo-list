const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get("/", (req, res) => {
  res.render("index", { todos });
});

app.post("/add", (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) {
    return res.send("<script>alert('Task cannot be empty'); window.location.href='/'</script>");
  }

  todos.push({
    id: Date.now().toString(),
    task,
    priority,
  });
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const { id, task, priority } = req.body;

  if (!task.trim()) {
    return res.send("<script>alert('Updated task cannot be empty'); window.location.href='/'</script>");
  }

  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, task, priority };
    }
    return todo;
  });

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const { id } = req.body;
  todos = todos.filter(todo => todo.id !== id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
