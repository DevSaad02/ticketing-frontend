import React from 'react'
import { useState } from "react";
import { loginUser } from "../../api/auth";
import { useAuthStore } from "../../store/AuthStore";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const data = await loginUser(formData);
          setToken(data.data.token); // Store JWT token
          navigate("/dashboard"); // Redirect to Dashboard
      } catch (error) {
          console.error("Login failed", error);
      }
  };
  return (
    <div className="login-box">
      <div className="login-logo">
        <Link to="/login">
          <b>Ticketing</b>System
        </Link>
      </div>
      {/* /.login-logo */}
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleChange} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              {/* /.col */}
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <br />
          <p className="mb-0">
            <a href="/register" className="text-center">
              Register a new user
            </a>
          </p>
        </div>
        {/* /.login-card-body */}
      </div>
    </div>
  )
}

export default Login