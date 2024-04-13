import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import Footer from "../components/Footer";
import Header from "../components/NewHeader";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFirstNameOnChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameOnChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordOnChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordOnChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUserNameOnChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setNumber(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const postData = {
      firstName,
      lastName,
      email,
      number,
      address,
      userName,
      password,
      confirmPassword,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    const url = "http://localhost/backend/register";

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "User registered successfully.") {
          navigate("/login");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
      });
  };

  return (
    <>
      <Header />
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <h2 className={classes.heading}>Register</h2>
        <p className={classes.error}>{error}</p>
        <label htmlFor="fname">First Name</label>
        <input
          className={classes.input}
          type="text"
          name="fname"
          value={firstName}
          onChange={handleFirstNameOnChange}
          required
        ></input>

        <label htmlFor="lname">Last Name</label>
        <input
          className={classes.input}
          type="text"
          name="lname"
          value={lastName}
          onChange={handleLastNameOnChange}
          required
        ></input>

        <label htmlFor="uname">User Name</label>
        <input
          className={classes.input}
          type="text"
          name="uname"
          value={userName}
          onChange={handleUserNameOnChange}
          required
        ></input>

        <label htmlFor="address">Address</label>
        <input
          className={classes.input}
          type="text"
          name="address"
          value={address}
          onChange={handleAddress}
          required
        ></input>

        <label htmlFor="number">phone Number</label>
        <input
          className={classes.input}
          type="text"
          name="number"
          value={number}
          onChange={handlePhoneNumber}
          required
        ></input>

        <label htmlFor="email">Email</label>
        <input
          className={classes.input}
          type="email"
          name="email"
          value={email}
          onChange={handleEmailOnChange}
          required
        ></input>

        <label htmlFor="password">Password</label>
        <input
          className={classes.input}
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordOnChange}
          required
        ></input>

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className={classes.input}
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordOnChange}
          required
        ></input>

        <input type="submit" value="Register"></input>
        <p>
          Already have an account?
          <Link className={classes.link} to="/login">
            Login
          </Link>
        </p>
      </form>
      <Footer />
    </>
  );
}

export default RegisterPage;
