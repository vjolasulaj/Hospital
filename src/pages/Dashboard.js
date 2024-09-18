import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate for React Router v6
import { AdminContext } from "../context/AdminContext";
import "../styles/dashboard.css";
import Statistics from "../components/Statistics";
import { AppointmentGraph } from "../components/AppointmentGraph";
import { PatientGraph } from "../components/PatientsGraph";
import axios from "axios";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login")
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/verify-token", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserName(user.name);
          }
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="welcome-container">
        <div className="text-container">
          <h3>Welcome back {userName} &#128075;</h3>
          <p>
            Welcome to Hospital Management Dashboard
            <br />
            Have a nice day and don't forget to take care of your health!
          </p>
        </div>
      </div>
      <Statistics />
      <div style={{ display: "flex", gap: "10px" }}>
        <AppointmentGraph />
        <PatientGraph />
      </div>
      {/* <Services /> */}
    </div>
  );
};

export default Dashboard;
