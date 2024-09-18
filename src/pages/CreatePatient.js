import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePatient() {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodType: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });

      if (response.ok) {
        const newPatient = await response.json();
        console.log("Patient created:", newPatient);
        navigate("/patients");
      } else {
        alert("Error creating patient.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Create a patient</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name:</label>
              <div className="col-sm-8">
                <input className="form-control" name="firstName" value={patient.firstName} onChange={handleChange} required />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name:</label>
              <div className="col-sm-8">
                <input className="form-control" name="lastName" value={patient.lastName} onChange={handleChange} required />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Age:</label>
              <div className="col-sm-8">
                <input className="form-control" name="age" value={patient.age} onChange={handleChange} required />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Gender:</label>
              <div className="col-sm-8">
                <input className="form-control" name="gender" value={patient.gender} onChange={handleChange} required />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Blood Type:</label>
              <div className="col-sm-8">
                <input className="form-control" name="bloodType" value={patient.bloodType} onChange={handleChange} required />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Status:</label>
              <div className="col-sm-8">
                <input className="form-control" name="status" value={patient.status} onChange={handleChange} required />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit">
                  Add Patient
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link to="/patients" role="button">
                 <button type="button" style={{marginLeft:"77px"}}>Cancel</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
