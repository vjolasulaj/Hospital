import React from "react";
import "../styles/modal.css";
const LogoutModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to log out?</h3>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes, Logout</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
