import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Todos.css'; // Updated import path

const AddTodo = ({ fetchTodos }) => {
    const [text, setText] = useState('');
    const navigate = useNavigate(); // For navigation

    const handleAddTodo = async () => {
        const token = localStorage.getItem('token'); // Retrieve token
        if (!token) {
            navigate('/login'); // Redirect to login if no token
            return;
        }

        try {
            await axios.post(
                `https://clawenterprisesbackend.onrender.com/api/auth/todos`,
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in request headers
                    }
                }
            );
            setText('');
            fetchTodos();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                navigate('/login'); // Redirect to login on unauthorized error
            }
        }
    };

    return (
        <div className="container" style={{display:'flex',justifyContent:'space-between', padding: '5px 0px' }}>
            <input
                type="text"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleAddTodo} className="submit-button">Add Todo</button>
        </div>
    );
};

export default AddTodo;
