import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DoctorDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor || {};

  const handleBack = () => navigate(-1);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Doctor Details</h3>
          <button onClick={handleBack} className="btn btn-secondary mb-3">
            Back
          </button>
          <div>
            <p>
              <strong>Name:</strong> {doctor.firstName} {doctor.lastName}
            </p>
            <p>
              <strong>Email:</strong> {doctor.email}
            </p>
            <p>
              <strong>Years Of Experience:</strong> {doctor.yearsOfExperience}
            </p>
            <p>
              <strong>Speciality:</strong> {doctor.speciality}
            </p>
            <h5>
              Patients of Dr. {doctor.firstName} {doctor.lastName}:
            </h5>
            <h5>
              Appointments of Dr. {doctor.firstName} {doctor.lastName}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
