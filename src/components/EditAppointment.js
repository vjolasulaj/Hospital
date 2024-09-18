import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EditAppointmentPage() {
  const [appointment, setAppointment] = useState({
    Date: "",
    status: "",
    reason: "",
    notes: "",
    payments: "",
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentId = location.state?.appointmentId;


  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointment/${appointmentId}`);
        const data = await response.json();
        setAppointment(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        alert("Unable to fetch appointment data.");
        navigate("/appointments");
      }
    };

    fetchAppointment();
  }, [appointmentId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(appointmentId);

    try {
      const response = await fetch(`http://localhost:5000/api/appointment/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        alert("Appointment updated successfully!");
        navigate("/appointments");
      } else {
        alert("Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
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
          <h3 className="text-center mb-5">Edit Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Date:</label>
              <div className="col-sm-8">
                <input
                  type="date"
                  id="appointmentDate"
                  value={appointment.Date}
                  onChange={(e) => setAppointment(e.target.value)}
                />{" "}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Status</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="status" value={appointment.status} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Reason:</label>
              <div className="col-sm-8">
                <input type="number" className="form-control" name="reason" value={appointment.reason} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Notes:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="notes" value={appointment.notes} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Payments:</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="payments" value={appointment.payments} onChange={handleChange} required />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Update Appointment
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to="/appointments" role="button">
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
