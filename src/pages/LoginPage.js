import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";
import Header from "../components/NewHeader";
import Footer from "../components/Footer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost/backend/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.message.error) {
        throw new Error(data.message.error);
      }

      localStorage.setItem("token", data.message.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
	  {/* Add a back button */}
	  <button onClick={() => navigate("/register")} className={classes.backButton}>
          Back
        </button>
      <form className={classes.form} onSubmit={handleSubmit}>
		
        <h2 className={classes.heading}>Login</h2>
        {error && <p className={classes.error}>{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          className={classes.input}
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className={classes.input}
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input type="submit" value="Login" />
        <p>
          Don't have an account?{" "}
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </p>
      </form>
      <Footer />
    </>
  );
}

export default LoginPage;
