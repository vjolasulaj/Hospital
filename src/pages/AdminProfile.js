import React, { useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/pass/change-pass", {
        email: "admin@test1.com",
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2 className="admin-text1">Admin Profile</h2>
        <img src="adminn.png"></img>
      </div>
      <div className="admin-info">
        <h2>Admin Information:</h2>
        <h4>Name: Vjola Sulaj</h4>
        <h4>Profile: Admin</h4>
        <h4>Gender: Female</h4>
        <h4>Created: 12/09/2024</h4>
        <h4>Email Address: admin@test1.com</h4>
      </div>
      <form onSubmit={handlePasswordChange} className="form-change">
        <h3 className="change">Change password:</h3>
        <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
