import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      alert("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Error deleting doctor");
    }
  };
  const navigate = useNavigate();

  const handleViewDoctor = (doctor) => {
    navigate("/doctor-details", { state: { doctor } });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Doctors Table</h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/pages/create" role="button">
            Create Doctor
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
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Patients</th>
            <th>Appointments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor._id}>
              <td>{index + 1}</td>
              <td>{doctor.firstName}</td>
              <td>{doctor.lastName}</td>
              <td>{doctor.email}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.yearsOfExperience}</td>

              <td>
                {doctor.patients && doctor.patients.length > 0 ? (
                  doctor.patients.map((patient, patientIndex) => (
                    <span key={patient._id}>
                      {patientIndex + 1}
                      {patientIndex < doctor.patients.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No patients</span>
                )}
              </td>

              <td>
                {doctor.appointments && doctor.appointments.length > 0 ? (
                  doctor.appointments.map((appointment, appointmentIndex) => (
                    <span key={appointment._id}>
                      {appointmentIndex + 1}
                      {appointmentIndex < doctor.appointments.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No appointments</span>
                )}
              </td>

              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <button onClick={() => handleViewDoctor(doctor)} className="btn btn-primary btn-sm me-1">
                  View
                </button>
                <Link to="/edit-doctor" className="btn btn-primary btn-sm me-1" state={{ doctorId: doctor._id }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(doctor._id)} type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
