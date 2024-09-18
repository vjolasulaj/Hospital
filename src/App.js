import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import CreateDoctor from "./pages/Create";
import CreatePatient from "./pages/CreatePatient";
import PatientDetailPage from "./components/PatientView";
import DoctorDetailPage from "./components/DoctorsView";
import EditPatientPage from "./components/EditPatient";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointments";
import EditDoctorPage from "./components/EditDoctor";
import EditAppointmentPage from "./components/EditAppointment";
import AppointmentDetailPage from "./components/AppointmentsView";
import CreateAppointment from "./pages/CreateAppointment";
import AdminProfile from "./pages/AdminProfile";
import { AppointmentGraph } from "./components/AppointmentGraph";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./context/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<Login />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/pages/create" element={<CreateDoctor />} />
                <Route path="/pages/createPatient" element={<CreatePatient />} />
                <Route path="/pages/createAppointments" element={<CreateAppointment />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patient-details" element={<PatientDetailPage />} />
                <Route path="/doctor-details" element={<DoctorDetailPage />} />
                <Route path="/edit-patient" element={<EditPatientPage />} />
                <Route path="/edit-doctor" element={<EditDoctorPage />} />
                <Route path="/appointments" element={<Appointment />} />
                <Route path="/edit-appointments" element={<EditAppointmentPage />} />
                <Route path="/appointment-details" element={<AppointmentDetailPage />} />
                <Route path="/admin-profile" element={<AdminProfile />} />
                <Route path="/chart" element={<AppointmentGraph />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
