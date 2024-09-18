// Sidebar.js
import React, { useState } from "react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import Loader from "./Loader"; 

const Sidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true); 
    setTimeout(() => {
      navigate(path);
      setLoading(false); 
    }, 500); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleNavigation("/admin-login");
  };

  return (
    <div className="nav-container">
      {loading && <Loader />} 
      <nav className="side-navbar">
        <ul>
          <li>
            <img src="dashboard.svg" className="nav-icons" onClick={() => handleNavigation("/dashboard")} />
          </li>
          <li>
            <img src="patientt.png" className="nav-icons" onClick={() => handleNavigation("/patients")} />
          </li>
          <li>
            <img src="doctoor.svg" className="nav-icons" onClick={() => handleNavigation("/doctors")} />
          </li>
          <li>
            <img src="appointment-4.png" className="nav-icons" onClick={() => handleNavigation("/appointments")} />
          </li>
          <li>
            <img src="admin.png" className="nav-icons" onClick={() => handleNavigation("/admin-profile")} />
          </li>
          <li>
            <img src="logout11.png" className="nav-icons" onClick={() => setShowModal(true)} />
            <LogoutModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogout} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
