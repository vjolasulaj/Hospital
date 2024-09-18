import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointment");
      setAppointment(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointment/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Error deleting appointment');
    }
  };

  const navigate = useNavigate();

  const handleViewAppointment = (appointment) => {
    navigate('/appointment-details', { state: { appointment } });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Appointments Table</h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/pages/createAppointments" role="button">
            Create Appointment
          </Link>
        </div>
        <div className="col"></div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Day of Week</th> 
            <th>Status</th>
            <th>Reason</th>
            <th>Notes</th>
            <th>Payments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointment.map((appointment, index) => {
            return (
              <tr key={appointment._id}>
                <td>{index + 1}</td>
                <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
                <td>{appointment.dayOfWeek}</td> 
                <td>{appointment.status}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.notes}</td>
                <td>{appointment.payments && appointment.payments.length > 0 ? appointment.payments : 'No Payments'}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button onClick={() => handleViewAppointment(appointment)} className="btn btn-primary btn-sm me-1">
                    View
                  </button>
                  <Link to="/edit-appointments" className="btn btn-primary btn-sm me-1">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(appointment._id)} type="button" className="btn btn-danger btn-sm">
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

export default Appointment;
