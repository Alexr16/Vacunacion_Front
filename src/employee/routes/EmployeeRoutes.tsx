import { Navigate, Route, Routes } from "react-router-dom";
import EmployeePage from "../pages/EmployeePage";

export const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeePage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
