import React, { useState } from "react";
import "../../assets/styles/TodoItem.css"; // Updated import path

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  console.log(todo);

  const handleUpdate = () => {
    onUpdate(todo._id, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="editing-container">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="todo-input"
          />
          <button onClick={handleUpdate} className="update-button" style={{marginLeft:'10px'}}>
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <div className="view-container" style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onToggle(todo._id)}
            className="todo-checkbox"
          />
          <span
            className="todo-text"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </span>

          <div className="button-group" style={{display:'flex',alignItems:'center'}}>
            <button onClick={() => setIsEditing(true)} className="submit-button">
              Edit
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="submit-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
