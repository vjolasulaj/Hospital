import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EditDoctorPage() {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    yearsOfExperience: "",
    speciality: "",
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const doctorId = location.state?.doctorId;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/doctors/${doctorId}`);
        const data = await response.json();
        setDoctor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        alert("Unable to fetch doctor data.");
        navigate("/doctors");
      }
    };

    fetchDoctor();
  }, [doctorId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(doctorId);

    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });

      if (response.ok) {
        alert("Doctor updated successfully!");
        navigate("/doctors");
      } else {
        alert("Failed to update doctor.");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Unable to connect to the server!");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Edit Doctor</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="firstName" value={doctor.firstName} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="lastName" value={doctor.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Email:</label>
              <div className="col-sm-8">
                <input type="number" className="form-control" name="age" value={doctor.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Years of Experience:</label>
              <div className="col-sm-8">
              <input type="text" className="form-control" name="yearsOfExperience" value={doctor.yearsOfExperience} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Speciality:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="speciality" value={doctor.speciality} onChange={handleChange} required />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Update Doctor
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to="/doctors" role="button">
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
