import React, { useState } from "react";

// Component to display a single to-do item
const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(todo.task);

  const textStyle = {
    textDecoration: todo.completed ? "line-through" : "none",
    color: todo.completed ? "grey" : "black",
    marginLeft: "10px",
    fontSize: "18px",
  };

  // Save btn func
  const handleSave = () => {
    // .trim() removes empty spaces. If empty, cancel edit.
    if (editTask.trim() === "") {
      setEditTask(todo.task);
      setIsEditing(false);
      return;
    }
    onEdit(todo.id, editTask); // Send the new task to App.js
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px",
        backgroundColor: "white",
        borderRadius: "4px",
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Checkbox*/}
        <input
          type="checkbox"
          checked={Boolean(todo.completed)}
          onChange={() => onToggle(todo.id, todo.completed)}
          style={{ transform: "scale(1.5)" }}
        />

        {/* If isEditing is true, show input. If false, show text. */}
        {isEditing ? (
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            style={{
              fontSize: "16px",
              padding: "4px",
              flex: 1,
              marginLeft: "10px",
            }}
          />
        ) : (
          <span style={textStyle}>{todo.task}</span>
        )}
      </div>

      {/* btn */}
      <div style={{ display: "flex", gap: "8px" }}>
        {isEditing ? (
          <>
            {/* Save and Cancel btn when in edit mode */}
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTask(todo.task);
              }}
              style={{
                backgroundColor: "grey",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Show Edit and Delete buttons when NOT in edit mode */}
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              Edit
            </button>

            {/* Delete button */}
            <button
              onClick={() => onDelete(todo.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
