import './App.css';
import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logged in successfully!");
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created!");
    }
  } catch (error) {
    if (
      !isLogin &&
      error.code === "Email Already Logged In"
    ) {
      // Switch to login mode and try logging in
      setIsLogin(true);
      setMessage("Email address exists. Logging you in...");

      try {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Logged in successfully!");
      } catch (loginError) {
        setMessage("Login failed: " + loginError.message);
      }
    } else {
      setMessage(error.message);
    }
  }
};


  return (
    <div className="container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p
        className="toggle-link"
        onClick={() => {
          setMessage("");
          setIsLogin(!isLogin);
        }}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
