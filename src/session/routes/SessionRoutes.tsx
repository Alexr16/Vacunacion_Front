import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

export const SessionRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />

      <Route path="/*" element={<Navigate to="/session/login" />} />
    </Routes>
  );
};
