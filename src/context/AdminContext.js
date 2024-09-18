import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  return <AdminContext.Provider value={{ userName, setUserName }}>{children}</AdminContext.Provider>;
};
