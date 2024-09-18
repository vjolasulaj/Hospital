import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
      alert("Patient deleted successfully");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Error deleting patient");
    }
  };

  const navigate = useNavigate();

  const handleViewPatient = (patient) => {
    navigate("/patient-details", { state: { patient } });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Patients Table</h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/pages/createPatient" role="button">
            Create Patient
          </Link>
        </div>
        <div className="col"></div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => {
            return (
              <tr key={patient._id}>
                <td>{index + 1}</td>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.bloodType}</td>
                <td>{patient.status}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button onClick={() => handleViewPatient(patient)} className="btn btn-primary btn-sm me-1">
                    View
                  </button>
                  <Link to="/edit-patient" state={{ patientId: patient._id }} className="btn btn-primary btn-sm me-1">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(patient._id)} type="button" className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
