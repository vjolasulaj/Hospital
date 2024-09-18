import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EditPatientPage() {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodType: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const patientId = location.state?.patientId;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/patients/patients/${patientId}`);
        const data = await response.json();
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient:", error);
        alert("Unable to fetch patient data.");
        navigate("/patients");
      }
    };

    fetchPatient();
  }, [patientId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(patientId);

    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });

      if (response.ok) {
        alert("Patient updated successfully!");
        navigate("/patients");
      } else {
        alert("Failed to update patient.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Unable to connect to the server.");
    }
  };

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Edit Patient</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="firstName" value={patient.firstName} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="lastName" value={patient.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Age:</label>
              <div className="col-sm-8">
                <input type="number" className="form-control" name="age" value={patient.age} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Gender:</label>
              <div className="col-sm-8">
              <input type="text" className="form-control" name="gender" value={patient.gender} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Blood Type:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="bloodType" value={patient.bloodType} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Status:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="status" value={patient.status} onChange={handleChange} required />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Update Patient
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to="/patients" role="button">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
