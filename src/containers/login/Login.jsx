import React from "react";
import Header from "../../components/Header/Header";
import '../../globalStyles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (userName && password) {
      loginUser();
    }
  };

  const signup = () => {
    if (userName && password) {
      createUser();
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (user) {
      navigate("/home");
    }
  }, [])

  const loginUser = async () => {
    loginOrCreate(`/api/auth/login`);
  };

  const createUser = async () => {
    loginOrCreate(`/api/auth/create`);
  };

  const loginOrCreate = async (endpoint) => {
    console.log(password);
    console.log(userName);
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ userName: userName, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(response);

    if (response.ok) {
      localStorage.setItem("userName", userName);
      navigate("/home");
    } else {
      const body = await response.json();
      alert(`⚠ Error: ${body.msg}`);
    }
  };

  return (
    <main className="container-fluid  text-center">
      <Header />
      <div id="login">
        <h1>Log in</h1>
        <form id="login-form" className="d-flex flex-column">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            required
            autoComplete="on"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex flex-row justify-content-center pt-3">
            <button
              type="reset"
              className="btn btn-outline-dark pt-2 mx-1"
              id="login-button"
              onClick={login}
            >
              Log in
            </button>
            <button
              type="reset"
              className="btn btn-outline-dark pt-2 mx-1"
              id="signup-button"
              onClick={signup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
