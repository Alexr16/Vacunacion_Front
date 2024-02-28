import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import { PrivateRoutes } from "./PrivateRoutes";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<AdminPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
