import React, { useState, useEffect } from "react";
import "../styles/statistics.css";

const Statistics = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/count/doctors");
        const data = await response.json();
        setDoctorCount(data.count);
      } catch (error) {
        console.error("Error fetching doctor count:", error);
      }
    };

    const fetchAppointmentCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/count/appointments");
        const data = await response.json();
        setAppointmentCount(data.count);
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    };

    const fetchPatientCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/count/patients");
        const data = await response.json();
        setPatientCount(data.count);
      } catch (error) {
        console.error("Error fetching patient count:", error);
      }
    };

    fetchDoctorCount();
    fetchAppointmentCount();
    fetchPatientCount();
  }, []);

  return (
    <div className="container-statistics">
      <div className="card">
        <h2>Total Doctors</h2>
        <p>{doctorCount}</p>
      </div>
      <div className="card">
        <h2>Total Appointments</h2>
        <p>{appointmentCount}</p>
      </div>
      <div className="card">
        <h2>Total Patients</h2>
        <p>{patientCount}</p>
      </div>
      <div className="card">
        <h2>Total Payments</h2>
        <p>0</p>
      </div>
    </div>
  );
};



export default Statistics;
