import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/login/admin", { email, password });
        console.log("API Response:", response.data);

        if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            setShowVerification(true);
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
      const response = await axios.post("http://localhost:5000/api/login/admin/verify", { email, verificationCode });
      if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setSuccessMessage("Verification successful! Redirecting...");
          setErrorMessage("");
          window.location.href = "/dashboard";
      } else {
          setErrorMessage("Invalid verification code");
      }
  } catch (error) {
      setErrorMessage("Verification failed. Please try again.");
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
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Enter Verification Code" required style={{ padding: "10px", width: "100%", marginBottom: "20px" }} />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Verify
          </button>
        </form>
      )}
      {errorMessage && <p style={{ color: "red", paddingLeft: "86px" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green", paddingLeft: "82px" }}>{successMessage}</p>}
    </div>
  );
};

export default AdminLogin;
