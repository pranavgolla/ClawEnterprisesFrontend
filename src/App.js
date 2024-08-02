import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todos/TodoList';
import './assets/styles/App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/todos" element={<TodoList />} />
                    <Route path="/" element={<Navigate to="/todos" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
