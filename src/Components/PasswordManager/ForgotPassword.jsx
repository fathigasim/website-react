// src/Components/PasswordManager/ForgotPassword.js
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7228/api/Login/forgot-password", {
        email,
      });
      setMessage("If the email exists, a reset link has been sent.");
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
