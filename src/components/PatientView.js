import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PatientDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient || {};

  const handleBack = () => navigate(-1); 

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Patient Details</h3>
          <button onClick={handleBack} className="btn btn-secondary mb-3">Back</button>
          <div>
            <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Blood Type:</strong> {patient.bloodType}</p>
            <p><strong>Status:</strong> {patient.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
