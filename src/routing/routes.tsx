import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "../admin/routes/AdminRoutes";
import { EmployeeRoutes } from "../employee/routes/EmployeeRoutes";
import { SessionRoutes } from "../session/routes/SessionRoutes";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  { path: "/session/*", element: <SessionRoutes /> },
  { path: "/employee/*", element: <EmployeeRoutes /> },
  { path: "/admin/*", element: <AdminRoutes /> },
  { path: "/", element: <HomePage /> },
]);

export default router;
