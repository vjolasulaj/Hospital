import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/doctors">
          Doctors
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/patients">
          Patients
        </Link>
      </li>
    </ul>
  );
}
