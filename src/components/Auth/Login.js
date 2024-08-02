import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Auth.css"; // Updated import path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, redirect to /todos
      navigate("/todos");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before making the request
    try {
      const response = await axios.post(
        `https://clawenterprisesbackend.onrender.com/api/auth/login`,
        { email, password }
      );
      const { token } = response.data;

      // Store token in local storage
      localStorage.setItem("token", token);

      // Redirect to /todos
      navigate("/todos");
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="auth-footer">
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="submit-button"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
