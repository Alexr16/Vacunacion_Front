import { Outlet, Navigate } from "react-router-dom";
//import useAuthService from '../../services/useAuthService';

export const PrivateRoutes = () => {
  //const { getUser } = useAuthService();
  //const role = getUser().role;
  const role = "Admin";
  if (role === "Admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/session/login" />;
  }
};
