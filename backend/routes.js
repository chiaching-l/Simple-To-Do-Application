const express = require("express");
const router = express.Router();
const db = require("./database");

// Convert values into SQLite 1/0 format

function tfTo01(value) {
  if (
    value === true ||
    value === "True" ||
    value === "Yes" ||
    value === 1 ||
    value === "1"
  ) {
    return 1;
  }
  return 0;
}

// 1. Get
router.get("/", (req, res) => {
  db.all("SELECT * FROM todo", [], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json("Error");
      return;
    }
    res.json(rows);
  });
});

// 2. Post
router.post("/", (req, res) => {
  console.log(req.body);
  const newtask = req.body.task;
  const isFinish = tfTo01(req.body.completed);
  db.run(
    `INSERT INTO todo (task, completed) VALUES (?, ?)`,
    [newtask, isFinish],
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).json("Error");
        return;
      }

      res.json({ id: this.lastID, task: newtask, completed: isFinish });
    },
  );
});

// 3. Put (Handles both task text and completion status)

router.put("/:id", (req, res) => {
  const todoId = req.params.id;

  // fetch the existing record from the database
  db.get(`SELECT * FROM todo WHERE id = ?`, [todoId], (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Error");
    }
    if (!row) {
      return res.status(404).json("Not found");
    }


    // Determine what needs to be updated. Keep old value if not provided.
    const updatedTask = req.body.task !== undefined ? req.body.task : row.task;
    const updatedCompleted =
      req.body.completed !== undefined
        ? tfTo01(req.body.completed)
        : row.completed;

    db.run(
      `UPDATE todo SET task = ?, completed = ? WHERE id = ?`,
      [updatedTask, updatedCompleted, todoId],
      function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json("Error");
        }
        res.json({ msg: "data updated", updatedID: todoId });
      },
    );
  });
});

// 4. Delete
router.delete("/:id", (req, res) => {
  db.run(`DELETE FROM todo WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json("Error");
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ msg: "Not found" });
    }
    res.json({ msg: "data detelted", deletedID: req.params.id });
  });
});

module.exports = router;
