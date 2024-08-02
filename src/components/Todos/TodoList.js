import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

import "../../assets/styles/Todos.css"; // Updated import path

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Check if token exists before fetching todos
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchTodos();
    }
  }, [navigate]);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.get(
        "https://clawenterprisesbackend.onrender.com/api/auth/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://clawenterprisesbackend.onrender.com/api/auth/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo.");
    }
  };

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://clawenterprisesbackend.onrender.com/api/auth/todos/${id}/check`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Log response to check if the item is updated
      fetchTodos(); // Refresh todos to reflect the change
    } catch (err) {
      console.error("Error toggling todo:", err);
      setError("Failed to toggle todo.");
    }
  };

  const handleUpdate = async (id, newText) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://clawenterprisesbackend.onrender.com/api/auth/todos/${id}`,
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection:'row',
          justifyContent: "center",
          marginTop:'25%'
        }}
      >
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  return (
    <div className="container">
      <h1>Todo List</h1>
      <button onClick={handleLogout} className="submit-button">
        Logout
      </button>
      <AddTodo fetchTodos={fetchTodos} />
      {error && <p className="error-message">{error}</p>}
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
