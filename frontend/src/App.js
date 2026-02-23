import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState([]);

// 1. Fetch todo
  const fetchTodo = async () => {
    try {
      const response = await axios.get("https://simple-to-do-application-backend.onrender.com/api/todo");
      setTodo(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

// 2. Add todo
  const addTodo = async (newtask) => {
    try {
      const response = await axios.post("https://simple-to-do-application-backend.onrender.com/api/todo", {
        task: newtask,
      });
      setTodo([...todo, response.data]);
    } catch (error) {
      console.error("add todo fail:", error);
    }
  };

  // 3. update toda
  const updateTodo = async (id, currentCompleted) => {
    const newCompletedStatus = currentCompleted ? 0 : 1;

    try {
      await axios.put(`https://simple-to-do-application-backend.onrender.com/api/todo/${id}`, {
        completed: newCompletedStatus,
      });
      setTodo(
        todo.map((todo) =>
          todo.id === id ? { ...todo, completed: newCompletedStatus } : todo,
        ),
      );
    } catch (error) {
      console.error("update todo fail:", error);
    }
  };


  // edit to do func
  const editTodo = async (id, newTaskText) => {
    try {
      await axios.put(`https://simple-to-do-application-backend.onrender.com/api/todo/${id}`, { task: newTaskText });
      setTodo(todo.map((item) => item.id === id ? { ...item, task: newTaskText } : item));
    } catch (error) { console.error("Edit todo failed:", error); }
  };


  // 4. delete
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://simple-to-do-application-backend.onrender.com/api/todo/${id}`);
      setTodo(todo.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };


  // render page
  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
        padding: "30px",
        fontFamily: "Arial",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        My To-Do List
      </h1>

      <AddTodo onAdd={addTodo} />

      <TodoList
        todo={todo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
