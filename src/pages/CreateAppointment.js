import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAppointment() {
  const [appointment, setAppointment] = useState({
    date: "",
    status: "Pending",
    reason: "",
    notes: "",
    payments: "",
    doctorId: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [isAvailable, setIsAvailable] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });

    if (name === "date") {
      const selectedDate = new Date(value);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setDayOfWeek(daysOfWeek[selectedDate.getDay()]);
    }

    if (name === "doctorId" || name === "date") {
      checkDoctorAvailability({ ...appointment, [name]: value });
    }
  };

  const checkDoctorAvailability = async (currentAppointment) => {
    const { doctorId, date } = currentAppointment;

    if (doctorId && date) {
      try {
        const response = await fetch("http://localhost:5000/api/appointment/check-availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doctorId, date }),
        });
        const data = await response.json();
        setIsAvailable(data.available);
      } catch (error) {
        console.error("Error checking availability:", error);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAvailable === false) {
      alert("Doctor is not available at the selected time.");
      return;
    }

    const formattedDate = new Date(appointment.date).toISOString();

    const appointmentData = {
      ...appointment,
      date: formattedDate,
      dayOfWeek, 
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const newAppointment = await response.json();
        console.log("Appointment created:", newAppointment);
        navigate("/appointments");
      } else {
        alert("Error creating appointment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h3 className="text-center mb-5">Create an Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Doctor:</label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="doctorId"
                  value={appointment.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Date and Time:</label>
              <div className="col-sm-8">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  value={appointment.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {dayOfWeek && (
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Day of the Week:</label>
                <div className="col-sm-8">
                  <p className="form-control-plaintext">{dayOfWeek}</p>
                </div>
              </div>
            )}

            {isAvailable === false && (
              <div className="row mb-3">
                <div className="col-sm-8 offset-sm-4">
                  <p className="text-danger">Doctor is not available at this time.</p>
                </div>
              </div>
            )}

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Reason:</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="reason"
                  value={appointment.reason}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Notes:</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="notes"
                  value={appointment.notes}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Payment:</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="payments"
                  value={appointment.payments}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" disabled={isAvailable === false}>
                  Add Appointment
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link to="/appointments" role="button">
                  <button type="button" style={{ marginLeft: "77px" }}>
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
