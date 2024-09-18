import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointment/${id}`);
        setAppointment(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching appointment details");
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleBack = () => navigate(-1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Appointment Details</h3>
          <button onClick={handleBack} className="btn btn-secondary mb-3">
            Back
          </button>
          <div>
            <p>
              <strong>Appointment ID:</strong> {appointment?._id || "N/A"}
            </p>
            <p>
              <strong>Patient Name:</strong> {appointment?.patient?.firstName || "N/A"} {appointment?.patient?.lastName || ""}
            </p>
            <p>
              <strong>Doctor Name:</strong> {appointment?.doctor?.firstName || "N/A"} {appointment?.doctor?.lastName || ""}
            </p>
            <p>
              <strong>Date:</strong> {new Date(appointment?.date).toLocaleDateString("en-GB")}
            </p>
            <p>
              <strong>Time:</strong> {appointment?.date ? new Date(appointment.date).toLocaleTimeString() : "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {appointment?.status || "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {appointment?.description || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
