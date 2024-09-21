import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Use `useNavigate`

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login/admin", { email, password });

      if (response.data.success) {
        setShowVerification(true); // Show verification form
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:5000/api/login/verify", {
        email,
        verificationCode,
      });

      if (response.data.success) {
        console.log("Login successful, response:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
        console.log("Token set in localStorage:", localStorage.getItem("token"));
        console.log("User set in localStorage:", localStorage.getItem("user"));
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid verification code");
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  return (
    <div className="admin-login">
      <h2>{!showVerification ? "Admin Login" : "Enter Verification Code"}</h2>
      {!showVerification ? (
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleVerification}>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Enter Verification Code" required />
          <button type="submit">Verify</button>
        </form>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default AdminLogin;
