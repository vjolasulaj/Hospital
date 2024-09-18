import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateDoctor() {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    yearsOfExperience: "",
    speciality: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const validateForm = () => {
    if (!doctor.firstName || !doctor.lastName || !doctor.email || !doctor.yearsOfExperience || !doctor.speciality) {
      setError("All fields are required");
      return false;
    }
    if (isNaN(doctor.yearsOfExperience) || doctor.yearsOfExperience < 0) {
      setError("Years of experience must be a positive number");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(doctor.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      console.log("Sending doctor data:", doctor);
      const response = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      if (response.ok) {
        const newDoctor = await response.json();
        console.log("Doctor created:", newDoctor);
        navigate("/doctors");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setError(errorData.message || "Error creating doctor. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Unable to connect to the server. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Create a Doctor</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="firstName" className="col-sm-4 col-form-label">First Name:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={doctor.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="lastName" className="col-sm-4 col-form-label">Last Name:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={doctor.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-4 col-form-label">Email:</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="yearsOfExperience" className="col-sm-4 col-form-label">Years of Experience:</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={doctor.yearsOfExperience}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="speciality" className="col-sm-4 col-form-label">Speciality:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="speciality"
                  name="speciality"
                  value={doctor.speciality}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit">
                  Add Doctor
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link to="/doctors" role="button">
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