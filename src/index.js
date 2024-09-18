import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { AdminProvider } from "./context/AdminContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AdminProvider>
    <App />
  </AdminProvider>
);
