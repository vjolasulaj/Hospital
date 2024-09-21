import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/dashboard.css";
import Statistics from "../components/Statistics";
import { AppointmentGraph } from "../components/AppointmentGraph";
import { PatientGraph } from "../components/PatientsGraph";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Dashboard: Starting fetchData");
      const token = localStorage.getItem("token");
      console.log("Dashboard: Retrieved token from localStorage:", token);

      if (!token) {
        console.log("Dashboard: No token found, redirecting to login");
        navigate("/login");
        return;
      }

      const storedUser = localStorage.getItem("user");
      console.log("Dashboard: Stored user:", storedUser);

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role !== "admin") {
          console.log("Dashboard: User is not an admin, redirecting");
          navigate("/unauthorized");
          return;
        }
        setUserName(user.name);
        setIsAdmin(true);
        console.log("Dashboard: Admin user confirmed:", user.name);
      } else {
        console.log("Dashboard: No user info found, redirecting to login");
        navigate("/login");
        return;
      }

      console.log("Dashboard: Admin confirmed, proceeding to dashboard request");
      try {
        const response = await axios.get("http://localhost:5000/verify/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Dashboard: API request successful", response.data);

        setIsAuthenticated(true);
        console.log("Dashboard: Is authenticated set to true");
      } catch (error) {
        console.error("Dashboard: Error in request:", error);
        if (error.response && error.response.status === 401) {
          console.log("Dashboard: 401 error, removing token and redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          console.error("Dashboard: Request failed:", error);
        }
      } finally {
        setIsLoading(false);
        console.log("Dashboard: Loading set to false");
      }
    };

    fetchData();
  }, [navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="containers">
      <Sidebar />
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
      <div style={{ display: "flex", gap: "100px" }}>
        <AppointmentGraph />
        <PatientGraph />
      </div>
    </div>
  );
};

export default Dashboard;
