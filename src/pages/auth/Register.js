import React from 'react'
import { useState } from "react";
import { registerUser } from "../../api/auth";
import { useAuthStore } from "../../store/AuthStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", password_confirmation: "" });
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            setToken(data.data.token); // Store JWT token
            navigate("/dashboard"); // Redirect to Dashboard
        } catch (error) {
            console.error("Registration failed", error);
        }
    };
    return (
        <div className="register-box">
            <div className="register-logo">
                <Link to="/register">
                    <b>Ticketing</b>System
                </Link>
            </div>
            <div className="card">
                <div className="card-body register-card-body">
                    <p className="login-box-msg">Register a new user</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Full name" name="name" onChange={handleChange} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user" />
                                </div>
                            </div>
                        </div>
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
                                type="number"
                                className="form-control"
                                placeholder="Phone"
                                name="phone"
                                onChange={handleChange}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-phone" />
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
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Retype password"
                                name="password_confirmation"
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
                                    <input
                                        type="checkbox"
                                        id="agreeTerms"
                                        name="terms"
                                        defaultValue="agree"
                                    />
                                    <label htmlFor="agreeTerms">
                                        I agree to the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            {/* /.col */}
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Register
                                </button>
                            </div>
                            {/* /.col */}
                        </div>
                    </form>
                    <br />
                    <a href="/login" className="text-center">
                        I already have a account
                    </a>
                </div>
                {/* /.form-box */}
            </div>
            {/* /.card */}
        </div>

    )
}

export default Register;